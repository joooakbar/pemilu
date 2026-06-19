import { NextRequest } from 'next/server'
import { err, withAuth, logActivity, getIP } from '@/lib/api'
import { renderToBuffer } from '@react-pdf/renderer'
import { createElement } from 'react'
import { BeritaAcaraPDF } from '@/features/admin/BeritaAcaraPDF/components/BeritaAcaraPDF'
import prisma from '@/lib/db'

export async function GET(req: NextRequest) {
  return withAuth(
    req,
    async (req, payload) => {
      try {
        const electionId = req.nextUrl.searchParams.get('electionId')

        if (!electionId) {
          return err('electionId wajib diisi', 400)
        }

        const [election, totalDPT, votes, kandidat] = await Promise.all([
          prisma.pemilihan.findUnique({
            where: { id: electionId },
          }),

          prisma.dPT.count(),

          prisma.votes.findMany({
            where: { idPemilihan: electionId },
          }),

          prisma.kandidat.findMany({
            orderBy: {
              noUrut: 'asc',
            },
          }),
        ])

        if (!election) {
          return err('Pemilihan tidak ditemukan', 404)
        }

        const rekapitulasi = kandidat.map((k) => ({
          nomor: k.noUrut,
          nama: k.nama,
          jumlah: votes.filter(
            (v) => v.idKandidat === k.id
          ).length,
        }))

        const data = {
          election: {
            nama: election.nama,
            startTime: election.startTime,
            endTime: election.endTime,
          },

          totalDPT,
          totalSuara: votes.length,
          rekapitulasi,
          generatedAt: new Date(),
        }

        const pdfBuffer = await renderToBuffer(
          createElement(BeritaAcaraPDF, { data })
        )

        await logActivity({
          userId: payload.sub,
          role: payload.role,
          action: 'GENERATE_BERITA_ACARA',
          entity: 'beritaAcara',
          entityId: electionId,
          ipAddress: getIP(req),
          metadata: {
            totalDPT,
            totalSuara: votes.length,
          },
        })

        return new Response(pdfBuffer, {
          status: 200,
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="berita_acara_${election.nama.replace(/\s+/g, '_')}.pdf"`,
          },
        })
      } catch (error) {
        console.error('Generate PDF Error:', error)

        return err(
          error instanceof Error
            ? error.message
            : 'Gagal generate berita acara',
          500
        )
      }
    },
    ['ADMIN']
  )
}