'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import InputNIK from '@/features/voter/InputNIK/components/InputNIK'
import { useVerifyNIK } from '@/hooks/useVerifyNIK'
import { FormData
  
 } from '@/features/voter/InputNIK/types/inputnik.types'
export default function VoteNIKPage() {
  const router = useRouter()
  const { handleVerify, loading } = useVerifyNIK()

  const onSubmit = async ({ nik }: FormData) => {
    try {
      await handleVerify(nik)
      router.push('/vote/token')
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message)
      } else {
        toast.error('Terjadi kesalahan')
      }
    }
  }

  return (
    <div className="min-h-screen flex-center bg-gradient-to-br from-primary/10 to-accent/10 px-4">
      <div className="w-full max-w-md">
        <InputNIK onSubmit={onSubmit} loading={loading} />
      </div>
    </div>
  )
}