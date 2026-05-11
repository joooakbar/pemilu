'use client'

import {
  useEffect,
  useState,
} from 'react'

import type {
  StatusPemilihan,
  TimeLeft,
} from '../types/countdown.types'

export const useCountdown = (
  startTime: string,
  endTime: string,
  status: StatusPemilihan
) => {

  const [timeLeft, setTimeLeft] =
    useState<TimeLeft>({
      h: '00',
      m: '00',
      s: '00',
    })

  useEffect(() => {

    const targetTime =
      status === 'DRAFT'
        ? new Date(startTime).getTime()
        : new Date(endTime).getTime()

    const interval =
      setInterval(() => {

        const now = Date.now()

        const distance =
          targetTime - now

        if (distance <= 0) {

          setTimeLeft({
            h: '00',
            m: '00',
            s: '00',
          })

          clearInterval(interval)

          return
        }

        const h = Math.floor(
          (distance %
            (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        )

        const m = Math.floor(
          (distance %
            (1000 * 60 * 60)) /
            (1000 * 60)
        )

        const s = Math.floor(
          (distance %
            (1000 * 60)) /
            1000
        )

        setTimeLeft({
          h: String(h).padStart(
            2,
            '0'
          ),

          m: String(m).padStart(
            2,
            '0'
          ),

          s: String(s).padStart(
            2,
            '0'
          ),
        })

      }, 1000)

    return () =>
      clearInterval(interval)

  }, [
    startTime,
    endTime,
    status,
  ])

  return {
    timeLeft,
  }
}