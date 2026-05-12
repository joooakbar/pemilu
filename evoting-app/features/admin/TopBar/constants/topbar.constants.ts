import type { Role } from '../types/topbar.types'

export const roleColor: Record<Role, string> = {
  ADMIN:   'bg-destructive/10 text-destructive border-destructive/20',
  PANITIA: 'bg-amber-50 text-amber-700 border-amber-200',
  SAKSI:   'bg-teal-50 text-teal-700 border-teal-200',
}