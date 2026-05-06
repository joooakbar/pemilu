'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { AuthService } from '../services/auth.service'
import type { LoginInput, OtpInput } from '../schemas/auth.schema'

export function useLogin() {
  const router = useRouter()

  const [step, setStep] = useState<1 | 2>(1)
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)

  const [userId, setUserId] = useState('')
  const [emailMask, setEmailMask] = useState('')
  const [countdown, setCountdown] = useState(0)

  const startCountdown = () => {
    setCountdown(60)
    const id = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(id)
          return 0
        }
        return c - 1
      })
    }, 1000)
  }

  const login = async (data: LoginInput) => {
    setLoading(true)
    try {
      const res = await AuthService.login(data)

      setUserId(res.userId)
      setEmailMask(res.emailMask)
      setStep(2)
      startCountdown()

      toast.success('Kode dikirim')
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async (data: OtpInput) => {
    setLoading(true)
    try {
      const res = await AuthService.verifyOtp({
        userId,
        otp: data.otp,
      })

      toast.success(`Selamat datang ${res.name}`)
      router.push('/admin/dashboard')
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  const resendOtp = async () => {
    setResendLoading(true)
    try {
      await AuthService.resendOtp({ userId })

      toast.success('OTP baru dikirim')
      startCountdown()
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setResendLoading(false)
    }
  }

  return {
    step,
    setStep,
    loading,
    resendLoading,
    emailMask,
    countdown,
    login,
    verifyOtp,
    resendOtp,
  }
}