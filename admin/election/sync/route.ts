import { NextRequest } from 'next/server'
import { ok, err, withAuth, logActivity, getIP } from '@/lib/api'
import { getElectionInfo } from '@/sanity/lib/fetchers'
import prisma from '@/lib/db'

/**
 * POST /api/admin/election/sync
 * Sinkronisasi electionInfo dari Sanity → tabel elections di MySQL
 *
 * Logika:
 * - Jika sudah ada election dengan sanityId sama → UPDATE nama, waktu, tempat, deskripsi
 * - Jika belum ada → CREATE election baru dengan status DRAFT
 * - Status (DRAFT/ACTIVE/SUSPENDED/ENDED) TIDAK pernah diubah oleh sync ini
 *   karena status dikelola sendiri oleh admin via emergency/activate
 */
export async function POST(req: NextRequest) {
  return withAuth(req, async (req, payload) => {
    // 1. Ambil data dari Sanity
    const info = await getElectionInfo()
    if (!info) return err('Data Info Pemilihan belum ada di Sanity. Buka Studio → Info Pemilihan → Publish.', 404)
    if (!info.startTime || !info.endTime)
      return err('Waktu Mulai dan Waktu Selesai wajib diisi di Sanity sebelum sync.', 422)
    if (new Date(info.startTime) >= new Date(info.endTime))
      return err('Waktu Mulai harus lebih awal dari Waktu Selesai di Sanity.', 422)

    // 2. Cek apakah sudah pernah disync (berdasarkan sanityId)
    const existing = await prisma.election.findUnique({ where: { sanityId: info._id } })

    let election
    let action: 'created' | 'updated'

    if (existing) {
      // UPDATE — jangan ubah status
      election = await prisma.election.update({
        where: { sanityId: info._id },
        data: {
          nama:         info.namaPemilihan,
          startTime:    new Date(info.startTime),
          endTime:      new Date(info.endTime),
          tempatVoting: info.tempatVoting ?? null,
          deskripsi:    info.deskripsi ?? null,
        },
      })
      action = 'updated'
    } else {
      // CREATE baru dengan status DRAFT
      election = await prisma.election.create({
        data: {
          sanityId:     info._id,
          nama:         info.namaPemilihan,
          status:       'DRAFT',
          startTime:    new Date(info.startTime),
          endTime:      new Date(info.endTime),
          tempatVoting: info.tempatVoting ?? null,
          deskripsi:    info.deskripsi ?? null,
        },
      })
      action = 'created'
    }

    await logActivity({
      userId:   payload.sub,
      role:     payload.role,
      action:   'SYNC_ELECTION',
      entity:   'elections',
      entityId: election.id,
      ipAddress: getIP(req),
      metadata: { action, sanityId: info._id, nama: info.namaPemilihan },
    })

    return ok({
      action,
      election,
      message: action === 'created'
        ? `Election "${election.nama}" berhasil dibuat dari Sanity (status: DRAFT)`
        : `Election "${election.nama}" berhasil diperbarui dari Sanity (status tetap: ${election.status})`,
    })
  }, ['ADMIN'])
}
