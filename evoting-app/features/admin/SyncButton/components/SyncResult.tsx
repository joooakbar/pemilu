'use client'
import {  CheckCircle2,  AlertCircle,  ChevronDown,  ChevronUp,  Vote,  Calendar,} from 'lucide-react'
import SyncSection from './SyncSection'
import type { SyncResult as SyncResultType } from '../types/sync.types'

interface Props {
  result: SyncResultType
  expanded: boolean
  setExpanded: React.Dispatch<
    React.SetStateAction<boolean>
  >
}

export default function SyncResult({
  result,
  expanded,
  setExpanded,
}: Props) {

  const hasError =
    result.election.errors.length +
      result.kandidat.errors.length >
    0

  return (
    <div className="border-t">

      <button
        onClick={() => setExpanded(v => !v)}
        className="w-full flex items-center justify-between px-5 py-3 hover:bg-secondary/30 transition-colors"
      >
        <div className="flex items-center gap-2">

          {hasError ? (
            <AlertCircle className="w-4 h-4 text-amber-500" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-green-600" />
          )}

          <span className="text-sm font-medium">
            {hasError
              ? 'Selesai dengan peringatan'
              : 'Sinkronisasi berhasil'}
          </span>

          <span className="text-xs text-muted-foreground">
            {new Date(
              result.timestamp
            ).toLocaleTimeString('id-ID')}
          </span>
        </div>

        {expanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-3">

          <SyncSection
            icon={<Calendar className="w-4 h-4" />}
            title="Info Pemilihan"
            data={result.election}
            extraInfo={
              result.election.electionId
                ? `Election ID: ${result.election.electionId}`
                : undefined
            }
          />

          <SyncSection
            icon={<Vote className="w-4 h-4" />}
            title="Kandidat"
            data={result.kandidat}
          />
        </div>
      )}
    </div>
  )
}