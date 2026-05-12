import { Bar }
from 'react-chartjs-2'

import {
  chartOptions,
} from '../chart/chart.options'

import type {
  RegionData,
} from '../types/region.types'

interface Props {

  data: RegionData[]
}

export default function RegionChart({

  data,

}: Props) {

  return (

    <Bar
      data={{

        labels:
          data.map(s =>
            s.kodeWilayah
          ),

        datasets: [

          {

            label:
              'Jumlah Suara',

            data:
              data.map(s =>
                s.jumlah
              ),

            backgroundColor:
              '#1d4ed8cc',

            borderRadius: 6,
          },
        ],
      }}

      options={chartOptions}
    />
  )
}