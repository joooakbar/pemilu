import { NextRequest } from 'next/server'
import { ok, err, withAuth } from '@/lib/api'
import prisma from '@/lib/db'

export async function GET(req: NextRequest) {
  return withAuth(req, async (req, payload) => {
    try {
      const kandidat = await prisma.kandidat.findMany({
        select: {
          id: true,
          noUrut: true,
          nama: true,
          sanityId: true,
          isActive: true,
          idPemilihan: true,
        },
        orderBy: { noUrut: 'asc' },
      })

      return ok(
        kandidat.map(k => ({
          id: k.id,
          noUrut: k.noUrut,
          nama: k.nama,
          sanityId: k.sanityId,
          isActive: k.isActive,
          idPemilihan: k.idPemilihan,
        })),
      )
    } catch (e: unknown) {
      return err(e instanceof Error ? e.message : 'Gagal ambil data kandidat', 500)
    }
  }, ['ADMIN', 'PANITIA', 'SAKSI'])
}
