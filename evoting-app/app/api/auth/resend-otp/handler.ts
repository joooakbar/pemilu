import { NextRequest } from 'next/server'
import prisma from '@/lib/db'
import { ok, err, rateLimit, getIP, logActivity } from '@/lib/api'
import { generateOTP, hashOTP } from '@/lib/auth'
import { sendEmail } from '@/lib/notifications'
import { z } from 'zod'

/* ===== Schema lokal (bisa dipindah ke features/auth jika mau reuse) ===== */
const resendSchema = z.object({
  userId: z.string().min(1),
})

export async function handleResendOtp(req: NextRequest) {
  try {
    const ip = getIP(req)

    /* 1. Parse & validate */
    const body = await req.json()
    const parsed = resendSchema.safeParse(body)
    if (!parsed.success) return err('Input tidak valid', 400)

    const { userId } = parsed.data

    /* 2. Rate limit (anti abuse) */
    if (!rateLimit(`resend:${userId}:${ip}`, 3, 5 * 60 * 1000)) {
      return err('Terlalu sering meminta OTP. Coba lagi beberapa menit.', 429)
    }

    /* 3. Ambil user */
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user || !user.isActive) {
      return err('User tidak ditemukan', 404)
    }

    /* 4. Generate OTP baru */
    const otp = generateOTP()
    const otpHash = await hashOTP(otp)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

    /* 5. Replace OTP lama (atomic) */
    await prisma.$transaction(async (tx) => {
      await tx.loginOtp.deleteMany({ where: { userId } })
      await tx.loginOtp.create({
        data: { userId, otpHash, expiresAt },
      })
    })

    /* 6. Kirim email (jangan block response kalau gagal) */
    sendEmail({
      to: user.email,
      subject: 'Kode OTP Baru - E-VOTIS',
      html: `
        <div style="font-family:Arial;max-width:480px;margin:auto;padding:20px;border:1px solid #eee;border-radius:8px">
          <h2>Kode Verifikasi Baru</h2>
          <p>Halo <strong>${user.username}</strong>,</p>
          <p>Gunakan kode berikut:</p>
          <div style="font-size:32px;font-weight:bold;letter-spacing:8px;text-align:center;margin:20px 0;">
            ${otp}
          </div>
          <p>Kode berlaku 10 menit.</p>
        </div>
      `,
    }).catch((e) => {
      console.error('[RESEND_OTP_EMAIL_ERROR]', e)
    })

    /* 7. Logging (penting untuk audit/SIEM) */
    await logActivity({
      userId: user.id,
      role: user.role,
      action: 'RESEND_OTP',
      ipAddress: ip,
    })

    /* 8. Response */
    return ok({ success: true })

  } catch (e) {
    console.error('[RESEND_OTP_ERROR]', e)
    return err('Internal server error', 500)
  }
}