'use client'

import { useElectionStats }
from '@/hooks/useSSE'

import {

  Card,

  CardContent,

  CardHeader,

  CardTitle,

} from '@/components/ui/card'

import EmptyState
from './EmptyState'

import RegionChart
from './RegionChart'

import '../chart/chart.config'

export default function RegionMap({

  electionId,

}: {

  electionId: string

}) {

  const {

    stats,

  } = useElectionStats(
    electionId
  )

  if (!stats)
    return null

  const sorted =

    [
      ...stats.suaraPerWilayah
    ]

    .sort(
      (a, b) =>
        b.jumlah - a.jumlah
    )

    .slice(0, 10)

  return (

    <Card>

      <CardHeader
        className="
          pb-2
        "
      >

        <CardTitle
          className="
            text-base
          "
        >

          Sebaran Suara
          per Wilayah

        </CardTitle>

        <p
          className="
            text-xs
            text-muted-foreground
          "
        >

          Berdasarkan
          6 digit pertama
          NIK
          (
            kode wilayah
          )

        </p>

      </CardHeader>

      <CardContent
        className="
          h-64
        "
      >

        {sorted.length === 0

          ? (

            <EmptyState />

          ) : (

            <RegionChart
              data={sorted}
            />

          )}

      </CardContent>

    </Card>
  )
}