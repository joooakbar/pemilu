'use client'

import { useLogin } from '@/features/auth/hooks/useLogin'
import LoginForm from '@/features/auth/components/LoginForm'
import OtpForm from '@/features/auth/components/OtpForm'

export default function Page() {
  const auth = useLogin()

  return auth.step === 1
    ? <LoginForm onSubmit={auth.login} loading={auth.loading} />
    : <OtpForm
        onSubmit={auth.verifyOtp}
        resend={auth.resendOtp}
        countdown={auth.countdown}
        loading={auth.loading}
        emailMask={auth.emailMask}
      />
}