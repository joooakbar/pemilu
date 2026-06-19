import { NextRequest } from 'next/server'
import { ok, err, withAuth, logActivity, getIP } from '@/lib/api'
import { sendWhatsApp, sendEmail, templateTokenWA, templateTokenEmail } from '@/lib/notifications'
import prisma from '@/lib/db'

export async function POST(req: NextRequest) {
  return withAuth(req, async (req, payload) => {
    const { electionId, via } = await req.json()
    if (!electionId || !Array.isArray(via) || via.length === 0)
      return err('electionId dan via (array) wajib diisi')
    if (!via.every(v => ['WA', 'EMAIL'].includes(v)))
      return err('via hanya boleh WA atau EMAIL')

    // Ambil tokens + dpt yang belum dikirim
    const tokens = await prisma.voteToken.findMany({
      where: {
        idPemilihan: electionId,
        OR: [
          via.includes('WA') ? { sentViaWA: false } : {},
          via.includes('EMAIL') ? { sentViaEmail: false } : {},
        ],
      },
      include: { dpt: true },
    })

    if (tokens.length === 0) return ok({ waSent: 0, emailSent: 0, message: 'Tidak ada token untuk dikirim' })

    let waSent = 0, emailSent = 0

    // Kirim via channel yang dipilih
    for (const token of tokens) {
      const { dpt } = token

      if (via.includes('WA') && dpt.noHP) {
        try {
          await sendWhatsApp(dpt.noHP, templateTokenWA({ nama: dpt.nama, token: token.tokenHash }))
          await prisma.voteToken.update({ where: { id: token.id }, data: { sentViaWA: true } })
          waSent++
        } catch (e) {
          // Silent fail untuk broadcast
        }
      }

      if (via.includes('EMAIL') && dpt.email) {
        try {
          await sendEmail({
            to: dpt.email,
            subject: 'Token Pemilihan Anda',
            html: templateTokenEmail({ nama: dpt.nama, token: token.tokenHash }),
          })
          await prisma.voteToken.update({ where: { id: token.id }, data: { sentViaEmail: true } })
          emailSent++
        } catch (e) {
          // Silent fail untuk broadcast
        }
      }
    }

    await logActivity({
      userId: payload.sub, role: payload.role, action: 'BROADCAST_TOKENS',
      entity: 'voteToken', entityId: electionId, ipAddress: getIP(req),
      metadata: { via, waSent, emailSent, total: tokens.length },
    })

    return ok({ waSent, emailSent, total: tokens.length })
  }, ['ADMIN', 'PANITIA'])
}
