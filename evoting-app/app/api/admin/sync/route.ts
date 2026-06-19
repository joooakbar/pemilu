import { NextRequest } from 'next/server'
import { ok, err, withAuth, logActivity, getIP } from '@/lib/api'
import { getElectionInfo, getKandidatList } from '@/sanity/lib/fetchers'
import prisma from '@/lib/db'
import type { SyncSectionResult } from '@/types'

export async function POST(req: NextRequest) {
  return withAuth(req, async (req, payload) => {

    // ── 1. Sync Election ─────────────────────────────────────
    const electionResult: SyncSectionResult & { electionId?: string } = {
      created: 0, updated: 0, skipped: 0, errors: [],
    }

    const info = await getElectionInfo()
    if (!info) {
      electionResult.errors.push('Info Pemilihan belum ada di Sanity. Buat dan Publish terlebih dahulu.')
    } else if (!info.startTime || !info.endTime) {
      electionResult.errors.push('startTime dan endTime wajib diisi di Sanity.')
    } else {
      try {
        const start = new Date(info.startTime)
        const end   = new Date(info.endTime)

        if (isNaN(start.getTime()) || isNaN(end.getTime()))
          throw new Error('Format tanggal tidak valid di Sanity')
        if (end <= start)
          throw new Error('Waktu selesai harus lebih besar dari waktu mulai')

        const existing = await prisma.pemilihan.findFirst({
          where: { OR: [{ sanityId: info._id }, { sanityId: null }] },
          orderBy: { createdAt: 'desc' },
        })

        if (existing) {
          // Jangan update status — hanya update data konten
          const changed =
            existing.nama         !== info.namaPemilihan ||
            existing.startTime.getTime() !== start.getTime() ||
            existing.endTime.getTime()   !== end.getTime()   ||
            existing.tempatVoting !== (info.tempatVoting ?? null) ||
            existing.deskripsi    !== (info.deskripsi ?? null)    ||
            existing.sanityId     !== info._id

          if (changed) {
            await prisma.pemilihan.update({
              where: { id: existing.id },
              data: {
                sanityId:     info._id,
                nama:         info.namaPemilihan,
                startTime:    start,
                endTime:      end,
                tempatVoting: info.tempatVoting ?? null,
                deskripsi:    info.deskripsi    ?? null,
              },
            })
            electionResult.updated++
            electionResult.electionId = existing.id
          } else {
            electionResult.skipped++
            electionResult.electionId = existing.id
          }
        } else {
          // Buat election baru dari Sanity
          const created = await prisma.pemilihan.create({
            data: {
              sanityId:     info._id,
              nama:         info.namaPemilihan,
              status:       'DRAFT',
              startTime:    start,
              endTime:      end,
              tempatVoting: info.tempatVoting ?? null,
              deskripsi:    info.deskripsi    ?? null,
            },
          })
          electionResult.created++
          electionResult.electionId = created.id
        }
      } catch (e: unknown) {
        electionResult.errors.push(`Election: ${e instanceof Error ? e.message : String(e)}`)
      }
    }

    // ── 2. Sync Kandidat ─────────────────────────────────────
    const kandidatResult: SyncSectionResult = { created: 0, updated: 0, skipped: 0, errors: [] }

    const electionId = electionResult.electionId
    const sanityKandidat = await getKandidatList()
    if (!sanityKandidat || sanityKandidat.length === 0) {
      kandidatResult.errors.push('Belum ada kandidat di Sanity. Tambahkan dan Publish terlebih dahulu.')
    } else {
      for (const k of sanityKandidat) {
        if (!k._id || !k.nomorUrut || !k.namaPaslon) {
          kandidatResult.errors.push(`Lewati "${k.namaPaslon || k._id}" — nomorUrut atau namaPaslon kosong`)
          continue
        }
        try {
          const bySanityId = await prisma.kandidat.findUnique({ where: { sanityId: k._id } })

          if (bySanityId) {
            if (bySanityId.nama !== k.namaPaslon || bySanityId.noUrut !== k.nomorUrut) {
              const conflict = await prisma.kandidat.findFirst({
                where: { 
                  noUrut: k.nomorUrut, 
                  idPemilihan: electionId,
                  NOT: { sanityId: k._id } 
                },
              })
              if (conflict) {
                kandidatResult.errors.push(`"${k.namaPaslon}": nomorUrut ${k.nomorUrut} sudah dipakai "${conflict.nama}"`)
                continue
              }
              await prisma.kandidat.update({
                where: { sanityId: k._id },
                data:  { nama: k.namaPaslon, noUrut: k.nomorUrut },
              })
              kandidatResult.updated++
            } else {
              kandidatResult.skipped++
            }
          } else {
            const byNomor = await prisma.kandidat.findFirst({ 
              where: { 
                noUrut: k.nomorUrut,
                idPemilihan: electionId
              } 
            })
            if (byNomor) {
              // Data seed lama — update sanityId-nya
              await prisma.kandidat.update({
                where: { id: byNomor.id },
                data:  { sanityId: k._id, nama: k.namaPaslon, isActive: true },
              })
              kandidatResult.updated++
            } else {
              if (!electionId) {
                kandidatResult.errors.push(`"${k.namaPaslon}": tidak dapat membuat kandidat karena election belum tersinkronisasi`)
                continue
              }
              await prisma.kandidat.create({
                data: {
                  noUrut: k.nomorUrut,
                  nama: k.namaPaslon,
                  sanityId: k._id,
                  isActive: true,
                  idPemilihan: electionId,
                },
              })
              kandidatResult.created++
            }
          }
        } catch (e: unknown) {
          kandidatResult.errors.push(`"${k.namaPaslon}": ${e instanceof Error ? e.message : String(e)}`)
        }
      }
    }

    await logActivity({
      userId: payload.sub, role: payload.role, action: 'SYNC_ALL',
      entity: 'sync', ipAddress: getIP(req),
      metadata: { election: electionResult, kandidat: kandidatResult },
    })

    const totalErrors = electionResult.errors.length + kandidatResult.errors.length
    return ok({
      election:  electionResult,
      kandidat:  kandidatResult,
      timestamp: new Date().toISOString(),
      success:   totalErrors === 0,
    })
  }, ['ADMIN'])
}
