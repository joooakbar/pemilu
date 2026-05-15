import KandidatRow from './KandidatRow'
import EmptyState from './EmptyState'
import type { KandidatSanity } from '@/types'
import type { KandidatDB } from '../types'

interface Props {
  sanityData: KandidatSanity[]
  dbList: KandidatDB[]
}

export default function KandidatTableContent({
  sanityData,
  dbList,
}: Props) {

  if (sanityData.length === 0) {
    return <EmptyState />
  }

  return (
    <div
      className="
        overflow-hidden
        rounded-xl
        border
      "
    >

      <table
        className="
          w-full
          text-sm
        "
      >

        <thead
          className="
            bg-secondary/60
          "
        >

          <tr>

            <th
              className="
                px-4
                py-3
                text-left
                text-xs
                font-medium
                uppercase
                tracking-wide
                text-muted-foreground
              "
            >
              Nomor
            </th>

            <th
              className="
                px-4
                py-3
                text-left
                text-xs
                font-medium
                uppercase
                tracking-wide
                text-muted-foreground
              "
            >
              Foto
            </th>

            <th
              className="
                px-4
                py-3
                text-left
                text-xs
                font-medium
                uppercase
                tracking-wide
                text-muted-foreground
              "
            >
              Nama Kandidat
            </th>

            <th
              className="
                px-4
                py-3
                text-left
                text-xs
                font-medium
                uppercase
                tracking-wide
                text-muted-foreground
              "
            >
              Sanity ID
            </th>

            <th
              className="
                px-4
                py-3
                text-left
                text-xs
                font-medium
                uppercase
                tracking-wide
                text-muted-foreground
              "
            >
              Status
            </th>

            <th
              className="
                px-4
                py-3
                text-left
                text-xs
                font-medium
                uppercase
                tracking-wide
                text-muted-foreground
              "
            >
              Aksi
            </th>

          </tr>

        </thead>

        <tbody className="divide-y">

          {sanityData.map(kandidat => (

            <KandidatRow
              key={kandidat._id}
              kandidat={kandidat}
              dbList={dbList}
            />

          ))}

        </tbody>

      </table>

    </div>
  )
}