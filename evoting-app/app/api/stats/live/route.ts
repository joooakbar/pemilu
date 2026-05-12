import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const idPemilihan =
    req.nextUrl.searchParams.get('idPemilihan')

  if (!idPemilihan) {
    return NextResponse.json(
      { error: 'idPemilihan required' },
      { status: 400 }
    )
  }

  const totalDPT =
    await prisma.dPT.count()

  const sudahMemilih =
    await prisma.votes.count({
      where: {
        idPemilihan: idPemilihan,
      },
    })

  const persen =
    totalDPT > 0
      ? Number(
          (
            (sudahMemilih / totalDPT) *
            100
          ).toFixed(1)
        )
      : 0

  return NextResponse.json({
    totalDPT,
    sudahMemilih,
    persen,
  })
}