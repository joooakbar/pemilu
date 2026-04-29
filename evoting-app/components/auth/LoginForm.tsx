'use client'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Lock } from 'lucide-react'

type LoginForm = {
  email: string
  password: string
}

export default function LoginPage() {
  const form = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (data: LoginForm) => {
    // FRONTEND ONLY → kirim ke backend nanti (fetch/axios)
    console.log('FORM DATA:', data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 px-4">
      <Card className="w-full max-w-md shadow-xl">

        <CardHeader className="text-center space-y-2 pb-6">
          <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white text-2xl font-black">
            🗳️
          </div>
          <CardTitle className="text-2xl font-bold">E-VOTIS</CardTitle>
          <CardDescription>
            Masuk ke Portal Admin / Panitia / Saksi
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            {/* EMAIL */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@evotis.id"
                  className="pl-9"
                  {...form.register('email', {
                    required: 'Email wajib diisi'
                  })}
                />
              </div>
              {form.formState.errors.email && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-9"
                  {...form.register('password', {
                    required: 'Password wajib diisi'
                  })}
                />
              </div>
              {form.formState.errors.password && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <Button type="submit" className="w-full">
              Login
            </Button>

          </form>
        </CardContent>

      </Card>
    </div>
  )
}