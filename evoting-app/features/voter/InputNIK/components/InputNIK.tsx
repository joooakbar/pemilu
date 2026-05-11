'use client'

import {
  Loader2,
  IdCard,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'

import { Label } from '@/components/ui/label'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

import { useInputNIK } from '../hooks/useInputNIK'

import type {
  InputNIKProps,
} from '../types/inputnik.types'

export default function InputNIK({
  onSubmit,
  loading,
}: InputNIKProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useInputNIK()

  return (
    <Card className="shadow-xl">

      <CardHeader className="text-center pb-4">

        <div className="mx-auto w-14 h-14 bg-primary rounded-2xl flex-center text-white text-2xl mb-2">
          🗳️
        </div>

        <CardTitle>
          Verifikasi Identitas
        </CardTitle>

        <CardDescription>
          Masukkan Nomor Induk
          Kependudukan (NIK)
          Anda
        </CardDescription>

      </CardHeader>

      <CardContent>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-4"
        >

          <div className="space-y-1">

            <Label htmlFor="nik">
              Nomor NIK
              (16 digit)
            </Label>

            <div className="relative">

              <IdCard
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
              />

              <Input
                id="nik"
                placeholder="3518xxxxxxxxxxxx"
                className="pl-9 tracking-widest"
                maxLength={16}
                {...register('nik')}
              />

            </div>

            {errors.nik && (
              <p className="text-destructive text-sm">
                {errors.nik.message}
              </p>
            )}

          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >

            {loading ? (
              <>
                <Loader2
                  className="w-4 h-4 animate-spin mr-2"
                />

                Memeriksa...
              </>
            ) : (
              'Lanjutkan →'
            )}

          </Button>

        </form>

      </CardContent>

    </Card>
  )
}