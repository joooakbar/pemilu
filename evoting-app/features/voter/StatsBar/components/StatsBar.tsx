import type {
  StatsBarProps,
} from '../types/statsbar.types'

import {
  formatNumber,
} from '../utils/statsbar.utils'

export default function StatsBar({
  totalDPT = 2847,

  voted = 1204,

  kandidat = 3,

  participation = 42,
}: StatsBarProps) {

  return (
    <section className="stats-bar">

      <div className="stat-item">

        <div className="stat-num">
          {formatNumber(totalDPT)}
        </div>

        <div className="stat-lbl">
          Total DPT
        </div>

      </div>

      <div className="stat-item">

        <div className="stat-num">

          <span>
            {formatNumber(voted)}
          </span>

        </div>

        <div className="stat-lbl">
          Sudah Memilih
        </div>

      </div>

      <div className="stat-item">

        <div className="stat-num">
          {kandidat}
        </div>

        <div className="stat-lbl">
          Paslon
        </div>

      </div>

      <div className="stat-item">

        <div className="stat-num">

          <span>
            {participation}
          </span>

          <span>%</span>

        </div>

        <div className="stat-lbl">
          Partisipasi
        </div>

      </div>

    </section>
  )
}