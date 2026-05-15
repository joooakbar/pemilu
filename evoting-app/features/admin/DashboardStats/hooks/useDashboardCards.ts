import { Users, CheckCircle } from 'lucide-react'
import { StatsCardItem } from '../types'

export interface DashboardStats {
  total?: number
  active?: number
}

export function useDashboardCards(
  stats?: DashboardStats | null
): StatsCardItem[] {
  return [
    {
      label: 'Total',
      value: stats?.total ?? 0,
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      label: 'Aktif',
      value: stats?.active ?? 0,
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
  ]
}