'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { schema } from '../utils/token.schema'
import type {
  TokenFormData,
} from '../types/token.types'

export const useTokenPage = () => {

  const router = useRouter()

  const [loading, setLoading] =
    useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TokenFormData>({
    resolver:
      zodResolver(schema),
  })

  const onSubmit = async ({
    token,
  }: TokenFormData) => {

    setLoading(true)

    try {

      const res = await fetch(
        '/api/voter/verify-token',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            token,
          }),
        }
      )

      const json =
        await res.json()

      if (!res.ok) {

        toast.error(
          json.error ||
            'Token salah'
        )

        return
      }

      sessionStorage.setItem(
        'tokenId',
        json.data.tokenId
      )

      router.push(
        '/vote/surat-suara'
      )

    } catch {

      toast.error(
        'Terjadi kesalahan server'
      )

    } finally {

      setLoading(false)
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    loading,
    onSubmit,
  }
}