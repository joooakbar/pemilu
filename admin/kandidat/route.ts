import { NextRequest } from 'next/server'
import { ok, withAuth } from '@/lib/api'
import prisma from '@/lib/db'

export async function GET(req: NextRequest) {
  return withAuth(req, async () => {
    const data = await prisma.kandidatRef.findMany({
      orderBy: { nomorUrut: 'asc' },
    })
    return ok(data)
  }, ['ADMIN', 'PANITIA', 'SAKSI'])
}
