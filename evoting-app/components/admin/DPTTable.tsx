'use client'
import { useState, useEffect } from 'react'
import { Input }    from '@/components/ui/input'
import { Badge }    from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import type { DPTRow } from '@/types'

export default function DPTTable({ electionId }: { electionId?: string }) {
  const [data,    setData]   = useState<DPTRow[]>([])
  const [search,  setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const res  = await fetch('/api/admin/dpt?' + new URLSearchParams({ q: search }))
      const json = await res.json()
      if (json.success) setData(json.data)
      setLoading(false)
    }
    load()
  }, [search])

  const filtered = data.filter(d =>
    d.nama.toLowerCase().includes(search.toLowerCase()) || d.nik.includes(search)
  )

  if (loading) return <Skeleton className="h-64 w-full rounded-xl" />

  return (
    <div className="space-y-3">
      <Input placeholder="Cari NIK atau nama..." value={search} onChange={e => setSearch(e.target.value)} className="max-w-xs" />
      <div className="rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50">
            <tr>
              {['NIK', 'Nama', 'Kode Wilayah', 'Phone', 'Status', 'Waktu Pilih'].map(h => (
                <th key={h} className="px-4 py-3 text-left font-medium text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.slice(0, 100).map(d => (
              <tr key={d.id} className="hover:bg-secondary/20">
                <td className="px-4 py-2 font-mono text-xs">{d.nik}</td>
                <td className="px-4 py-2 font-medium">{d.nama}</td>
                <td className="px-4 py-2 font-mono text-xs">{d.kodeWilayah}</td>
                <td className="px-4 py-2 text-xs text-muted-foreground">{d.phone ?? '—'}</td>
                <td className="px-4 py-2">
                  <Badge variant={d.hasVoted ? 'default' : 'secondary'}>
                    {d.hasVoted ? '✓ Sudah' : 'Belum'}
                  </Badge>
                </td>
                <td className="px-4 py-2 text-xs text-muted-foreground">
                  {d.votedAt ? new Date(d.votedAt).toLocaleString('id-ID') : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">Tidak ada data</div>
        )}
      </div>
      <p className="text-xs text-muted-foreground">Menampilkan {Math.min(filtered.length, 100)} dari {filtered.length} pemilih</p>
    </div>
  )
}
