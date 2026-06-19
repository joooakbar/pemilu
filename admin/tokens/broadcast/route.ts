import { NextRequest } from 'next/server'
import { ok, err, withAuth, logActivity, getIP } from '@/lib/api'
import { generateOTP, hashOTP, verifyOTP } from '@/lib/auth'
import { sendWhatsApp, sendEmail, templateTokenWA, templateTokenEmail } from '@/lib/notifications'
import prisma from '@/lib/db'

export async function POST(req: NextRequest) {
  return withAuth(req, async (req, payload) => {
    const { electionId, via = ['wa', 'email'], expiredJam = 24 } = await req.json()
    if (!electionId) return err('electionId wajib diisi')

    const dptList = await prisma.dPT.findMany({ where: { hasVoted: false } })
    let waSent = 0, emailSent = 0, failed = 0

    for (const dpt of dptList) {
      // Generate token baru atau pakai yang ada
      const otp      = generateOTP()
      const hash     = await hashOTP(otp)
      const expiresAt = new Date(Date.now() + expiredJam * 3_600_000)

      await prisma.voteToken.upsert({
        where:  { dptId_electionId: { dptId: dpt.id, electionId } },
        update: { tokenHash: hash, isUsed: false, expiresAt, sentViaWa: false, sentViaEmail: false },
        create: { dptId: dpt.id, electionId, tokenHash: hash, expiresAt },
      })

      // Kirim WA
      if (via.includes('wa') && dpt.phone) {
        const res = await sendWhatsApp(dpt.phone, templateTokenWA(dpt.nama, otp, expiredJam))
        if (res.success) {
          await prisma.voteToken.updateMany({ where: { dptId: dpt.id, electionId }, data: { sentViaWa: true } })
          waSent++
        } else failed++
      }

      // Kirim Email
      if (via.includes('email') && dpt.email) {
        const res = await sendEmail({ to: dpt.email, subject: 'Token Voting E-VOTIS', html: templateTokenEmail(dpt.nama, otp, expiredJam) })
        if (res.success) {
          await prisma.voteToken.updateMany({ where: { dptId: dpt.id, electionId }, data: { sentViaEmail: true } })
          emailSent++
        } else failed++
      }
    }

    await logActivity({
      userId: payload.sub, role: payload.role, action: 'BROADCAST_TOKENS',
      ipAddress: getIP(req), metadata: { electionId, waSent, emailSent, failed },
    })

    return ok({ waSent, emailSent, failed, total: dptList.length })
  }, ['ADMIN', 'PANITIA'])
}
