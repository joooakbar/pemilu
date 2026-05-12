import { createStatsCards }
from '../constants/statsConfig'

export function useDashboardCards(
  stats: any
) {

  if (!stats) return null

  return createStatsCards(stats)
}