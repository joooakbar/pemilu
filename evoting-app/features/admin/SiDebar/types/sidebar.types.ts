import type { LucideIcon } from 'lucide-react'

export type Role = 'ADMIN' | 'PANITIA' | 'SAKSI'

export interface NavItem {
  href: string
  label: string
  icon: LucideIcon
  roles: Role[]
}