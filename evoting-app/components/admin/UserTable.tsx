'use client'
import { useState, useEffect, useCallback } from 'react'
import { toast }    from 'sonner'
import { Button }   from '@/components/ui/button'
import { Input }    from '@/components/ui/input'
import { Badge }    from '@/components/ui/badge'
import { Label }    from '@/components/ui/label'
import { Loader2, UserPlus, Trash2, Power, KeyRound, ChevronDown, ChevronUp } from 'lucide-react'

type Role = 'ADMIN' | 'PANITIA' | 'SAKSI'
interface UserRow {
  id: string; username: string; email: string
  role: Role; isActive: boolean; createdAt: string
}

const ROLE_COLOR: Record<Role, string> = {
  ADMIN:   'bg-red-100 text-red-700 border-red-200',
  PANITIA: 'bg-amber-100 text-amber-700 border-amber-200',
  SAKSI:   'bg-teal-100 text-teal-700 border-teal-200',
}

const ROLE_LABELS: Record<Role, string> = {
  ADMIN: 'Administrator', PANITIA: 'Panitia', SAKSI: 'Saksi',
}

export default function UserTable({ currentUserId }: { currentUserId: string }) {
  const [users,   setUsers]   = useState<UserRow[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving,  setSaving]  = useState(false)
  const [filterRole, setFilterRole] = useState<Role | 'ALL'>('ALL')

  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'PANITIA' as Role })

  const load = useCallback(async () => {
    const res  = await fetch('/api/admin/users')
    const json = await res.json()
    if (json.success) setUsers(json.data)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const create = async () => {
    if (!form.username || !form.email || !form.password) {
      toast.error('Semua field wajib diisi'); return
    }
    setSaving(true)
    const res  = await fetch('/api/admin/users', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    })
    const json = await res.json()
    if (!res.ok) { toast.error(json.error); setSaving(false); return }
    setUsers(p => [...p, json.data])
    setForm({ username: '', email: '', password: '', role: 'PANITIA' })
    setShowForm(false)
    toast.success(`Akun ${ROLE_LABELS[form.role]} berhasil dibuat`)
    setSaving(false)
  }

  const toggleActive = async (user: UserRow) => {
    const res  = await fetch(`/api/admin/users/${user.id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !user.isActive }),
    })
    if (!res.ok) { toast.error('Gagal update'); return }
    setUsers(p => p.map(u => u.id === user.id ? { ...u, isActive: !u.isActive } : u))
    toast.success(`Akun ${user.username} ${!user.isActive ? 'diaktifkan' : 'dinonaktifkan'}`)
  }

  const deleteUser = async (user: UserRow) => {
    if (!confirm(`Hapus akun "${user.username}" (${user.role})? Tindakan ini tidak bisa dibatalkan.`)) return
    const res = await fetch(`/api/admin/users/${user.id}`, { method: 'DELETE' })
    if (!res.ok) { toast.error('Gagal hapus'); return }
    setUsers(p => p.filter(u => u.id !== user.id))
    toast.success('Akun berhasil dihapus')
  }

  const filtered = filterRole === 'ALL' ? users : users.filter(u => u.role === filterRole)

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        {/* Filter tabs */}
        <div className="flex gap-1 bg-secondary p-1 rounded-lg">
          {(['ALL', 'ADMIN', 'PANITIA', 'SAKSI'] as const).map(r => (
            <button key={r} onClick={() => setFilterRole(r)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                filterRole === r ? 'bg-card shadow text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}>
              {r === 'ALL' ? 'Semua' : ROLE_LABELS[r]}
              <span className="ml-1 opacity-60">
                ({r === 'ALL' ? users.length : users.filter(u => u.role === r).length})
              </span>
            </button>
          ))}
        </div>

        <Button onClick={() => setShowForm(v => !v)} className="gap-2" size="sm">
          <UserPlus className="w-4 h-4" />
          {showForm ? 'Tutup Form' : 'Tambah Pengguna'}
          {showForm ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </Button>
      </div>

      {/* Form buat user */}
      {showForm && (
        <div className="rounded-xl border bg-card p-5 space-y-4">
          <h3 className="font-semibold text-sm">Buat Akun Pengguna Baru</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Username</Label>
              <Input placeholder="johndoe" value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Email</Label>
              <Input placeholder="user@evotis.id" type="email" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Password (min. 8 karakter)</Label>
              <Input placeholder="••••••••" type="password" value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Role</Label>
              <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value as Role }))}
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="ADMIN">Administrator</option>
                <option value="PANITIA">Panitia</option>
                <option value="SAKSI">Saksi</option>
              </select>
            </div>
          </div>

          {/* Info role */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            {[
              { role: 'ADMIN',   desc: 'Akses penuh: semua fitur termasuk emergency stop & berita acara' },
              { role: 'PANITIA', desc: 'Akses: dashboard, DPT, kirim token. Tidak bisa hapus kandidat atau emergency stop' },
              { role: 'SAKSI',   desc: 'Akses hanya lihat: dashboard & statistik real-time' },
            ].map(({ role, desc }) => (
              <div key={role} className={`rounded-lg border p-2.5 ${form.role === role ? 'border-primary/50 bg-primary/5' : ''}`}>
                <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold border mb-1 ${ROLE_COLOR[role as Role]}`}>{role}</span>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <Button onClick={create} disabled={saving} className="gap-2">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
            Buat Akun {ROLE_LABELS[form.role]}
          </Button>
        </div>
      )}

      {/* Tabel */}
      <div className="rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60">
            <tr>
              {['Username', 'Email', 'Role', 'Status', 'Dibuat', 'Aksi'].map(h => (
                <th key={h} className="px-4 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading
              ? [...Array(3)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(6)].map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 bg-secondary rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              : filtered.map(u => (
                <tr key={u.id} className={`hover:bg-secondary/20 transition-colors ${!u.isActive ? 'opacity-50' : ''}`}>
                  <td className="px-4 py-3 font-medium">{u.username}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded border font-medium ${ROLE_COLOR[u.role]}`}>
                      {ROLE_LABELS[u.role]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={u.isActive ? 'default' : 'secondary'} className="text-xs">
                      {u.isActive ? '● Aktif' : '○ Nonaktif'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(u.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {/* Toggle aktif */}
                      <button onClick={() => toggleActive(u)} title={u.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                        className={`p-1.5 rounded-md transition-colors ${u.isActive ? 'hover:bg-amber-100 text-amber-600' : 'hover:bg-green-100 text-green-600'}`}>
                        <Power className="w-3.5 h-3.5" />
                      </button>
                      {/* Hapus — tidak bisa hapus diri sendiri */}
                      {u.id !== currentUserId && (
                        <button onClick={() => deleteUser(u)} title="Hapus akun"
                          className="p-1.5 rounded-md hover:bg-red-100 text-red-500 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {!loading && filtered.length === 0 && (
          <div className="py-12 text-center text-muted-foreground text-sm">
            Tidak ada pengguna dengan role ini
          </div>
        )}
      </div>
      <p className="text-xs text-muted-foreground">{filtered.length} pengguna ditampilkan</p>
    </div>
  )
}
