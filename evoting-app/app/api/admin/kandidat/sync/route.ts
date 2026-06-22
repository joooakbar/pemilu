import { NextRequest } from "next/server";
import { ok, err, withAuth, logActivity, getIP } from "@/lib/api";
import { getKandidatList } from "@/sanity/lib/fetchers";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  return withAuth(
    req,
    async (req, payload) => {
      const sanityKandidat = await getKandidatList();
      if (!sanityKandidat || sanityKandidat.length === 0)
        return err(
          "Tidak ada kandidat di Sanity. Pastikan sudah di-Publish.",
          404,
        );

      const pemilihanAktif = await prisma.pemilihan.findFirst({
        where: { status: "ACTIVE" },
      });

      if (!pemilihanAktif) {
        return err("Tidak ada pemilihan dengan status ACTIVE", 400);
      }

      const results = {
        created: 0,
        updated: 0,
        skipped: 0,
        errors: [] as string[],
      };

      for (const k of sanityKandidat) {
        if (!k._id || !k.nomorUrut || !k.namaPaslon) {
          results.errors.push(
            `Lewati "${k.namaPaslon || k._id}" — nomorUrut atau namaPaslon kosong`,
          );
          continue;
        }

        try {
          // Cek berdasarkan sanityId dulu
          const bySanityId = await prisma.kandidat.findFirst({
            where: { sanityId: k._id },
          });

          if (bySanityId) {
            // Sudah ada — update jika ada perubahan nama atau nomor
            if (
              bySanityId.nama !== k.namaPaslon ||
              bySanityId.noUrut !== k.nomorUrut
            ) {
              // Pastikan nomorUrut baru tidak bentrok dengan kandidat lain
              const conflictNomor = await prisma.kandidat.findFirst({
                where: { noUrut: k.nomorUrut, NOT: { sanityId: k._id } },
              });
              if (conflictNomor) {
                results.errors.push(
                  `"${k.namaPaslon}": nomorUrut ${k.nomorUrut} sudah dipakai oleh "${conflictNomor.nama}"`,
                );
                continue;
              }
              await prisma.kandidat.update({
                where: { id: bySanityId.id },
                data: { nama: k.namaPaslon, noUrut: k.nomorUrut },
              });
              results.updated++;
            } else {
              results.skipped++;
            }
          } else {
            // Belum ada berdasarkan sanityId
            // Cek apakah nomorUrut sudah dipakai (misal dari seed / insert manual)
            const byNomorUrut = await prisma.kandidat.findFirst({
              where: { noUrut: k.nomorUrut },
            });

            if (byNomorUrut) {
              // Data lama (seed) dengan nomorUrut sama → update sanityId-nya agar tersync
              await prisma.kandidat.update({
                where: { id: byNomorUrut.id },
                data: { sanityId: k._id, nama: k.namaPaslon, isActive: true },
              });
              results.updated++;
            } else {
              // Benar-benar baru
              await prisma.kandidat.create({
                data: {
                  noUrut: k.nomorUrut,
                  nama: k.namaPaslon,
                  sanityId: k._id,
                  isActive: true,
                  pemilihan: {
                    connect: { id: pemilihanAktif.id },
                  },
                },
              });
              results.created++;
            }
          }
        } catch (e: unknown) {
          results.errors.push(
            `Error "${k.namaPaslon}": ${e instanceof Error ? e.message : String(e)}`,
          );
        }
      }

      await logActivity({
        userId: payload.sub,
        role: payload.role,
        action: "SYNC_KANDIDAT",
        entity: "kandidat",
        ipAddress: getIP(req),
        metadata: { ...results, total: sanityKandidat.length },
      });

      return ok({
        message: `Sync selesai: ${results.created} baru, ${results.updated} diperbarui, ${results.skipped} tidak berubah`,
        ...results,
        total: sanityKandidat.length,
      });
    },
    ["ADMIN"],
  );
}
