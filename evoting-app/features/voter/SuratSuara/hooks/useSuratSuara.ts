'use client'

import {
  useState,
} from 'react'

import {
  useRouter,
} from 'next/navigation'

import {
  toast,
} from 'sonner'

import type {
  Kandidat,
} from '../types/suratsuara.types'

import {
  getNamaPilihan,
} from '../utils/suratsuara.utils'

export const useSuratSuara = (
  kandidat: Kandidat[],
  electionId: string
) => {

  const router = useRouter()

  const [
    pilihan,
    setPilihan,
  ] = useState<string | null>(
    null
  )

  const [
    confirm,
    setConfirm,
  ] = useState(false)

  const [
    loading,
    setLoading,
  ] = useState(false)

  const submit = async () => {

    const nik =
      sessionStorage.getItem(
        'voter_nik'
      ) ?? ''

    const tokenId =
      sessionStorage.getItem(
        'voter_tokenId'
      ) ?? ''

    if (
      !nik ||
      !tokenId ||
      !pilihan
    ) {

      toast.error(
        'Session tidak valid'
      )

      return
    }

    try {

      setLoading(true)

      const res = await fetch(
        '/api/vote/submit',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            nik,
            tokenId,
            kandidatRefId:
              pilihan,
            electionId,
          }),
        }
      )

      const json =
        await res.json()

      if (!res.ok) {

        toast.error(
          json.error
        )

        return
      }

      sessionStorage.setItem(
        'vote_reference',
        json.data.voteReference
      )

      router.push(
        '/vote/sukses'
      )

    } catch {

      toast.error(
        'Terjadi kesalahan server'
      )

    } finally {

      setLoading(false)
    }
  }

  const namaPilihan =
    getNamaPilihan(
      pilihan,
      kandidat
    )

  return {
    pilihan,
    setPilihan,

    confirm,
    setConfirm,

    loading,

    submit,

    namaPilihan,
  }
}