'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import type { SyncResult } from '../types/sync.types'

export function useSync() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const [result, setResult] =
    useState<SyncResult | null>(null)

  const sync = async () => {
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/admin/sync', {
        method: 'POST',
      })

      const json = await res.json()

      if (!res.ok) {
        toast.error(
          json.error ?? 'Sinkronisasi gagal'
        )
        return
      }

      setResult(json.data)

      const { election, kandidat } = json.data

      const totalErrors =
        election.errors.length +
        kandidat.errors.length

      if (totalErrors === 0) {
        toast.success(
          'Sinkronisasi berhasil'
        )

        router.refresh()
      } else {
        toast.warning(
          `Sinkronisasi selesai dengan ${totalErrors} peringatan`
        )
      }
    } catch {
      toast.error('Gagal terhubung ke server')
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    result,
    sync,
  }
}