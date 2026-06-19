import { NextRequest } from 'next/server'
import { ok, err, withAuth, logActivity, getIP } from '@/lib/api'
import { hashPassword } from '@/lib/auth'
import prisma from '@/lib/db'
import { z } from 'zod'

const createSaksiSchema = z.object({
  username: z.string().min(3).max(50),
  email:    z.string().email(),
  password: z.string().min(8, 'Password minimal 8 karakter'),
})

export async function POST(req: NextRequest) {
  return withAuth(req, async (req, payload) => {
    const body = await req.json()
    const parsed = createSaksiSchema.safeParse(body)
    if (!parsed.success) return err(parsed.error.errors[0].message)

    const { username, email, password } = parsed.data

    const existing = await prisma.user.findFirst({ where: { OR: [{ email }, { username }] } })
    if (existing) return err('Email atau username sudah digunakan', 409)

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash: await hashPassword(password),
        role: 'SAKSI', // Fixed role untuk endpoint ini
      },
      select: { id: true, username: true, email: true, role: true, isActive: true, createdAt: true },
    })

    await logActivity({
      userId: payload.sub, role: payload.role,
      action: 'CREATE_USER_SAKSI', entity: 'users', entityId: user.id, ipAddress: getIP(req),
      metadata: { email },
    })

    return ok(user, 201)
  }, ['ADMIN'])
}
