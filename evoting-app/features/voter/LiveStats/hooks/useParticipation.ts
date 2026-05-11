'use client'

import {
  useEffect,
  useState,
} from 'react'

import type {
  ParticipationStats,
} from '../types/participation.types'

export const useParticipation = (
  idPemilihan: string
) => {

  const [stats, setStats] =
    useState<ParticipationStats | null>(
      null
    )

  const [persen, setPersen] =
    useState(0)

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const res = await fetch(
          `/api/pemilihan/${idPemilihan}/participation`
        )

        const json =
          await res.json()

        if (!res.ok) return

        const data =
          json.data

        setStats(data)

        const hasilPersen =
          data.totalDPT > 0
            ? Math.round(
                (data.sudahMemilih /
                  data.totalDPT) *
                  100
              )
            : 0

        setPersen(hasilPersen)

      } catch (error) {

        console.error(error)
      }
    }

    fetchStats()

  }, [idPemilihan])

  return {
    stats,
    persen,
  }
}