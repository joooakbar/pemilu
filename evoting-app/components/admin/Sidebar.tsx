'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, FileSpreadsheet, Shield, AlertTriangle,
  FileText, Activity, Vote, UserCog, CalendarClock,
} from 'lucide-react'

type Role = 'ADMIN' | 'PANITIA' | 'SAKSI'

const navItems = [
  { href: '/admin/dashboard',  label: 'Dashboard',       icon: LayoutDashboard, roles: ['ADMIN','PANITIA','SAKSI'] },
  { href: '/admin/election',   label: 'Election',         icon: CalendarClock,   roles: ['ADMIN'] },
  { href: '/admin/pengguna',   label: 'Pengguna',         icon: UserCog,         roles: ['ADMIN'] },
  { href: '/admin/kandidat',   label: 'Kandidat',         icon: Vote,            roles: ['ADMIN'] },
  { href: '/admin/dpt',        label: 'DPT',              icon: FileSpreadsheet, roles: ['ADMIN','PANITIA'] },
  { href: '/admin/log',        label: 'Log Aktivitas',    icon: Activity,        roles: ['ADMIN','PANITIA'] },
  { href: '/admin/emergency',  label: 'Emergency Stop',   icon: AlertTriangle,   roles: ['ADMIN'] },
  { href: '/admin/berita-acara', label: 'Berita Acara',  icon: FileText,        roles: ['ADMIN'] },
]

const roleLabel: Record<Role, { label: string; color: string }> = {
  ADMIN:   { label: 'Administrator', color: 'bg-red-500 text-white' },
  PANITIA: { label: 'Panitia',       color: 'bg-amber-500 text-white' },
  SAKSI:   { label: 'Saksi',         color: 'bg-teal-600 text-white' },
}

export default function AdminSidebar({ role }: { role: Role }) {
  const pathname = usePathname()
  const cfg      = roleLabel[role]

  return (
    <aside className="hidden md:flex flex-col w-60 bg-card border-r shrink-0">
      <div className="h-16 flex items-center gap-3 px-5 border-b">
        <div className="w-8 h-8 bg-primary rounded-lg flex-center text-white font-bold text-sm">🗳</div>
        <span className="font-bold text-lg">E-VOTIS</span>
      </div>
      <div className="px-4 pt-3 pb-1">
        <span className={cn('inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold', cfg.color)}>
          {cfg.label}
        </span>
      </div>
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {navItems
          .filter(item => item.roles.includes(role))
          .map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link key={href} href={href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                  active
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}>
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            )
          })}
      </nav>
      <div className="p-3 border-t">
        <a href="/studio" target="_blank"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:bg-secondary transition-colors">
          <span>📝</span> Sanity Studio ↗
        </a>
      </div>
    </aside>
  )
}