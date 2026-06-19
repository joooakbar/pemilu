import { NextRequest } from 'next/server'
import { ok, err, withAuth, logActivity, getIP } from '@/lib/api'
import prisma from '@/lib/db'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(req, async (req, payload) => {
    const { id } = await params
    const body   = await req.json()

    const data: Record<string, unknown> = {}
    if (body.nama)         data.nama         = body.nama
    if (body.startTime)    data.startTime    = new Date(body.startTime)
    if (body.endTime)      data.endTime      = new Date(body.endTime)
    if (body.tempatVoting !== undefined) data.tempatVoting = body.tempatVoting
    if (body.deskripsi !== undefined)    data.deskripsi    = body.deskripsi
    if (body.status)       data.status       = body.status

    const election = await prisma.election.update({ where: { id }, data })

    await logActivity({ userId: payload.sub, role: payload.role, action: 'UPDATE_ELECTION',
      entity: 'elections', entityId: id, ipAddress: getIP(req), metadata: data })

    return ok(election)
  }, ['ADMIN'])
}
