'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

import {
  RefreshCw,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Vote,
  Calendar,
} from 'lucide-react'

import type { SyncResult } from '../types/sync.types.ts'

export default function SyncButton() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const [result, setResult] =
    useState<SyncResult | null>(null)

  const [expanded, setExpanded] =
    useState(false)

  const sync = async () => {
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch(
        '/api/admin/sync',
        {
          method: 'POST',
        },
      )

      const json = await res.json()

      if (!res.ok) {
        toast.error(
          json.error ??
          'Sinkronisasi gagal',
        )
        return
      }

      setResult(json.data)

      setExpanded(true)

      const {
        election,
        kandidat,
      } = json.data

      const totalErrors =
        election.errors.length +
        kandidat.errors.length

      if (totalErrors === 0) {
        toast.success(
          'Sinkronisasi berhasil — election & kandidat sudah diperbarui',
        )

        router.refresh()
      } else {
        toast.warning(
          `Sinkronisasi selesai dengan ${totalErrors} peringatan`,
        )
      }
    } catch {
      toast.error(
        'Gagal terhubung ke server',
      )
    } finally {
      setLoading(false)
    }
  }

  const hasError =
    result &&
    (
      result.election.errors.length +
      result.kandidat.errors.length
    ) > 0

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      {/* Header */}
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
              Sync data Info Pemilihan &amp; Kandidat dari Sanity CMS ke MySQL sekaligus
            </p>
          </div>
        </div>

        <Button
          onClick={sync}
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
              Sinkronisasi Sekarang
            </>
          )}
        </Button>
      </div>

      {/* Hasil */}
      {result && (
        <div className="border-t">
          {/* Toggle */}
          <button
            onClick={() =>
              setExpanded(v => !v)
            }
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
                  result.timestamp,
                ).toLocaleTimeString('id-ID')}
              </span>
            </div>

            {expanded ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>

          {/* Detail */}
          {expanded && (
            <div className="px-5 pb-5 space-y-3">
              {/* Election */}
              <div className={`rounded-lg border p-4 space-y-2 ${
                result.election.errors.length > 0
                  ? 'border-amber-200 bg-amber-50'
                  : 'border-green-200 bg-green-50'
              }`}>
                <div className={`flex items-center gap-2 font-medium text-sm ${
                  result.election.errors.length > 0
                    ? 'text-amber-800'
                    : 'text-green-800'
                }`}>
                  <Calendar className="w-4 h-4" />
                  Info Pemilihan (Election)
                </div>

                <div className="flex flex-wrap gap-3 text-xs">
                  <span className="text-green-700">
                    +{result.election.created} dibuat
                  </span>

                  <span className="text-blue-700">
                    ↻ {result.election.updated} diperbarui
                  </span>

                  <span className="text-gray-500">
                    = {result.election.skipped} tidak berubah
                  </span>
                </div>

                {result.election.electionId && (
                  <p className="text-xs text-green-700 font-mono">
                    Election ID:
                    {' '}
                    {result.election.electionId}
                  </p>
                )}

                {result.election.errors.length > 0 && (
                  <ul className="text-xs text-amber-700 list-disc pl-4 space-y-0.5">
                    {result.election.errors.map((e, i) => (
                      <li key={i}>
                        {e}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Kandidat */}
              <div className={`rounded-lg border p-4 space-y-2 ${
                result.kandidat.errors.length > 0
                  ? 'border-amber-200 bg-amber-50'
                  : 'border-green-200 bg-green-50'
              }`}>
                <div className={`flex items-center gap-2 font-medium text-sm ${
                  result.kandidat.errors.length > 0
                    ? 'text-amber-800'
                    : 'text-green-800'
                }`}>
                  <Vote className="w-4 h-4" />
                  Kandidat
                </div>

                <div className="flex flex-wrap gap-3 text-xs">
                  <span className="text-green-700">
                    +{result.kandidat.created} dibuat
                  </span>

                  <span className="text-blue-700">
                    ↻ {result.kandidat.updated} diperbarui
                  </span>

                  <span className="text-gray-500">
                    = {result.kandidat.skipped} tidak berubah
                  </span>
                </div>

                {result.kandidat.errors.length > 0 && (
                  <ul className="text-xs text-amber-700 list-disc pl-4 space-y-0.5">
                    {result.kandidat.errors.map((e, i) => (
                      <li key={i}>
                        {e}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="border-t px-5 py-3 bg-secondary/20 text-xs text-muted-foreground space-y-1">
        <p className="font-medium text-foreground">
          Cara kerja:
        </p>

        <p>
          ① Isi data di
          {' '}
          <strong>Sanity Studio</strong>
          {' '}
          (/studio) → klik
          {' '}
          <strong>Publish</strong>
        </p>

        <p>
          ② Klik
          {' '}
          <strong>Sinkronisasi Sekarang</strong>
          {' '}
          — data langsung masuk ke MySQL
        </p>

        <p>
          ③ Status election
          {' '}
          <strong>TIDAK</strong>
          {' '}
          berubah saat sync
        </p>
      </div>
    </div>
  )
}