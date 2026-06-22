import { NextRequest } from "next/server";
import { ok, err, withAuth, logActivity, getIP } from "@/lib/api";
import { getKandidatList } from "@/sanity/lib/fetchers";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function POST(req: NextRequest) {
  return withAuth(
    req,
    async (req, payload) => {
      const sanityKandidat = await getKandidatList();

      if (!sanityKandidat?.length) {
        return err("Tidak ada kandidat di Sanity", 404);
      }

      const pemilihanAktif = await prisma.pemilihan.findFirst({
        where: { status: "ACTIVE" },
      });

      if (!pemilihanAktif) {
        return err("Election belum ACTIVE", 400);
      }

      const result = {
        created: 0,
        updated: 0,
        skipped: 0,
        errors: [] as string[],
      };

      for (const k of sanityKandidat) {
        try {
          if (!k._id || !k.noUrut || !k.namaPaslon) {
            result.errors.push(`invalid: ${k._id}`);
            continue;
          }

          const existing = await prisma.kandidat.findFirst({
            where: { sanityId: k._id },
          });

          if (existing) {
            await prisma.kandidat.update({
              where: { sanityId: k._id },
              data: {
                nama: k.namaPaslon,
                noUrut: k.noUrut,
                isActive: true,
                idPemilihan: pemilihanAktif.id,
              },
            });

            result.updated++;
            continue;
          }

          const conflict = await prisma.kandidat.findFirst({
            where: {
              idPemilihan: pemilihanAktif.id,
              noUrut: k.noUrut,
            },
          });

          if (conflict) {
            await prisma.kandidat.update({
              where: { id: conflict.id },
              data: {
                sanityId: k._id,
                nama: k.namaPaslon,
                isActive: true,
              },
            });

            result.updated++;
            continue;
          }

          await prisma.kandidat.create({
            data: {
              sanityId: k._id,
              nama: k.namaPaslon,
              noUrut: k.noUrut,
              isActive: true,
              idPemilihan: pemilihanAktif.id,
            },
          });

          result.created++;
        } catch (e: unknown) {
          const message =
            e instanceof Prisma.PrismaClientKnownRequestError
              ? e.message
              : e instanceof Error
                ? e.message
                : String(e);

          result.errors.push(`${k.namaPaslon}: ${message}`);
        }
      }

      try {
        if (payload?.sub) {
          await logActivity({
            userId: payload.sub,
            role: payload.role,
            action: "SYNC_KANDIDAT",
            entity: "kandidat",
            ipAddress: getIP(req),
            metadata: result,
          });
        }
      } catch {}

      return ok({
        message: `Sync selesai: ${result.created} dibuat, ${result.updated} diperbarui`,
        ...result,
      });
    },
    ["ADMIN"],
  );
}
