import {
  LayoutDashboard,
  FileSpreadsheet,
  AlertTriangle,
  FileText,
  Activity,
  Vote,
  UserCog,
  CalendarClock,
} from 'lucide-react'

import type { NavItem, Role } from '../types/sidebar.types'

export const navItems: NavItem[] = [
  {
    href: '/admin/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    roles: ['ADMIN', 'PANITIA', 'SAKSI'],
  },
  {
    href: '/admin/election',
    label: 'Election',
    icon: CalendarClock,
    roles: ['ADMIN'],
  },
  {
    href: '/admin/pengguna',
    label: 'Pengguna',
    icon: UserCog,
    roles: ['ADMIN'],
  },
  {
    href: '/admin/kandidat',
    label: 'Kandidat',
    icon: Vote,
    roles: ['ADMIN'],
  },
  {
    href: '/admin/dpt',
    label: 'DPT',
    icon: FileSpreadsheet,
    roles: ['ADMIN', 'PANITIA'],
  },
  {
    href: '/admin/log',
    label: 'Log Aktivitas',
    icon: Activity,
    roles: ['ADMIN', 'PANITIA'],
  },
  {
    href: '/admin/emergency',
    label: 'Emergency Stop',
    icon: AlertTriangle,
    roles: ['ADMIN'],
  },
  {
    href: '/admin/berita-acara',
    label: 'Berita Acara',
    icon: FileText,
    roles: ['ADMIN'],
  },
]

export const roleLabel: Record<
  Role,
  { label: string; color: string }
> = {
  ADMIN: {
    label: 'Administrator',
    color: 'bg-red-500 text-white',
  },

  PANITIA: {
    label: 'Panitia',
    color: 'bg-amber-500 text-white',
  },

  SAKSI: {
    label: 'Saksi',
    color: 'bg-teal-600 text-white',
  },
} 