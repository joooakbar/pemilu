'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { useVoteChart } from '../hooks/useVoteChart'

import VoteChartContent from './VoteChartContent'
import VoteChartSkeleton from './VoteChartSkeleton'
import EmptyVoteChart from './EmptyVoteChart'

import type { VoteChartProps } from '../types/voteChart.types'

export default function VoteChart({
  electionId,
}: VoteChartProps) {
  const {
    stats,
    labels,
    data,
  } = useVoteChart(electionId)

  if (!stats) {
    return <VoteChartSkeleton />
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">
          Perolehan Suara
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-center h-64">
        {data.length === 0 ? (
          <EmptyVoteChart />
        ) : (
          <VoteChartContent
            labels={labels}
            data={data}
          />
        )}
      </CardContent>
    </Card>
  )
}