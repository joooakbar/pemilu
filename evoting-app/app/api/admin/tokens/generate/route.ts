import { NextRequest } from 'next/server'
import { ok, err, withAuth, logActivity, getIP } from '@/lib/api'
import { generateOTP, hashOTP } from '@/lib/auth'
import prisma from '@/lib/db'

export async function POST(req: NextRequest) {
  return withAuth(req, async (req, payload) => {
    const { electionId, expiredJam = 24 } = await req.json()
    if (!electionId) return err('electionId wajib diisi')

    const dptList  = await prisma.dPT.findMany()
    const expiresAt = new Date(Date.now() + expiredJam * 3_600_000)
    let generated  = 0, skipped = 0

    for (const dpt of dptList) {
      const existing = await prisma.voteToken.findFirst({
        where: { dptId: dpt.id, idPemilihan: electionId, isUsed: false, expiredAt: { gt: new Date() } },
      })
      if (existing) { skipped++; continue }

      const otp  = generateOTP()
      const hash = await hashOTP(otp)
      await prisma.voteToken.upsert({
        where:  { dptId_idPemilihan: { dptId: dpt.id, idPemilihan: electionId } },
        update: { tokenHash: hash, isUsed: false, expiredAt, sentViaWA: false, sentViaEmail: false },
        create: { dptId: dpt.id, idPemilihan: electionId, tokenHash: hash, expiredAt },
      })
      generated++
    }

    await logActivity({
      userId: payload.sub, role: payload.role, action: 'GENERATE_TOKENS',
      ipAddress: getIP(req), metadata: { electionId, generated, skipped },
    })

    return ok({ generated, skipped, total: dptList.length })
  }, ['ADMIN', 'PANITIA'])
}
