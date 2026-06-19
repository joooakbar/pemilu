import { NextRequest } from 'next/server'
import { err, withAuth } from '@/lib/api'
import prisma from '@/lib/db'
import ExcelJS from 'exceljs'

export async function GET(req: NextRequest) {
  return withAuth(req, async () => {
    const dpt = await prisma.dPT.findMany({ orderBy: { kodeWilayah: 'asc' } })

    const wb    = new ExcelJS.Workbook()
    const sheet = wb.addWorksheet('DPT')

    sheet.addRow(['NIK', 'Nama', 'Kode Wilayah', 'Phone', 'Email', 'Sudah Pilih', 'Waktu Pilih'])
    sheet.getRow(1).font = { bold: true }

    dpt.forEach(d => sheet.addRow([
      d.nik, d.nama, d.kodeWilayah, d.phone ?? '', d.email ?? '',
      d.hasVoted ? 'Ya' : 'Tidak',
      d.votedAt ? new Date(d.votedAt).toLocaleString('id-ID') : '',
    ]))

    const buffer = await wb.xlsx.writeBuffer()
    return new Response(buffer, {
      headers: {
        'Content-Type':        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="DPT-Export.xlsx"',
      },
    })
  }, ['ADMIN', 'PANITIA'])
}
