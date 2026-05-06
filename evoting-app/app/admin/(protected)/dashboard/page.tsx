import { getAuthPayload }  from '@/lib/auth'
import prisma              from '@/lib/db'
import DashboardStats      from '@/components/admin/DashboardStats'
import VoteChart           from '@/components/admin/VoteChart'
import RegionMap           from '@/components/admin/RegionMap'
import SendTokenButton     from '@/components/admin/SendTokenButton'
import SyncButton          from '@/components/admin/SyncButton'

export const metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const payload   = await getAuthPayload()
  const election  = await prisma.pemilihan.findFirst({ orderBy: { createdAt: 'desc' } })
  const isAdmin   = payload?.role === 'ADMIN'
  const isPanitia = payload?.role === 'PANITIA'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Selamat datang, <span className="font-semibold">{payload?.name}</span>
          {' '}·{' '}
          <span className={`font-medium ${
            payload?.role === 'ADMIN'   ? 'text-red-600'   :
            payload?.role === 'PANITIA' ? 'text-amber-600' : 'text-teal-600'
          }`}>{payload?.role}</span>
        </p>
      </div>

      {/* Sync Sanity → DB — hanya Admin */}
      {isAdmin && (
        <div className="space-y-2">
          <h2 className="text-base font-semibold">Sinkronisasi Konten</h2>
          <SyncButton />
        </div>
      )}

      {/* Status election */}
      {election ? (
        <>
          <div className="rounded-xl border bg-card px-5 py-3 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Pemilihan Aktif</p>
              <p className="font-semibold">{election.nama}</p>
              {election.tempatVoting && (
                <p className="text-xs text-muted-foreground mt-0.5">📍 {election.tempatVoting}</p>
              )}
            </div>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
              election.status === 'ACTIVE'    ? 'bg-green-100 text-green-700' :
              election.status === 'SUSPENDED' ? 'bg-amber-100 text-amber-700' :
              election.status === 'ENDED'     ? 'bg-gray-100 text-gray-600'   :
              'bg-blue-100 text-blue-700'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                election.status === 'ACTIVE' ? 'bg-green-500 animate-pulse' : 'bg-current opacity-60'
              }`} />
              {election.status}
            </span>
          </div>

          <DashboardStats electionId={election.id} electionStatus={election.status} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <VoteChart  electionId={election.id} />
            <RegionMap  electionId={election.id} />
          </div>

          {(isAdmin || isPanitia) && (
            <div className="space-y-2">
              <h2 className="text-base font-semibold">Distribusi Token Pemilih</h2>
              <SendTokenButton electionId={election.id} electionStatus={election.status} />
            </div>
          )}
        </>
      ) : (
        <div className="rounded-xl border border-dashed p-16 text-center space-y-3">
          <p className="text-4xl">🗳️</p>
          <p className="font-semibold">Belum ada data pemilihan</p>
          <p className="text-sm text-muted-foreground">
            Isi Info Pemilihan di Sanity Studio, klik Publish, lalu klik Sinkronisasi di atas.
          </p>
        </div>
      )}
    </div>
  )
}
