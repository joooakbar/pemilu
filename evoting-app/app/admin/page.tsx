'use client'

import { useState } from 'react'
import LoginForm from '@/components/auth/LoginForm'
import OtpForm from '@/components/auth/OtpForm'
import { useRouter } from 'next/navigation'

export default function Page() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState('')
  const router = useRouter()

  const handleLogin = async (data: any) => {
    setLoading(true)

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    const json = await res.json()

    if (res.ok) {
      setUserId(json.data.userId)
      setStep(2)
    }

    setLoading(false)
  }

  const handleOtp = async (data: any) => {
    setLoading(true)

    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ userId, otp: data.otp }),
    })

    if (res.ok) {
      router.push('/admin/dashboard')
    }

    setLoading(false)
  }

  return (
    <div>
      {step === 1 && (
        <LoginForm onSubmit={handleLogin} loading={loading} />
      )}

      {step === 2 && (
        <OtpForm onSubmit={handleOtp} loading={loading} />
      )}
    </div>
  )
}
