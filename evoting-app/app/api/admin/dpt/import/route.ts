import { NextRequest } from "next/server";
import { ok, err, withAuth, logActivity, getIP } from "@/lib/api";
import prisma from "@/lib/db";
import ExcelJS from "exceljs";
import { parse } from "csv-parse/sync";

type DPTRow = {
  nik: string;
  nama: string;
  noHP?: string;
  email?: string;
};

type CSVRow = {
  nik?: string;
  nama?: string;
  noHP?: string;
  email?: string;
};

export async function POST(req: NextRequest) {
  return withAuth(
    req,
    async (req, payload) => {
      try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) return err("File tidak ditemukan");

        const allowed = [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel",
          "text/csv",
        ];

        if (
          !allowed.includes(file.type) &&
          !file.name.match(/\.(xlsx|csv)$/i)
        ) {
          return err("Format file tidak didukung. Gunakan .xlsx atau .csv");
        }

        // ✅ FIX BUFFER ERROR (INI YANG KAMU TANYA)
        const buffer = Buffer.from(
          new Uint8Array(await file.arrayBuffer()),
        ) as unknown as Buffer;

        const rows: DPTRow[] = [];
        const errors: string[] = [];

        // =========================
        // XLSX
        // =========================
        if (file.name.toLowerCase().endsWith(".xlsx")) {
          const workbook = new ExcelJS.Workbook();
          await workbook.xlsx.load(buffer);

          const sheet = workbook.worksheets[0];

          if (!sheet || sheet.rowCount <= 1) {
            return err("Sheet kosong atau tidak valid");
          }

          sheet.eachRow((row, rowNum) => {
            if (rowNum === 1) return;

            const nik = String(row.getCell(1).value ?? "").trim();
            const nama = String(row.getCell(2).value ?? "").trim();
            const noHP = String(row.getCell(3).value ?? "").trim() || undefined;
            const email =
              String(row.getCell(4).value ?? "").trim() || undefined;

            if (!/^\d{16}$/.test(nik)) {
              errors.push(`Baris ${rowNum}: NIK "${nik}" tidak valid`);
              return;
            }

            if (!nama) {
              errors.push(`Baris ${rowNum}: Nama kosong`);
              return;
            }

            rows.push({ nik, nama, noHP, email });
          });
        }

        // =========================
        // CSV
        // =========================
        else {
          const text = buffer.toString("utf8");

          const records: CSVRow[] = parse(text, {
            columns: true,
            skip_empty_lines: true,
          });

          records.forEach((row, index) => {
            const nik = String(row.nik ?? "").trim();
            const nama = String(row.nama ?? "").trim();
            const noHP = String(row.noHP ?? "").trim() || undefined;
            const email = String(row.email ?? "").trim() || undefined;

            const rowNum = index + 2;

            if (!/^\d{16}$/.test(nik)) {
              errors.push(`Baris ${rowNum}: NIK "${nik}" tidak valid`);
              return;
            }

            if (!nama) {
              errors.push(`Baris ${rowNum}: Nama kosong`);
              return;
            }

            rows.push({ nik, nama, noHP, email });
          });
        }

        if (errors.length > 0) {
          return err(
            `Ditemukan ${errors.length} error:\n${errors.slice(0, 10).join("\n")}`,
          );
        }

        // =========================
        // UPSERT (OPTIMIZED)
        // =========================
        const results = await prisma.$transaction(
          rows.map((d) =>
            prisma.dPT.upsert({
              where: { nik: d.nik },
              update: {
                nama: d.nama,
                noHP: d.noHP,
                email: d.email,
              },
              create: {
                nik: d.nik,
                nama: d.nama,
                noHP: d.noHP,
                email: d.email,
                kodeWilayah: d.nik.slice(0, 6),
                importedBy: payload.sub,
              },
            }),
          ),
        );

        const inserted = results.filter(
          (r) => r.createdAt === r.updatedAt,
        ).length;
        const updated = results.length - inserted;

        // =========================
        // LOG ACTIVITY (FIXED ENTITY)
        // =========================
        await logActivity({
          userId: payload.sub,
          role: payload.role,
          action: "IMPORT_DPT",
          entity: "DPT",
          ipAddress: getIP(req),
          metadata: {
            inserted,
            updated,
            total: rows.length,
            filename: file.name,
          },
        });

        return ok({
          inserted,
          updated,
          total: rows.length,
        });
      } catch (error) {
        console.error(error);

        return err(
          error instanceof Error ? error.message : "Gagal memproses file",
        );
      }
    },
    ["ADMIN", "PANITIA"],
  );
}
