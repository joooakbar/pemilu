'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast }     from 'sonner'
import { Button }    from '@/components/ui/button'
import { AlertTriangle, Play, Square, Loader2 } from 'lucide-react'
import { cn }        from '@/lib/utils'

type Status = string
interface Election { id: string; nama: string; status: Status }

export default function EmergencyButton({ election }: { election: Election }) {
  const router  = useRouter()
  const [loading, setLoading]  = useState(false)
  const [confirm, setConfirm]  = useState(false)
  const [action,  setAction]   = useState<'SUSPEND' | 'RESUME' | 'END' | null>(null)

  const request = async (act: 'SUSPEND' | 'RESUME' | 'END') => {
    setLoading(true)
    const res  = await fetch('/api/admin/election/emergency', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ electionId: election.id, action: act }),
    })
    const json = await res.json()
    if (!res.ok) { toast.error(json.error); setLoading(false); return }
    toast.success(`Status election: ${json.data.status}`)
    router.refresh()
    setConfirm(false)
    setLoading(false)
  }

  const isSuspended = election.status === 'SUSPENDED'
  const isActive    = election.status === 'ACTIVE'
  const isEnded     = election.status === 'ENDED'

  return (
    <div className="space-y-6 max-w-lg">
      <div className="rounded-lg border p-4 space-y-2">
        <p className="text-sm font-medium">Pemilihan: <strong>{election.nama}</strong></p>
        <p className="text-sm">Status saat ini:
          <span className={cn('ml-2 font-bold uppercase', {
            'text-green-600': isActive,
            'text-red-600': isSuspended,
            'text-gray-500': isEnded,
          })}>{election.status}</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {isActive && (
          <Button variant="destructive" onClick={() => { setAction('SUSPEND'); setConfirm(true) }} className="gap-2">
            <Square className="w-4 h-4" /> Hentikan (SUSPEND)
          </Button>
        )}
        {isSuspended && (
          <Button onClick={() => { setAction('RESUME'); setConfirm(true) }} className="gap-2 bg-green-600 hover:bg-green-700">
            <Play className="w-4 h-4" /> Lanjutkan (RESUME)
          </Button>
        )}
        {(isActive || isSuspended) && (
          <Button variant="outline" onClick={() => { setAction('END'); setConfirm(true) }} className="gap-2 border-destructive text-destructive">
            <AlertTriangle className="w-4 h-4" /> Akhiri Permanen
          </Button>
        )}
      </div>

      {confirm && action && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4 space-y-3">
          <p className="font-medium text-sm">⚠ Konfirmasi tindakan: <strong>{action}</strong></p>
          <p className="text-sm text-muted-foreground">Tindakan ini akan langsung mempengaruhi proses pemilihan.</p>
          <div className="flex gap-2">
            <Button onClick={() => request(action)} disabled={loading} variant="destructive" size="sm">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Ya, Lanjutkan'}
            </Button>
            <Button onClick={() => { setConfirm(false); setAction(null) }} variant="outline" size="sm">Batal</Button>
          </div>
        </div>
      )}
    </div>
  )
}
