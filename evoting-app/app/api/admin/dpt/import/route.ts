import { NextRequest } from 'next/server'
import { ok, err, withAuth, logActivity, getIP } from '@/lib/api'
import prisma from '@/lib/db'
import ExcelJS from 'exceljs'
import { parse } from 'csv-parse/sync'

type DPTRow = {
  nik: string
  nama: string
  noHP?: string
  email?: string
}

export async function POST(req: NextRequest) {
  return withAuth(
    req,
    async (req, payload) => {
      try {
        const formData = await req.formData()
        const file = formData.get('file') as File | null

        if (!file) {
          return err('File tidak ditemukan')
        }

        const allowed = [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-excel',
          'text/csv'
        ]

        if (
          !allowed.includes(file.type) &&
          !file.name.match(/\.(xlsx|csv)$/i)
        ) {
          return err('Format file tidak didukung. Gunakan .xlsx atau .csv')
        }

        const buffer = Buffer.from(await file.arrayBuffer())

        const rows: DPTRow[] = []
        const errors: string[] = []

        if (file.name.toLowerCase().endsWith('.xlsx')) {
          const workbook = new ExcelJS.Workbook()

          await workbook.xlsx.load(buffer)

          const sheet = workbook.worksheets[0]

          if (!sheet) {
            return err('Sheet tidak ditemukan')
          }

          sheet.eachRow((row, rowNum) => {
            if (rowNum === 1) return

            const nik = String(row.getCell(1).value ?? '').trim()
            const nama = String(row.getCell(2).value ?? '').trim()
            const noHP =
              String(row.getCell(3).value ?? '').trim() || undefined
            const email =
              String(row.getCell(4).value ?? '').trim() || undefined

            if (!/^\d{16}$/.test(nik)) {
              errors.push(`Baris ${rowNum}: NIK "${nik}" tidak valid`)
              return
            }

            if (!nama) {
              errors.push(`Baris ${rowNum}: Nama kosong`)
              return
            }

            rows.push({
              nik,
              nama,
              noHP,
              email
            })
          })
        } else {
          const text = buffer.toString('utf8')

          const records = parse(text, {
            columns: true,
            skip_empty_lines: true
          })

          records.forEach((row: any, index: number) => {
            const nik = String(row.nik ?? '').trim()
            const nama = String(row.nama ?? '').trim()
            const noHP = String(row.noHP ?? '').trim() || undefined
            const email = String(row.email ?? '').trim() || undefined

            const rowNum = index + 2

            if (!/^\d{16}$/.test(nik)) {
              errors.push(`Baris ${rowNum}: NIK "${nik}" tidak valid`)
              return
            }

            if (!nama) {
              errors.push(`Baris ${rowNum}: Nama kosong`)
              return
            }

            rows.push({
              nik,
              nama,
              noHP,
              email
            })
          })
        }

        if (errors.length > 0) {
          return err(
            `Ditemukan ${errors.length} error:\n${errors
              .slice(0, 10)
              .join('\n')}`
          )
        }

        let inserted = 0
        let updated = 0

        for (const d of rows) {
          const existing = await prisma.dPT.findUnique({
            where: {
              nik: d.nik
            }
          })

          if (existing) {
            await prisma.dPT.update({
              where: {
                nik: d.nik
              },
              data: {
                nama: d.nama,
                noHP: d.noHP,
                email: d.email
              }
            })

            updated++
          } else {
            await prisma.dPT.create({
              data: {
                nik: d.nik,
                nama: d.nama,
                noHP: d.noHP,
                email: d.email,
                kodeWilayah: d.nik.slice(0, 6),
                importedBy: payload.sub
              }
            })

            inserted++
          }
        }

        await logActivity({
          userId: payload.sub,
          role: payload.role,
          action: 'IMPORT_DPT',
          ipAddress: getIP(req),
          metadata: {
            inserted,
            updated,
            total: rows.length,
            filename: file.name
          }
        })

        return ok({
          inserted,
          updated,
          total: rows.length
        })
      } catch (error) {
        console.error(error)

        return err(
          error instanceof Error
            ? error.message
            : 'Gagal memproses file'
        )
      }
    },
    ['ADMIN', 'PANITIA']
  )
}