import { NextRequest, NextResponse } from 'next/server'
import { err, withAuth, logActivity, getIP } from '@/lib/api'
import prisma from '@/lib/db'

export async function GET(req: NextRequest) {
  return withAuth(req, async (req, payload) => {
    try {
      const format = new URL(req.url).searchParams.get('format') || 'csv'

      const data = await prisma.dPT.findMany({
        select: {
          nik: true,
          nama: true,
          kodeWilayah: true,
          noHP: true,
          email: true,
          hasVoted: true,
          votedAt: true,
        },
        orderBy: { createdAt: 'asc' },
      })

      if (format === 'csv') {
        // Generate CSV
        const headers = ['NIK', 'Nama', 'Kode Wilayah', 'No. HP', 'Email', 'Sudah Memilih', 'Waktu Memilih']
        const rows = data.map(d => [
          d.nik,
          d.nama,
          d.kodeWilayah,
          d.noHP || '',
          d.email || '',
          d.hasVoted ? 'Ya' : 'Tidak',
          d.votedAt ? new Date(d.votedAt).toLocaleString('id-ID') : '',
        ])

        const csv = [
          headers.join(','),
          ...rows.map(r =>
            r
              .map(cell => {
                // Escape quotes dan wrap in quotes jika ada comma
                const escaped = String(cell).replace(/"/g, '""')
                return escaped.includes(',') ? `"${escaped}"` : escaped
              })
              .join(','),
          ),
        ].join('\n')

        const filename = `dpt_${new Date().toISOString().split('T')[0]}.csv`

        await logActivity({
          userId: payload.sub,
          role: payload.role,
          action: 'EXPORT_DPT',
          entity: 'dpt',
          ipAddress: getIP(req),
          metadata: { format: 'csv', count: data.length },
        })

        return new NextResponse(csv, {
          headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': `attachment; filename="${filename}"`,
          },
        })
      }

      return err('Format tidak didukung', 400)
    } catch (e: unknown) {
      return err(e instanceof Error ? e.message : 'Gagal export DPT', 500)
    }
  }, ['ADMIN', 'PANITIA'])
}
