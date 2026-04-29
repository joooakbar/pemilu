'use client'
import { useState } from 'react'
import { Input }  from '@/components/ui/input'
import { Badge }  from '@/components/ui/badge'
import { formatDateTime } from '@/lib/utils'

interface LogRow {
  id: string; action: string; role: string; username: string;
  entity: string; ipAddress: string; metadata: unknown; createdAt: string
}

const actionColor: Record<string, string> = {
  LOGIN:            'bg-blue-100 text-blue-700',
  LOGOUT:           'bg-gray-100 text-gray-600',
  IMPORT_DPT:       'bg-amber-100 text-amber-700',
  BROADCAST_TOKENS: 'bg-purple-100 text-purple-700',
  VOTE_SUBMIT:      'bg-green-100 text-green-700',
  ELECTION_SUSPEND: 'bg-red-100 text-red-700',
  ELECTION_RESUME:  'bg-teal-100 text-teal-700',
  ELECTION_END:     'bg-gray-100 text-gray-700',
}

export default function LogTable({ data }: { data: LogRow[] }) {
  const [search, setSearch] = useState('')
  const filtered = data.filter(d =>
    d.action.toLowerCase().includes(search.toLowerCase()) ||
    d.username.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-3">
      <Input placeholder="Filter aksi atau username..." value={search} onChange={e => setSearch(e.target.value)} className="max-w-xs" />
      <div className="rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50">
            <tr>{['Waktu','Aksi','User','Role','Entity','IP'].map(h => <th key={h} className="px-4 py-3 text-left font-medium text-muted-foreground">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map(l => (
              <tr key={l.id} className="hover:bg-secondary/20">
                <td className="px-4 py-2 text-xs text-muted-foreground whitespace-nowrap">{formatDateTime(l.createdAt)}</td>
                <td className="px-4 py-2">
                  <span className={`text-xs px-2 py-0.5 rounded font-mono font-medium ${actionColor[l.action] ?? 'bg-secondary text-foreground'}`}>
                    {l.action}
                  </span>
                </td>
                <td className="px-4 py-2 font-medium">{l.username}</td>
                <td className="px-4 py-2"><Badge variant="outline" className="text-xs">{l.role}</Badge></td>
                <td className="px-4 py-2 text-xs text-muted-foreground">{l.entity}</td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground">{l.ipAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="py-10 text-center text-muted-foreground">Tidak ada log</div>}
      </div>
    </div>
  )
}