import { NextRequest } from 'next/server'
import { ok, err, withAuth, logActivity, getIP } from '@/lib/api'
import { hashPassword } from '@/lib/auth'
import prisma from '@/lib/db'

export async function POST(req: NextRequest) {
  return withAuth(req, async (req, payload) => {
    const { username, email, password } = await req.json()
    if (!username || !email || !password) return err('Semua field wajib diisi')
    if (password.length < 8) return err('Password minimal 8 karakter')

    const existing = await prisma.user.findFirst({ where: { OR: [{ email }, { username }] } })
    if (existing) return err('Email atau username sudah digunakan', 409)

    const user = await prisma.user.create({
      data: { username, email, passwordHash: await hashPassword(password), role: 'SAKSI' },
    })

    await logActivity({ userId: payload.sub, role: payload.role, action: 'CREATE_SAKSI',
      entity: 'users', entityId: user.id, ipAddress: getIP(req) })

    return ok({ id: user.id, username: user.username, email: user.email, isActive: user.isActive, createdAt: user.createdAt.toISOString() }, 201)
  }, ['ADMIN'])
}
