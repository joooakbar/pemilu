'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { useTokenForm } from '@/features/voter/hooks/useTokenForm'
import { verifyToken } from '@/features/voter/services/tokenService'

import { TokenFormData } from '@/features/voter/types/token'

export default function TokenPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useTokenForm()

  const onSubmit = async ({
    token,
  }: TokenFormData) => {
    setLoading(true)

    try {
      const json = await verifyToken(token)

      sessionStorage.setItem(
        'tokenId',
        json.data.tokenId
      )

      router.push('/vote/surat-suara')

    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Terjadi kesalahan server')
      }

    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Input Token</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('token')}
          maxLength={6}
        />

        {errors.token && (
          <p>{errors.token.message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? 'Loading...'
            : 'Verifikasi'}
        </button>
      </form>
    </div>
  )
}