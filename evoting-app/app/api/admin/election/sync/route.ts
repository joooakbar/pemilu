import { NextRequest } from "next/server";
import { ok, withAuth, logActivity, getIP } from "@/lib/api";
import { getElectionInfo, getKandidatList } from "@/sanity/lib/fetchers";
import prisma from "@/lib/db";
import type { SyncSectionResult } from "@/types";

export async function POST(req: NextRequest) {
  return withAuth(
    req,
    async (req, payload) => {
      // ── 1. Sync Election ─────────────────────────────────────
      const electionResult: SyncSectionResult & { electionId?: string } = {
        created: 0,
        updated: 0,
        skipped: 0,
        errors: [],
      };

      const info = await getElectionInfo();
      if (!info) {
        electionResult.errors.push(
          "Info Pemilihan belum ada di Sanity. Buat dan Publish terlebih dahulu.",
        );
      } else if (!info.startTime || !info.endTime) {
        electionResult.errors.push(
          "startTime dan endTime wajib diisi di Sanity.",
        );
      } else {
        try {
          const start = new Date(info.startTime);
          const end = new Date(info.endTime);

          if (isNaN(start.getTime()) || isNaN(end.getTime()))
            throw new Error("Format tanggal tidak valid di Sanity");
          if (end <= start)
            throw new Error("Waktu selesai harus lebih besar dari waktu mulai");

          const existing = await prisma.pemilihan.findFirst({
            where: { OR: [{ sanityId: info._id }, { sanityId: null }] },
            orderBy: { createdAt: "desc" },
          });

          if (existing) {
            // Jangan update status — hanya update data konten
            const changed =
              existing.nama !== info.namaPemilihan ||
              existing.startTime.getTime() !== start.getTime() ||
              existing.endTime.getTime() !== end.getTime() ||
              existing.tempatVoting !== (info.tempatVoting ?? null) ||
              existing.deskripsi !== (info.deskripsi ?? null) ||
              existing.sanityId !== info._id;

            if (changed) {
              await prisma.pemilihan.update({
                where: { id: existing.id },
                data: {
                  sanityId: info._id,
                  nama: info.namaPemilihan,
                  startTime: start,
                  endTime: end,
                  tempatVoting: info.tempatVoting ?? null,
                  deskripsi: info.deskripsi ?? null,
                },
              });
              electionResult.updated++;
              electionResult.electionId = existing.id;
            } else {
              electionResult.skipped++;
              electionResult.electionId = existing.id;
            }
          } else {
            // Buat election baru dari Sanity
            const created = await prisma.pemilihan.create({
              data: {
                sanityId: info._id,
                nama: info.namaPemilihan,
                status: "DRAFT",
                startTime: start,
                endTime: end,
                tempatVoting: info.tempatVoting ?? null,
                deskripsi: info.deskripsi ?? null,
              },
            });
            electionResult.created++;
            electionResult.electionId = created.id;
          }
        } catch (e: unknown) {
          electionResult.errors.push(
            `Election: ${e instanceof Error ? e.message : String(e)}`,
          );
        }
      }

      // ── 2. Sync Kandidat ─────────────────────────────────────
      const kandidatResult: SyncSectionResult = {
        created: 0,
        updated: 0,
        skipped: 0,
        errors: [],
      };

      const sanityKandidat = await getKandidatList();
      if (!sanityKandidat || sanityKandidat.length === 0) {
        kandidatResult.errors.push(
          "Belum ada kandidat di Sanity. Tambahkan dan Publish terlebih dahulu.",
        );
      } else {
        for (const k of sanityKandidat) {
          if (!k._id || !k.noUrut || !k.namaPaslon) {
            kandidatResult.errors.push(
              `Lewati "${k.namaPaslon || k._id}" — noUrut atau nama kosong`,
            );
            continue;
          }
          try {
            const existing = await prisma.kandidat.findFirst({
              where: { sanityId: k._id },
            });

            if (existing) {
              if (
                existing.nama !== k.namaPaslon ||
                existing.noUrut !== k.noUrut
              ) {
                const conflict = await prisma.kandidat.findFirst({
                  where: { noUrut: k.noUrut, NOT: { sanityId: k._id } },
                });
                if (conflict) {
                  kandidatResult.errors.push(
                    `"${k.namaPaslon}": noUrut ${k.noUrut} sudah dipakai`,
                  );
                  continue;
                }
                await prisma.kandidat.update({
                  where: { id: existing.id },
                  data: { nama: k.namaPaslon, noUrut: k.noUrut },
                });
                kandidatResult.updated++;
              } else {
                kandidatResult.skipped++;
              }
            } else {
              if (electionResult.electionId) {
                await prisma.kandidat.create({
                  data: {
                    noUrut: k.noUrut,
                    nama: k.namaPaslon,
                    sanityId: k._id,
                    pemilihan: {
                      connect: {
                        id: electionResult.electionId,
                      },
                    },
                  },
                });
                kandidatResult.created++;
              }
            }
          } catch (e: unknown) {
            kandidatResult.errors.push(
              `"${k.namaPaslon}": ${e instanceof Error ? e.message : String(e)}`,
            );
          }
        }
      }

      await logActivity({
        userId: payload.sub,
        role: payload.role,
        action: "SYNC_ALL",
        entity: "sync",
        ipAddress: getIP(req),
        metadata: { election: electionResult, kandidat: kandidatResult },
      });

      const totalErrors =
        electionResult.errors.length + kandidatResult.errors.length;
      return ok({
        election: electionResult,
        kandidat: kandidatResult,
        timestamp: new Date().toISOString(),
        success: totalErrors === 0,
      });
    },
    ["ADMIN"],
  );
}
