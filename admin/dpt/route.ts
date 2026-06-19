import { NextRequest } from 'next/server'
import { ok, err, withAuth } from '@/lib/api'
import prisma from '@/lib/db'

export async function GET(req: NextRequest) {
  return withAuth(req, async (req) => {
    const q = req.nextUrl.searchParams.get('q') ?? ''
    const dpt = await prisma.dPT.findMany({
      where: q ? { OR: [{ nik: { contains: q } }, { nama: { contains: q, mode: 'insensitive' } }] } : {},
      orderBy: { createdAt: 'desc' },
      take: 500,
    })
    return ok(dpt)
  }, ['ADMIN', 'PANITIA', 'SAKSI'])
}
