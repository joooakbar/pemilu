'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type FormData = z.infer<typeof schema>

export default function LoginForm({ onSubmit, loading }: any) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Input placeholder="Email" {...form.register('email')} />
      <Input type="password" placeholder="Password" {...form.register('password')} />

      <Button disabled={loading}>
        {loading ? 'Loading...' : 'Login'}
      </Button>
    </form>
  )
}
