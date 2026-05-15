'use client'
import { Button } from '@/components/ui/button'
import {  RefreshCw,  Loader2,} from 'lucide-react'

interface Props {
  loading: boolean
  onSync: () => void
}

export default function SyncHeader({
  loading,
  onSync,
}: Props) {
  return (
    <div className="flex items-center justify-between px-5 py-4 gap-4 flex-wrap">

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex-center shrink-0">
          <RefreshCw className="w-5 h-5 text-primary" />
        </div>

        <div>
          <p className="font-semibold text-sm">
            Sinkronisasi Sanity → Database
          </p>

          <p className="text-xs text-muted-foreground">
            Sync election & kandidat
          </p>
        </div>
      </div>

      <Button
        onClick={onSync}
        disabled={loading}
        className="gap-2 shrink-0"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sinkronisasi...
          </>
        ) : (
          <>
            <RefreshCw className="w-4 h-4" />
            Sinkronisasi
          </>
        )}
      </Button>
    </div>
  )
}