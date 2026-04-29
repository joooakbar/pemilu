import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import * as authService from '../services/auth.service'

export const useLogin = () => {
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
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(id)
          return 0
        }
        return c - 1
      })
    }, 1000)
  }

  const handleLogin = async (data: any) => {
    setLoading(true)
    try {
      const res = await authService.login(data)
      setUserId(res.userId)
      setEmailMask(res.emailMask)
      setStep(2)
      startCountdown()
      toast.success('Kode dikirim')
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (otp: string) => {
    setLoading(true)
    try {
      const res = await authService.verifyOtp({ userId, otp })
      toast.success(`Selamat datang, ${res.name}`)
      router.push('/admin/dashboard')
      router.refresh()
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setResendLoading(true)
    try {
      await authService.resendOtp(userId)
      toast.success('OTP dikirim ulang')
      startCountdown()
    } catch (err: any) {
      toast.error(err.message)
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
    handleLogin,
    handleVerify,
    handleResend,
  }
}