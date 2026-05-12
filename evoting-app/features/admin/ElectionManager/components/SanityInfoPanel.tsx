import Row from './Row'

import SyncSection
from './SyncSection'

interface Props {
  sanityInfo: any

  syncing: boolean

  syncResult: any

  onSync: () => void
}

export default function SanityInfoPanel({
  sanityInfo,
  syncing,
  syncResult,
  onSync,
}: Props) {

  if (!sanityInfo) {

    return (
      <div
        className="
          rounded-xl
          border
          p-6
          text-center
        "
      >

        Belum ada data
        Sanity

      </div>
    )
  }

  return (
    <div
      className="
        rounded-xl
        border
        bg-card
        overflow-hidden
      "
    >

      <div
        className="
          px-5 py-4
        "
      >

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-4
          "
        >

          <div className="space-y-2.5">

            <Row
              label="
                Nama Pemilihan
              "
              value={
                sanityInfo.namaPemilihan
              }
              highlight
            />

            <Row
              label="
                Tempat
              "
              value={
                sanityInfo
                  .tempatVoting
                  ?? '—'
              }
            />

            <Row
              label="
                Deskripsi
              "
              value={
                sanityInfo
                  .deskripsi
                  ?? '—'
              }
            />

          </div>

          <SyncSection
            syncing={syncing}
            disabled={false}
            syncResult={syncResult}
            onSync={onSync}
          />

        </div>

      </div>

    </div>
  )
}