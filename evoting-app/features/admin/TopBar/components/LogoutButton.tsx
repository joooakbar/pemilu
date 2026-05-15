'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LogoutButton() {
  const router = useRouter()

  const logout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    })

    toast.success('Logout berhasil')

    router.push('/admin/login')
    router.refresh()
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={logout}
      className="gap-1 text-muted-foreground"
    >
      <LogOut className="w-4 h-4" />
      Keluar
    </Button>
  )
}