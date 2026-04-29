'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast }   from 'sonner'
import { Button }  from '@/components/ui/button'
import { Input }   from '@/components/ui/input'
import { Label }   from '@/components/ui/label'
import { Badge }   from '@/components/ui/badge'
import { Loader2, RefreshCw, CheckCircle2, AlertCircle, Plus, Pencil, ExternalLink } from 'lucide-react'
import type { ElectionInfoSanity } from '@/types'

type ElectionDB = {
  id: string
  nama: string
  startTime: string
  endTime: string
  status: 'DRAFT' | 'ACTIVE' | 'SUSPENDED' | 'ENDED'
  tempatVoting?: string | null
  deskripsi?: string | null
  sanityId?: string | null
}

const STATUS_COLOR: Record<string, string> = {
  DRAFT:     'bg-blue-100 text-blue-700 border-blue-200',
  ACTIVE:    'bg-green-100 text-green-700 border-green-200',
  SUSPENDED: 'bg-amber-100 text-amber-700 border-amber-200',
  ENDED:     'bg-gray-100 text-gray-600 border-gray-200',
}

const STATUS_ICON: Record<string, string> = {
  DRAFT: '📋', ACTIVE: '🟢', SUSPENDED: '⏸️', ENDED: '✅',
}

function formatDT(iso: string) {
  return new Date(iso).toLocaleString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

interface Props {
  initialElections: ElectionDB[]
  sanityInfo:       ElectionInfoSanity | null
}

export default function ElectionManager({ initialElections, sanityInfo }: Props) {
  const router  = useRouter()
  const [elections, setElections] = useState(initialElections)
  const [syncing,   setSyncing]   = useState(false)
  const [syncResult, setSyncResult] = useState<{ action: string; message: string } | null>(null)

  // Form buat election manual
  const [showForm, setShowForm] = useState(false)
  const [saving,   setSaving]   = useState(false)
  const [form, setForm] = useState({
    nama: '', startTime: '', endTime: '', tempatVoting: '', deskripsi: '',
  })

  // Edit election
  const [editId,   setEditId]   = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ nama: '', startTime: '', endTime: '', tempatVoting: '', deskripsi: '' })

  // ── Sync dari Sanity ──────────────────────────────────────
  const syncFromSanity = async () => {
    setSyncing(true)
    setSyncResult(null)
    const res  = await fetch('/api/admin/election/sync', { method: 'POST' })
    let json
    try {
        json = await res.json()
    } catch (e) {
        setSyncing(false)
        toast.error("Server returned an invalid JSON response.")
        return
    }
      setSyncing(false)
    if (!res.ok) { toast.error(json.error); return }
    setSyncResult({ action: json.data.action, message: json.data.message })
    toast.success(json.data.message)
    // Refresh list
    const r2 = await fetch('/api/admin/election')
    const j2 = await r2.json()
    if (j2.success) setElections(j2.data)
    router.refresh()
  }

  // ── Buat election manual ──────────────────────────────────
  const createManual = async () => {
    if (!form.nama || !form.startTime || !form.endTime) { toast.error('Nama, waktu mulai, dan waktu selesai wajib diisi'); return }
    setSaving(true)
    const res  = await fetch('/api/admin/election', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    })
    const json = await res.json()
    setSaving(false)
    if (!res.ok) { toast.error(json.error); return }
    setElections(p => [json.data, ...p])
    setForm({ nama: '', startTime: '', endTime: '', tempatVoting: '', deskripsi: '' })
    setShowForm(false)
    toast.success('Election berhasil dibuat')
  }

  // ── Edit election ─────────────────────────────────────────
  const startEdit = (el: ElectionDB) => {
    setEditId(el.id)
    setEditForm({
      nama:         el.nama,
      startTime:    el.startTime.slice(0, 16),
      endTime:      el.endTime.slice(0, 16),
      tempatVoting: el.tempatVoting ?? '',
      deskripsi:    el.deskripsi ?? '',
    })
  }

  const saveEdit = async () => {
    if (!editId) return
    setSaving(true)
    const res  = await fetch(`/api/admin/election/${editId}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...editForm, startTime: new Date(editForm.startTime).toISOString(), endTime: new Date(editForm.endTime).toISOString() }),
    })
    const json = await res.json()
    setSaving(false)
    if (!res.ok) { toast.error(json.error); return }
    setElections(p => p.map(e => e.id === editId ? json.data : e))
    setEditId(null)
    toast.success('Election diperbarui')
    router.refresh()
  }

  return (
    <div className="space-y-6">

      {/* ── Panel Sanity Info ── */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b bg-secondary/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex-center text-xl">📝</div>
            <div>
              <p className="font-semibold text-sm">Data dari Sanity CMS</p>
              <p className="text-xs text-muted-foreground">Sumber kebenaran: Info Pemilihan di Studio</p>
            </div>
          </div>
          <a href="/studio" target="_blank"
            className="flex items-center gap-1.5 text-xs text-primary hover:underline">
            <ExternalLink className="w-3 h-3" /> Buka Studio
          </a>
        </div>

        <div className="px-5 py-4">
          {sanityInfo ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2.5">
                <Row label="Nama Pemilihan" value={sanityInfo.namaPemilihan} highlight />
                <Row label="Waktu Mulai"    value={sanityInfo.startTime ? formatDT(sanityInfo.startTime) : '⚠️ Belum diisi'} warn={!sanityInfo.startTime} />
                <Row label="Waktu Selesai"  value={sanityInfo.endTime   ? formatDT(sanityInfo.endTime)   : '⚠️ Belum diisi'} warn={!sanityInfo.endTime} />
                <Row label="Tempat"         value={sanityInfo.tempatVoting ?? '—'} />
                <Row label="Deskripsi"      value={sanityInfo.deskripsi ?? '—'} />
                <Row label="Sanity ID"      value={sanityInfo._id} mono />
              </div>

              <div className="flex flex-col items-center justify-center gap-4 p-4 rounded-lg bg-secondary/40 border border-dashed">
                <div className="text-center space-y-1">
                  <p className="text-sm font-medium">Sync ke Database</p>
                  <p className="text-xs text-muted-foreground">
                    {!sanityInfo.startTime || !sanityInfo.endTime
                      ? 'Isi Waktu Mulai & Selesai di Studio dulu'
                      : 'Klik untuk membuat atau memperbarui election di database'}
                  </p>
                </div>
                <Button onClick={syncFromSanity} disabled={syncing || !sanityInfo.startTime || !sanityInfo.endTime} className="gap-2 w-full">
                  {syncing ? <><Loader2 className="w-4 h-4 animate-spin" />Sinkronisasi...</> : <><RefreshCw className="w-4 h-4" />Sinkronisasi ke Database</>}
                </Button>
                {syncResult && (
                  <div className={`w-full rounded-lg p-3 text-xs ${syncResult.action === 'created' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-blue-50 border border-blue-200 text-blue-700'}`}>
                    <div className="flex items-center gap-1.5 font-medium mb-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {syncResult.action === 'created' ? 'Election Dibuat' : 'Election Diperbarui'}
                    </div>
                    {syncResult.message}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="py-8 text-center space-y-3">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
              <p className="font-medium">Info Pemilihan belum ada di Sanity</p>
              <p className="text-sm text-muted-foreground">Buka Sanity Studio → Info Pemilihan → isi semua field → klik Publish</p>
              <a href="/studio" target="_blank"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">
                <ExternalLink className="w-4 h-4" /> Buka Sanity Studio
              </a>
            </div>
          )}
        </div>
      </div>

      {/* ── Daftar Elections di Database ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Elections di Database ({elections.length})</h2>
          <Button size="sm" variant="outline" onClick={() => setShowForm(v => !v)} className="gap-2">
            <Plus className="w-4 h-4" /> Buat Manual
          </Button>
        </div>

        {/* Form buat manual */}
        {showForm && (
          <div className="rounded-xl border bg-card p-5 space-y-4">
            <p className="font-medium text-sm">Buat Election Tanpa Sanity</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2 space-y-1">
                <Label className="text-xs">Nama Pemilihan</Label>
                <Input placeholder="Pemilihan Ketua OSIS 2025" value={form.nama}
                  onChange={e => setForm(f => ({ ...f, nama: e.target.value }))} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Waktu Mulai</Label>
                <Input type="datetime-local" value={form.startTime}
                  onChange={e => setForm(f => ({ ...f, startTime: e.target.value }))} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Waktu Selesai</Label>
                <Input type="datetime-local" value={form.endTime}
                  onChange={e => setForm(f => ({ ...f, endTime: e.target.value }))} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Tempat (opsional)</Label>
                <Input placeholder="Online via E-VOTIS" value={form.tempatVoting}
                  onChange={e => setForm(f => ({ ...f, tempatVoting: e.target.value }))} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Deskripsi (opsional)</Label>
                <Input placeholder="Deskripsi singkat pemilihan" value={form.deskripsi}
                  onChange={e => setForm(f => ({ ...f, deskripsi: e.target.value }))} />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={createManual} disabled={saving} className="gap-2">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Buat Election
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Batal</Button>
            </div>
          </div>
        )}

        {/* List elections */}
        {elections.length === 0 ? (
          <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground text-sm">
            Belum ada election. Sync dari Sanity atau buat manual.
          </div>
        ) : (
          <div className="space-y-3">
            {elections.map(el => (
              <div key={el.id} className="rounded-xl border bg-card overflow-hidden">
                {editId === el.id ? (
                  /* ── Mode Edit ── */
                  <div className="p-5 space-y-4">
                    <p className="font-medium text-sm text-primary">Edit Election</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="sm:col-span-2 space-y-1">
                        <Label className="text-xs">Nama</Label>
                        <Input value={editForm.nama} onChange={e => setEditForm(f => ({ ...f, nama: e.target.value }))} />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Waktu Mulai</Label>
                        <Input type="datetime-local" value={editForm.startTime}
                          onChange={e => setEditForm(f => ({ ...f, startTime: e.target.value }))} />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Waktu Selesai</Label>
                        <Input type="datetime-local" value={editForm.endTime}
                          onChange={e => setEditForm(f => ({ ...f, endTime: e.target.value }))} />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Tempat</Label>
                        <Input value={editForm.tempatVoting} onChange={e => setEditForm(f => ({ ...f, tempatVoting: e.target.value }))} />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Deskripsi</Label>
                        <Input value={editForm.deskripsi} onChange={e => setEditForm(f => ({ ...f, deskripsi: e.target.value }))} />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={saveEdit} disabled={saving} size="sm" className="gap-2">
                        {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3 h-3" />} Simpan
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setEditId(null)}>Batal</Button>
                    </div>
                  </div>
                ) : (
                  /* ── Mode Lihat ── */
                  <div className="flex items-start justify-between gap-4 p-5">
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-lg">{STATUS_ICON[el.status]}</span>
                        <p className="font-semibold">{el.nama}</p>
                        <span className={`text-xs px-2 py-0.5 rounded border font-medium ${STATUS_COLOR[el.status]}`}>
                          {el.status}
                        </span>
                        {el.sanityId && (
                          <span className="text-xs px-2 py-0.5 rounded border bg-purple-50 text-purple-700 border-purple-200">
                            🔗 Linked to Sanity
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-muted-foreground">
                        <span>📅 Mulai: {formatDT(el.startTime)}</span>
                        <span>🏁 Selesai: {formatDT(el.endTime)}</span>
                        {el.tempatVoting && <span>📍 {el.tempatVoting}</span>}
                        {el.deskripsi    && <span>📝 {el.deskripsi}</span>}
                        <span className="font-mono opacity-60">ID: {el.id.slice(0, 18)}…</span>
                      </div>
                    </div>
                    {el.status === 'DRAFT' || el.status === 'ACTIVE' ? (
                      <Button size="sm" variant="outline" onClick={() => startEdit(el)} className="gap-1.5 shrink-0">
                        <Pencil className="w-3.5 h-3.5" /> Edit
                      </Button>
                    ) : null}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="rounded-lg bg-secondary/40 border p-4 text-xs text-muted-foreground space-y-1.5">
        <p className="font-semibold text-foreground text-sm">ℹ️ Penjelasan Sinkronisasi</p>
        <p>① Edit nama, jadwal, tempat di <strong>Sanity Studio</strong> → Info Pemilihan → Publish</p>
        <p>② Klik <strong>Sinkronisasi ke Database</strong> — data masuk ke tabel <code className="bg-secondary px-1 rounded">elections</code></p>
        <p>③ <strong>Status pemilihan</strong> (DRAFT/ACTIVE/SUSPENDED/ENDED) hanya diubah via <strong>Emergency Stop</strong> — tidak dipengaruhi sync</p>
        <p>④ Setelah sync, election ini otomatis dipakai di Dashboard, statistik, dan kirim token</p>
        <p className="text-amber-600 font-medium">⚠️ Hanya 1 election aktif (ACTIVE) yang bisa berjalan dalam satu waktu</p>
      </div>
    </div>
  )
}

function Row({ label, value, highlight, warn, mono }: { label: string; value: string; highlight?: boolean; warn?: boolean; mono?: boolean }) {
  return (
    <div className="flex gap-2 text-sm">
      <span className="text-muted-foreground shrink-0 w-32">{label}</span>
      <span className={`font-medium truncate ${highlight ? 'text-primary' : warn ? 'text-amber-600' : 'text-foreground'} ${mono ? 'font-mono text-xs' : ''}`}>
        {value}
      </span>
    </div>
  )
}