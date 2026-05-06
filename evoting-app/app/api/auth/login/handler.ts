import { NextRequest } from 'next/server'
import prisma from '@/lib/db'

import { loginSchema, loginResponseSchema } from '@/features/auth/schemas/auth.schema'
import { ok, err, rateLimit, getIP, logActivity } from '@/lib/api'
import { verifyPassword, generateOTP, hashOTP } from '@/lib/auth'
import { sendEmail } from '@/lib/notifications'

export async function handleLogin(req: NextRequest) {
  const ip = getIP(req)

  // 1) Rate limit berbasis IP
  if (!rateLimit(`login:ip:${ip}`, 5, 15 * 60 * 1000)) {
    return err('Terlalu banyak percobaan. Coba lagi 15 menit.', 429)
  }

  // 2) Parse + validasi schema
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return err('Invalid JSON body', 400)
  }

  const parsed = loginSchema.safeParse(body)
  if (!parsed.success) return err('Invalid input', 400)

  const { email, password } = parsed.data

  // 3) Ambil user (hindari user enumeration)
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.isActive) {
    return err('Email atau password salah', 401)
  }

  // 4) Rate limit berbasis user
  if (!rateLimit(`login:user:${user.id}`, 5, 15 * 60 * 1000)) {
    return err('Terlalu banyak percobaan pada akun ini', 429)
  }

  // 5) Verifikasi password
  const valid = await verifyPassword(password, user.passwordHash)
  if (!valid) {
    return err('Email atau password salah', 401)
  }

  // 6) Cooldown OTP (anti spam email)
  const lastOtp = await prisma.loginOTP.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  })

  if (lastOtp && Date.now() - lastOtp.createdAt.getTime() < 60_000) {
    return err('Tunggu 1 menit sebelum meminta OTP lagi', 429)
  }

  // 7) Hapus OTP lama (one active OTP)
  await prisma.loginOTP.deleteMany({
    where: { userId: user.id }
  })

  // 8) Generate + hash OTP (6 digit, TTL 10 menit)
  const otp = generateOTP()
  const otpHash = await hashOTP(otp)
  const expiredAt = new Date(Date.now() + 10 * 60 * 1000)

  await prisma.loginOTP.create({
    data: {
      userId: user.id,
      otpHash,
      expiredAt: expiredAt,
      attempts: 0,
      maxAttempts: 5
      // lockedUntil opsional jika sudah ada di schema
    }
  })

  // 9) Kirim email OTP
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:10px;">
      <h2 style="color:#1d4ed8;margin-bottom:4px;">E-VOTIS — Kode Verifikasi Login</h2>
      <p>Halo <strong>${user.username}</strong>,</p>
      <p>Gunakan kode berikut untuk menyelesaikan login:</p>
      <div style="background:#f3f4f6;padding:20px;border-radius:8px;text-align:center;margin:20px 0;">
        <span style="font-size:36px;font-weight:bold;letter-spacing:10px;color:#1d4ed8;">${otp}</span>
      </div>
      <p style="color:#6b7280;font-size:13px;">⏱ Berlaku 10 menit.</p>
      <p style="color:#ef4444;font-size:13px;">⚠️ Jangan bagikan kode ini.</p>
    </div>
  `

  const sent = await sendEmail({
    to: user.email,
    subject: 'Kode OTP Login',
    html
  })

  if (!sent.success) {
    // Jangan expose ke client
    console.error('[LOGIN][OTP_EMAIL_FAIL]', sent.error)
  }

  // 10) Logging (audit / SIEM)
  await logActivity({
    userId: user.id,
    role: user.role,
    action: 'LOGIN_REQUEST',
    ipAddress: ip,
    metadata: { email: user.email, otpSent: sent.success }
  })

  // 11) Response (kontrak FE)
  const result = {
    step: 'otp',
    userId: user.id,
    emailMask: user.email.replace(/(.{2}).*(@.*)/, '$1***$2'),
    message: 'Kode verifikasi telah dikirim ke email Anda'
  }

  return ok(loginResponseSchema.parse(result))
}