import { NextRequest } from 'next/server'
import { ok, err, withAuth, logActivity, getIP } from '@/lib/api'
import prisma from '@/lib/db'
import { z } from 'zod'
import { syncElectionStatuses } from "@/lib/election-status";

// GET — ambil semua elections
export async function GET(req: NextRequest) {
  return withAuth(req, async () => {
    await syncElectionStatuses(); // pastikan status selalu fresh

    const elections = await prisma.election.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return ok(elections)
  }, ['ADMIN', 'PANITIA', 'SAKSI'])
}

// POST — buat election baru (manual, tanpa Sanity)
const schema = z.object({
  nama:         z.string().min(3),
  startTime:    z.string().datetime(),
  endTime:      z.string().datetime(),
  tempatVoting: z.string().optional(),
  deskripsi:    z.string().optional(),
})

export async function POST(req: NextRequest) {
  return withAuth(req, async (req, payload) => {
    const body   = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) return err(parsed.error.errors[0].message)

    const { nama, startTime, endTime, tempatVoting, deskripsi } = parsed.data
    if (new Date(startTime) >= new Date(endTime))
      return err('Waktu mulai harus lebih awal dari waktu selesai')

    const election = await prisma.election.create({
      data: { nama, startTime: new Date(startTime), endTime: new Date(endTime), tempatVoting, deskripsi },
    })

    await logActivity({ userId: payload.sub, role: payload.role, action: 'CREATE_ELECTION',
      entity: 'elections', entityId: election.id, ipAddress: getIP(req), metadata: { nama } })

    return ok(election, 201)
  }, ['ADMIN'])
}
