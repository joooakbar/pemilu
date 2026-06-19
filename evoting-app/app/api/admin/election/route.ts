import { NextRequest } from 'next/server'
import { ok, err, withAuth, logActivity, getIP } from '@/lib/api'
import prisma from '@/lib/db'
import { z } from 'zod'

export async function GET(req: NextRequest) {
  return withAuth(req, async () => {
    const elections = await prisma.pemilihan.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return ok(elections)
  }, ['ADMIN', 'PANITIA', 'SAKSI'])
}

const createSchema = z.object({
  nama: z.string().min(3),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  tempatVoting: z.string().optional(),
  deskripsi: z.string().optional(),
})

export async function POST(req: NextRequest) {
  return withAuth(req, async (req, payload) => {
    const body = await req.json()
    const parsed = createSchema.safeParse(body)
    if (!parsed.success) return err(parsed.error.errors[0].message)

    const { nama, startTime, endTime, tempatVoting, deskripsi } = parsed.data
    const start = new Date(startTime)
    const end = new Date(endTime)
    if (end <= start) return err('endTime harus lebih besar dari startTime')

    const election = await prisma.pemilihan.create({
      data: { nama, status: 'DRAFT', startTime: start, endTime: end, tempatVoting, deskripsi },
      include: { _count: { select: { kandidat: true, votes: true } } },
    })

    await logActivity({ userId: payload.sub, role: payload.role,
      action: 'CREATE_ELECTION', entity: 'pemilihan', entityId: election.id,
      ipAddress: getIP(req), metadata: { nama },
    })

    return ok(election, 201)
  }, ['ADMIN'])
}
