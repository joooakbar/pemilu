import { getAuthPayload } from '@/lib/auth'
import { redirect } from 'next/navigation'
import prisma from '@/lib/db'
import BeritaAcaraPreview from '@/components/admin/BeritaAcaraPreview'

export const metadata = { title: 'Berita Acara' }

export default async function BeritaAcaraPage() {
  const payload = await getAuthPayload()
  if (payload?.role !== 'ADMIN') redirect('/admin/dashboard')

  const election = await prisma.pemilihan.findFirst({ where: { status: { in: ['ACTIVE', 'ENDED'] } }, orderBy: { createdAt: 'desc' } })
  if (!election) return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Berita Acara</h1>
      <p className="text-muted-foreground">Belum ada pemilihan yang aktif atau selesai.</p>
    </div>
  )

  const [totalDPT, votes, kandidatRefs] = await Promise.all([
    prisma.dPT.count(),
    prisma.votes.groupBy({ by: ['kandidatRefId'], where: { Id: election.id }, _count: {} }),
    prisma.kandidatRef.findMany({ where: { isActive: true }, orderBy: { nomorUrut: 'asc' } }),
  ])

  const rekapitulasi = votes.map(v => ({
    nomor:  kandidatRefs.find(k => k.id === v.kandidatRefId)?.nomorUrut ?? 0,
    nama:   kandidatRefs.find(k => k.id === v.kandidatRefId)?.nama ?? v.kandidatRefId,
    jumlah: v._count,
  })).sort((a, b) => a.nomor - b.nomor)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Berita Acara</h1>
        <p className="text-sm text-muted-foreground mt-1">Rekapitulasi hasil pemilihan</p>
      </div>
      <BeritaAcaraPreview
        election={{ id: election.id, nama: election.nama, status: election.status,
          startTime: election.startTime.toISOString(), endTime: election.endTime.toISOString() }}
        totalDPT={totalDPT}
        totalSuara={votes.reduce((s, v) => s + v._count, 0)}
        rekapitulasi={rekapitulasi}
      />
    </div>
  )
}
