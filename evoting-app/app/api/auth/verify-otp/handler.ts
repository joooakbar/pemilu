import { NextRequest } from 'next/server'
import { ok, err, rateLimit, logActivity, getIP } from '@/lib/api'
import { verifyOTP, signJWT, setAuthCookie }       from '@/lib/auth'
import prisma from '@/lib/db'

export async function handleVerifyOtp(req: NextRequest) {
  const ip = getIP(req)
  if (!rateLimit(`verify-otp:${ip}`, 10, 60 * 60 * 1000))
    return err('Terlalu banyak percobaan. Coba lagi 1 jam.', 429)

  const { userId, otp } = await req.json()
  if (!userId || !otp) return err('Data tidak lengkap')

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user || !user.isActive) return err('User tidak ditemukan', 404)

  // Cari OTP aktif
  const record = await prisma.loginOTP.findFirst({
    where: {
      userId,
      isUsed:    false,
      expiredAt: { gt: new Date() },
    },
    orderBy: { createdAt: 'desc' },
  })

  if (!record) return err('Kode verifikasi tidak ditemukan atau sudah kadaluarsa. Silakan login ulang.', 401)

  const valid = await verifyOTP(otp.toUpperCase().trim(), record.otpHash)
  if (!valid) return err('Kode verifikasi salah', 401)

  // Tandai OTP sudah dipakai
  await prisma.loginOTP.update({ where: { id: record.id }, data: { isUsed: true } })

  // Set JWT cookie
  const token = signJWT({ sub: user.id, role: user.role, name: user.username })
  await setAuthCookie(token)

  await logActivity({
    userId: user.id, role: user.role, action: 'LOGIN_SUCCESS',
    ipAddress: ip, metadata: { email: user.email },
  })

  return ok({ role: user.role, name: user.username })
}
