'use client'

import {
  BeritaAcaraPreviewProps,
} from '../types'

import { usePartisipasi }
from '../hooks/usePartisipasi'

import PreviewHeader
from './PreviewHeader'

import PreviewInfo
from './PreviewInfo'

import PreviewRekapitulasi
from './PreviewRekapitulasi'

import PreviewWinner
from './PreviewWinner'

import DownloadButton
from './DownloadButton'

export default function BeritaAcaraPreview({
  election,
  totalDPT,
  totalSuara,
  rekapitulasi,
}: BeritaAcaraPreviewProps) {

  const partisipasi = usePartisipasi(
    totalDPT,
    totalSuara
  )

  const pemenang = rekapitulasi.reduce(
    (a, b) =>
      b.jumlah > a.jumlah ? b : a,
    rekapitulasi[0]
  )

  return (
    <div className="space-y-6">

      <div
        className="
          rounded-xl
          border
          bg-card
          p-8
          max-w-2xl
          space-y-6
        "
      >

        <PreviewHeader
          nama={election.nama}
        />

        <PreviewInfo
          startTime={election.startTime}
          endTime={election.endTime}
          totalDPT={totalDPT}
          totalSuara={totalSuara}
          partisipasi={partisipasi}
        />

        <PreviewRekapitulasi
          data={rekapitulasi}
        />

        {pemenang && (
          <PreviewWinner
            pemenang={pemenang}
          />
        )}

      </div>

      <DownloadButton
        electionId={election.id}
      />

    </div>
  )
}