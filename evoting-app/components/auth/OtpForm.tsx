'use client'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { KeyRound, Loader2 } from 'lucide-react'
import { useState } from 'react'

type OTPForm = {
  otp: string
}

export default function VerifyPage() {
  const [loading, setLoading] = useState(false)

  // dummy email mask (nanti bisa kirim dari query / state)
  const emailMask = 'a***@gmail.com'

  const form = useForm<OTPForm>({
    defaultValues: {
      otp: ''
    }
  })

  const onSubmit = async (data: OTPForm) => {
    setLoading(true)

    try {
      // frontend only → nanti sambungkan ke backend
      console.log('OTP:', data.otp)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 px-4">
      <Card className="w-full max-w-md shadow-xl">

        <CardHeader className="text-center space-y-2 pb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-3xl">
            📧
          </div>
          <CardTitle className="text-xl font-bold">
            Verifikasi Email
          </CardTitle>
          <CardDescription>
            Kode 6 karakter telah dikirim ke<br />
            <strong className="text-foreground">{emailMask}</strong>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            {/* OTP INPUT */}
            <div className="space-y-1">
              <Label htmlFor="otp">Kode Verifikasi</Label>

              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="otp"
                  placeholder="A1B2C3"
                  className="pl-9 tracking-[0.5em] text-center text-2xl font-bold uppercase"
                  maxLength={6}
                  autoFocus
                  {...form.register('otp', {
                    required: 'Kode OTP wajib diisi',
                    minLength: {
                      value: 6,
                      message: 'OTP harus 6 karakter'
                    }
                  })}
                  onChange={(e) => {
                    const val = e.target.value
                      .toUpperCase()
                      .replace(/[^A-Z0-9]/g, '')
                    form.setValue('otp', val)
                  }}
                />
              </div>

              {form.formState.errors.otp && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.otp.message}
                </p>
              )}

              <p className="text-xs text-muted-foreground">
                Kode berlaku 10 menit. Cek folder Spam jika tidak masuk.
              </p>
            </div>

            {/* BUTTON */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Memverifikasi...
                </>
              ) : (
                '✓ Verifikasi & Masuk'
              )}
            </Button>

          </form>
        </CardContent>

      </Card>
    </div>
  )
}