import { Button } from '@/components/ui/button'
import { Square, Play, AlertTriangle } from 'lucide-react'

interface Props {
  isActive: boolean
  isSuspended: boolean
  onSuspend: () => void
  onResume: () => void
  onEnd: () => void
}

export default function EmergencyActions({
  isActive,
  isSuspended,
  onSuspend,
  onResume,
  onEnd,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {isActive && (
        <Button variant="destructive" onClick={onSuspend} className="gap-2">
          <Square className="w-4 h-4" />
          Hentikan
        </Button>
      )}

      {isSuspended && (
        <Button onClick={onResume} className="gap-2 bg-green-600 hover:bg-green-700">
          <Play className="w-4 h-4" />
          Lanjutkan
        </Button>
      )}

      {(isActive || isSuspended) && (
        <Button
          variant="outline"
          onClick={onEnd}
          className="gap-2 border-destructive text-destructive"
        >
          <AlertTriangle className="w-4 h-4" />
          Akhiri
        </Button>
      )}
    </div>
  )
}