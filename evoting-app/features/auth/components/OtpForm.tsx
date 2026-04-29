type Props = {
  onSubmit: (otp: string) => void
  onResend: () => void
  countdown: number
  loading: boolean
  resendLoading: boolean
  emailMask: string
  onBack: () => void
}

export default function OtpForm(props: Props) {
  // hanya UI
}