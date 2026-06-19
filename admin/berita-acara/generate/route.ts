import { NextRequest } from 'next/server'
import { err, withAuth } from '@/lib/api'
import prisma from '@/lib/db'
import { renderToBuffer } from '@react-pdf/renderer'
import { createElement } from 'react'
import { BeritaAcaraPDF } from '@/components/admin/BeritaAcaraPDF'

export async function GET(req: NextRequest) {
  return withAuth(req, async (req) => {
    const electionId = req.nextUrl.searchParams.get('electionId')
    if (!electionId) return err('electionId wajib diisi')

    const [election, totalDPT, votes, kandidatRefs] = await Promise.all([
      prisma.election.findUnique({ where: { id: electionId } }),
      prisma.dPT.count(),
      prisma.vote.groupBy({ by: ['kandidatRefId'], where: { electionId }, _count: true }),
      prisma.kandidatRef.findMany({ where: { isActive: true } }),
    ])

    if (!election) return err('Pemilihan tidak ditemukan', 404)

    const data = {
      election,
      totalDPT,
      totalSuara: votes.reduce((s, v) => s + v._count, 0),
      rekapitulasi: votes.map(v => ({
        nomor:  kandidatRefs.find(k => k.id === v.kandidatRefId)?.nomorUrut ?? 0,
        nama:   kandidatRefs.find(k => k.id === v.kandidatRefId)?.nama ?? v.kandidatRefId,
        jumlah: v._count,
      })).sort((a, b) => a.nomor - b.nomor),
      generatedAt: new Date(),
    }

    const pdfBuffer = await renderToBuffer(createElement(BeritaAcaraPDF, { data }))

    return new Response(pdfBuffer, {
      headers: {
        'Content-Type':        'application/pdf',
        'Content-Disposition': `attachment; filename="Berita-Acara-${electionId}.pdf"`,
      },
    })
  }, ['ADMIN'])
}
