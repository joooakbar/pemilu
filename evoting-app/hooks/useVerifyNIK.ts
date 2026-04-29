'use client'

import { useState } from 'react'
import { verifyNIK } from '@/lib/services/voter'

export function useVerifyNIK() {
  const [loading, setLoading] = useState(false)

  const handleVerify = async (nik: string) => {
    setLoading(true)

    try {
      const electionId = sessionStorage.getItem('electionId') ?? ''

      const data = await verifyNIK({ nik, electionId })

      // simpan ke session
      sessionStorage.setItem('voter_nik', nik)
      sessionStorage.setItem('voter_nama', data.nama)
      sessionStorage.setItem('voter_dptId', data.dptId)
      sessionStorage.setItem('electionId', data.electionId)

      return data

    } finally {
      setLoading(false)
    }
  }

  return {
    handleVerify,
    loading,
  }
}