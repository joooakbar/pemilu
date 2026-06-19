import { NextRequest } from 'next/server'
import { ok, err, withAuth, logActivity, getIP } from '@/lib/api'
import { hashPassword } from '@/lib/auth'
import prisma from '@/lib/db'

// Toggle aktif/nonaktif atau ganti password
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(req, async (req, payload) => {
    const { id } = await params
    const body   = await req.json()

    const data: Record<string, unknown> = {}
    if (typeof body.isActive === 'boolean') data.isActive = body.isActive
    if (body.password) data.passwordHash = await hashPassword(body.password)

    const user = await prisma.user.update({ where: { id }, data,
      select: { id: true, username: true, email: true, role: true, isActive: true },
    })

    await logActivity({ userId: payload.sub, role: payload.role,
      action: 'UPDATE_USER', entity: 'users', entityId: id,
      ipAddress: getIP(req), metadata: data.isActive !== undefined ? { isActive: data.isActive } : { passwordChanged: true },
    })

    return ok(user)
  }, ['ADMIN'])
}

// Hapus user
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(req, async (req, payload) => {
    const { id } = await params

    // Tidak boleh hapus diri sendiri
    if (id === payload.sub) return err('Tidak bisa menghapus akun sendiri', 400)

    await prisma.user.delete({ where: { id } })

    await logActivity({ userId: payload.sub, role: payload.role,
      action: 'DELETE_USER', entity: 'users', entityId: id, ipAddress: getIP(req),
    })

    return ok({ deleted: true })
  }, ['ADMIN'])
}
