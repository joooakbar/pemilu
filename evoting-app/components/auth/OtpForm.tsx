'use client'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function OtpForm({ onSubmit, resend, loading }: any) {
  const form = useForm()

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Input maxLength={6} {...form.register('otp')} />

      <Button disabled={loading}>
        Verifikasi
      </Button>

      <button type="button" onClick={resend}>
        Kirim ulang
      </button>
    </form>
  )
}
