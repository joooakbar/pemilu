'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import type {
  SendTokenOptionsData,
  SendTokenResultData,
} from '../types/send-token.types'

export function useSendToken(
  electionId: string,
  initialOptions: SendTokenOptionsData
) {
  const [loading, setLoading] = useState(false)

  const run = async (
    opts: SendTokenOptionsData,
    setResult: (v: SendTokenResultData | null) => void
  ) => {
    if (opts.via.length === 0) {
      toast.error('Pilih minimal 1 metode pengiriman')
      return
    }

    setLoading(true)
    setResult(null)

    try {
      if (opts.generate) {
        const r1 = await fetch('/api/admin/tokens/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            electionId,
            expiredJam: opts.expiredJam,
          }),
        })

        const j1 = await r1.json()

        if (!r1.ok) {
          toast.error(j1.error ?? 'Gagal generate token')
          return
        }

        toast.success(`${j1.data.generated} token baru digenerate`)
      }

      const r2 = await fetch('/api/admin/tokens/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          electionId,
          via: opts.via,
          expiredJam: opts.expiredJam,
        }),
      })

      const j2 = await r2.json()

      if (!r2.ok) {
        toast.error(j2.error ?? 'Gagal kirim token')
        return
      }

      setResult(j2.data)

      toast.success(
        `Token berhasil dikirim ke ${
          j2.data.waSent + j2.data.emailSent
        } pemilih`
      )
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    run,
  }
}