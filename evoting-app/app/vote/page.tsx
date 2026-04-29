'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import InputNIK, { FormData } from '@/components/voter/InputNIK'
import { useVerifyNIK } from '@/hooks/useVerifyNIK'

export default function VoteNIKPage() {
  const router = useRouter()
  const { handleVerify, loading } = useVerifyNIK()

  const onSubmit = async ({ nik }: FormData) => {
    try {
      await handleVerify(nik)
      router.push('/vote/token')
    } catch (err: any) {
      toast.error(err.message)
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