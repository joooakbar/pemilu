import {
  Users,
  CheckCircle2,
  XCircle,
  TrendingUp,
} from 'lucide-react'

import { formatPersen } from '@/lib/utils'

export function createStatsCards(stats: any) {

  return [
    {
      label: 'Total DPT',
      value: stats.totalDPT,
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },

    {
      label: 'Sudah Memilih',
      value: stats.sudahMemilih,
      icon: CheckCircle2,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },

    {
      label: 'Belum Memilih',
      value: stats.belumMemilih,
      icon: XCircle,
      color: 'text-rose-500',
      bg: 'bg-rose-50',
    },

    {
      label: 'Partisipasi',
      value: formatPersen(
        stats.sudahMemilih,
        stats.totalDPT
      ),
      icon: TrendingUp,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
    },
  ]
}