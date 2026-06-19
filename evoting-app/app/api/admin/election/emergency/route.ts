import { NextRequest } from 'next/server'
import { ok, err, withAuth, logActivity, getIP } from '@/lib/api'
import prisma from '@/lib/db'

export async function POST(req: NextRequest) {
  return withAuth(req, async (req, payload) => {
    const { electionId, action } = await req.json()
    if (!electionId || !['SUSPEND', 'RESUME', 'END'].includes(action))
      return err('electionId dan action (SUSPEND/RESUME/END) wajib diisi')

    const statusMap: Record<string, string> = { SUSPEND: 'SUSPENDED', RESUME: 'ACTIVE', END: 'ENDED' }
    const election = await prisma.pemilihan.update({
      where: { id: electionId },
      data:  { status: statusMap[action] as 'SUSPENDED' | 'ACTIVE' | 'ENDED' },
    })

    await logActivity({
      userId: payload.sub, role: payload.role, action: `ELECTION_${action}`,
      entity: 'pemilihan', entityId: electionId, ipAddress: getIP(req),
      metadata: { namaPemilihan: election.nama },
    })

    return ok({ status: election.status, nama: election.nama })
  }, ['ADMIN'])
}
