'use client'
import { useRouter }  from 'next/navigation'
import { toast }      from 'sonner'
import { Button }     from '@/components/ui/button'
import { LogOut, User } from 'lucide-react'
import { cn } from '@/lib/utils'

type Role = 'ADMIN' | 'PANITIA' | 'SAKSI'
const roleColor: Record<Role, string> = {
  ADMIN:   'bg-destructive/10 text-destructive border-destructive/20',
  PANITIA: 'bg-amber-50 text-amber-700 border-amber-200',
  SAKSI:   'bg-teal-50 text-teal-700 border-teal-200',
}

export default function AdminTopbar({ name, role }: { name: string; role: Role }) {
  const router = useRouter()

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    toast.success('Logout berhasil')
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-6 shrink-0">
      <div />
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-primary/10 flex-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-medium">{name}</span>
          <span className={cn('text-xs px-2 py-0.5 rounded border font-medium', roleColor[role])}>
            {role}
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={logout} className="gap-1 text-muted-foreground">
          <LogOut className="w-4 h-4" /> Keluar
        </Button>
      </div>
    </header>
  )
}
