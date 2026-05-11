'use client'

import PartisipasiProgress from '@/components/voter/LiveStats'

import { useCountdown } from '../hooks/useCountdown'

import type {
  CountdownCardProps,
} from '../types/countdown.types'

import {
  getCountdownLabel,
} from '../utils/countdown.utils'

import {
  formatDate,
  formatTimeRange,
} from '@/features/voter/utils/dateFormat'

const CountdownCard = ({
  startTime,
  endTime,
  namaPemilihan,
  status,
  idPemilihan,
}: CountdownCardProps) => {

  const { timeLeft } =
    useCountdown(
      startTime,
      endTime,
      status
    )

  return (
    <div
      className="countdown-card reveal"
      style={{
        animationDelay: '0.15s',
      }}
    >

      <div className="cd-label">
        {getCountdownLabel(status)}
      </div>

      {status !== 'ENDED' && (

        <div className="cd-grid">

          <div className="cd-unit">

            <span className="cd-num">
              {timeLeft.h}
            </span>

            <div className="cd-unit-label">
              Jam
            </div>

          </div>

          <div className="cd-sep">
            :
          </div>

          <div className="cd-unit">

            <span className="cd-num">
              {timeLeft.m}
            </span>

            <div className="cd-unit-label">
              Menit
            </div>

          </div>

          <div className="cd-sep">
            :
          </div>

          <div className="cd-unit">

            <span className="cd-num">
              {timeLeft.s}
            </span>

            <div className="cd-unit-label">
              Detik
            </div>

          </div>

        </div>
      )}

      <div className="cd-info">

        <strong>
          {formatDate(startTime)}
        </strong>

        <br />

        {formatTimeRange(
          startTime,
          endTime
        )}{' '}
        WIB . {namaPemilihan}

      </div>

      {idPemilihan && (
        <PartisipasiProgress
          idPemilihan={idPemilihan}
        />
      )}

    </div>
  )
}

export default CountdownCard