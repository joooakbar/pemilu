'use client'

import { useState } from 'react'

import type {
  DPTResult,
  StatusType,
} from '../types/cekdpt.types'

export const useCekDPT = (
  idPemilihan: string
) => {

  const [nik, setNik] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [status, setStatus] =
    useState<StatusType>('idle')

  const [result, setResult] =
    useState<DPTResult | null>(null)

  const handleNIKChange = (
    value: string
  ) => {

    // hanya angka
    const cleanValue =
      value.replace(/\D/g, '')

    setNik(cleanValue)
  }

  const handleCekDPT = async () => {

    // validasi kosong
    if (!nik) {
      setStatus('empty')
      return
    }

    // validasi panjang NIK
    if (nik.length !== 16) {
      setStatus('invalid')
      return
    }

    try {

      setLoading(true)

      setStatus('idle')

      const res = await fetch(
        `/api/dpt/check`,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            nik,
            idPemilihan,
          }),
        }
      )

      const json = await res.json()

      if (!res.ok) {
        setStatus('not-found')
        return
      }

      setResult(json.data)

      setStatus('found')

    } catch (error) {

      console.error(error)

      setStatus('not-found')

    } finally {

      setLoading(false)
    }
  }

  return {
    nik,
    loading,
    status,
    result,
    handleNIKChange,
    handleCekDPT,
  }
}