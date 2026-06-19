import { NextRequest } from 'next/server'
import { ok, err, withAuth, logActivity, getIP } from '@/lib/api'
import { hashPassword } from '@/lib/auth'
import prisma from '@/lib/db'
import { z } from 'zod'

export async function GET(req: NextRequest) {
  return withAuth(
    req,
    async () => {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          isActive: true,
          createdAt: true,
          nama: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      })

      return ok(users)
    },
    ['ADMIN'],
  )
}

const createSchema = z.object({
  username: z.string().min(3, 'Username minimal 3 karakter').max(50),
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  role: z.enum(['ADMIN', 'PANITIA', 'SAKSI']),
  nama: z.string().optional(),
})

export async function POST(req: NextRequest) {
  return withAuth(
    req,
    async (req, payload) => {
      try {
        const body = await req.json()

        const parsed = createSchema.safeParse(body)

        if (!parsed.success) {
          return err(parsed.error.issues[0].message, 400)
        }

        const {
          username,
          email,
          password,
          role,
          nama,
        } = parsed.data

        const existing = await prisma.user.findFirst({
          where: {
            OR: [
              { username },
              { email },
            ],
          },
        })

        if (existing) {
          const field =
            existing.username === username
              ? 'Username'
              : 'Email'

          return err(`${field} sudah terdaftar`, 400)
        }

        const passwordHash = await hashPassword(password)

        const user = await prisma.user.create({
          data: {
            username,
            email,
            passwordHash,
            role,
            nama: nama || username,
            isActive: true,
          },
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true,
            nama: true,
          },
        })

        await logActivity({
          userId: payload.sub,
          role: payload.role,
          action: `CREATE_USER_${role}`,
          entity: 'user',
          entityId: user.id,
          ipAddress: getIP(req),
          metadata: {
            username,
            email,
            role,
          },
        })

        return ok(user, 201)
      } catch (e: unknown) {
        return err(
          e instanceof Error
            ? e.message
            : 'Gagal membuat pengguna',
          500,
        )
      }
    },
    ['ADMIN'],
  )
}