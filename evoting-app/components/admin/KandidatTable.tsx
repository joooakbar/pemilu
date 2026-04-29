'use client'
import { useState }  from 'react'
import Image         from 'next/image'
import { toast }     from 'sonner'
import { Badge }     from '@/components/ui/badge'
import { Button }    from '@/components/ui/button'
import { Loader2, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react'
import type { KandidatSanity } from '@/types'

interface KandidatRefDB { id: string; nomorUrut: number; nama: string; sanityId: string; isActive: boolean }
interface SyncResult { message: string; created: number; updated: number; skipped: number; errors: string[]; total: number }

export default function KandidatTable({ sanityData, dbData }: { sanityData: KandidatSanity[]; dbData: KandidatRefDB[] }) {
  const [dbList,  setDbList]  = useState(dbData)
  const [syncing, setSyncing] = useState(false)
  const [result,  setResult]  = useState<SyncResult | null>(null)

  const sync = async () => {
    setSyncing(true)
    setResult(null)
    const res  = await fetch('/api/admin/kandidat/sync', { method: 'POST' })
    const json = await res.json()
    setSyncing(false)
    if (!res.ok) { toast.error(json.error); return }
    setResult(json.data)
    toast.success(json.data.message)
    // Refresh list DB
    const r2 = await fetch('/api/admin/kandidat')
    const j2 = await r2.json()
    if (j2.success) setDbList(j2.data)
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">{sanityData.length}</span> kandidat di Sanity &nbsp;·&nbsp;
          <span className="font-medium">{dbList.length}</span> terdaftar di database
        </p>
        <div className="flex gap-2">
          <Button onClick={sync} disabled={syncing} className="gap-2">
            {syncing
              ? <><Loader2 className="w-4 h-4 animate-spin" />Sinkronisasi...</>
              : <><RefreshCw className="w-4 h-4" />Sinkronisasi ke Database</>}
          </Button>
          <a href="/studio" target="_blank"
            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-secondary transition">
            Edit di Sanity Studio ↗
          </a>
        </div>
      </div>

      {/* Hasil sync */}
      {result && (
        <div className={`rounded-lg border p-4 space-y-2 ${result.errors.length > 0 ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-200'}`}>
          <div className={`flex items-center gap-2 text-sm font-semibold ${result.errors.length > 0 ? 'text-amber-700' : 'text-green-700'}`}>
            {result.errors.length > 0 ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
            {result.message}
          </div>
          {result.errors.length > 0 && (
            <ul className="text-xs text-amber-700 list-disc pl-4 space-y-0.5">
              {result.errors.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          )}
        </div>
      )}

      {/* Empty state */}
      {sanityData.length === 0 && (
        <div className="rounded-xl border border-dashed p-12 text-center space-y-3">
          <p className="text-3xl">📝</p>
          <p className="font-semibold">Belum ada kandidat di Sanity</p>
          <p className="text-sm text-muted-foreground">Tambahkan kandidat di Sanity Studio, klik Publish, lalu klik Sinkronisasi.</p>
          <a href="/studio" target="_blank"
            className="inline-block mt-2 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground">
            Buka Sanity Studio ↗
          </a>
        </div>
      )}

      {/* Tabel */}
      {sanityData.length > 0 && (
        <div className="rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60">
              <tr>
                {['No', 'Foto', 'Nama Paslon', 'Sanity ID', 'Status DB', 'Aksi'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {sanityData.map(k => {
                const db         = dbList.find(d => d.sanityId === k._id)
                const synced     = !!db
                const hasChanges = db && (db.nama !== k.namaPaslon || db.nomorUrut !== k.nomorUrut)
                return (
                  <tr key={k._id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-4 py-3 font-black text-xl text-primary">{k.nomorUrut}</td>
                    <td className="px-4 py-3">
                      {k.foto?.asset?.url
                        ? <Image src={k.foto.asset.url} alt={k.namaPaslon} width={44} height={44} className="rounded-full object-cover border-2 border-border" />
                        : <div className="w-11 h-11 rounded-full bg-secondary flex-center text-xl">👤</div>
                      }
                    </td>
                    <td className="px-4 py-3 font-semibold">{k.namaPaslon}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{k._id.slice(0, 22)}…</td>
                    <td className="px-4 py-3">
                      {!synced && <Badge variant="destructive" className="text-xs gap-1"><AlertCircle className="w-3 h-3" />Belum sync</Badge>}
                      {synced && hasChanges && <Badge className="text-xs gap-1 bg-amber-500"><AlertCircle className="w-3 h-3" />Ada perubahan</Badge>}
                      {synced && !hasChanges && <Badge className="text-xs gap-1 bg-green-600"><CheckCircle2 className="w-3 h-3" />Tersinkronisasi</Badge>}
                    </td>
                    <td className="px-4 py-3">
                      <a href="/studio" target="_blank" className="text-xs text-primary hover:underline underline-offset-2">Edit ↗</a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Panduan */}
      <div className="rounded-lg bg-secondary/40 border p-4 text-xs text-muted-foreground space-y-1.5">
        <p className="font-semibold text-foreground text-sm">ℹ️ Alur Sinkronisasi</p>
        <p>① Tambah/edit kandidat di <strong>Sanity Studio</strong> (foto, visi, misi, video)</p>
        <p>② Klik <strong>Publish</strong> di Studio — konten langsung tampil di portal voter</p>
        <p>③ Kembali ke halaman ini → klik <strong>Sinkronisasi ke Database</strong></p>
        <p>④ Data nomorUrut & nama masuk ke tabel <code className="bg-secondary px-1 rounded">kandidat_ref</code> untuk keperluan hitung suara</p>
        <p className="text-amber-600 font-medium">⚠️ Jangan hapus kandidat dari Sanity jika sudah ada suara masuk di database!</p>
      </div>
    </div>
  )
}
