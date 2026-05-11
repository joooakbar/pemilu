'use client'

import { useParticipation } from '../hooks/useParticipation'

import type {
  PartisipasiProgressProps,
} from '../types/participation.types'

import {
  formatNumber,
  getProgressWidth,
} from '../utils/participation.utils'

export default function PartisipasiProgress({
  idPemilihan,
}: PartisipasiProgressProps) {

  const {
    stats,
    persen,
  } = useParticipation(idPemilihan)

  if (!stats) return null

  const {
    totalDPT,
    sudahMemilih,
  } = stats

  return (
    <div className="cd-progress">

      <div className="cd-prog-la">

        <span>
          Partisipasi Pemilih
        </span>

        <strong>
          {persen}%
        </strong>

      </div>

      <div className="cd-prog-bar">

        <div
          className="cd-prog-fill"
          style={{
            width:
              getProgressWidth(
                persen
              ),
          }}
        />

      </div>

      <div className="cd-progress-text">

        <span>
          {formatNumber(
            sudahMemilih
          )}
        </span>

        {' '}dari{' '}

        {formatNumber(totalDPT)}

        {' '}pemilih telah memilih.

      </div>

    </div>
  )
}