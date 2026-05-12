'use client'

import { useElectionStats }
from '@/hooks/useSSE'

import {
  DashboardStatsProps,
} from '../types'

import { useDashboardCards }
from '../hooks/useDashboardCards'

import StatsGrid
from './StatsGrid'

import StatsFooter
from './StatsFooter'

import StatsSkeleton
from './StatsSkeleton'

export default function DashboardStats({
  electionId,
  electionStatus,
}: DashboardStatsProps) {

  const { stats } =
    useElectionStats(electionId)

  const cards =
    useDashboardCards(stats)

  if (!cards) {
    return <StatsSkeleton />
  }

  return (
    <div className="space-y-4">

      <StatsGrid
        cards={cards}
      />

      <StatsFooter
        electionStatus={
          electionStatus
        }
      />

    </div>
  )
}