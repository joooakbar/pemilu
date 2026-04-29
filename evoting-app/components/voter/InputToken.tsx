'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'

const schema = z.object({
  token: z.string().length(6, 'Token harus 6 karakter').transform(v => v.toUpperCase()),
})

type FormData = z.infer<typeof schema>

export default function TokenPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async ({ token }: FormData) => {
    setLoading(true)

    try {
      const res = await fetch('/api/voter/verify-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })

      const json = await res.json()

      if (!res.ok) {
        toast.error(json.error || 'Token salah')
        return
      }

      // simpan tokenId kalau perlu
      sessionStorage.setItem('tokenId', json.data.tokenId)

      router.push('/vote/surat-suara')

    } catch (err) {
      toast.error('Terjadi kesalahan server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Input Token</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('token')} maxLength={6} />
        {errors.token && <p>{errors.token.message}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Verifikasi'}
        </button>
      </form>
    </div>
  )
}