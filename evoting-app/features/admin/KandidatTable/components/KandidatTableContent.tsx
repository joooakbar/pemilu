import KandidatRow
from './KandidatRow'

import EmptyState
from './EmptyState'

import {
  TABLE_HEADERS,
} from '../constants/kandidat.constants'

import type {
  KandidatSanity,
} from '@/types'

import type {
  KandidatRefDB,
} from '../types/kandidat.types'

interface Props {

  sanityData:
    KandidatSanity[]

  dbList:
    KandidatRefDB[]
}

export default function KandidatTableContent({

  sanityData,

  dbList,

}: Props) {

  if (
    sanityData.length === 0
  ) {

    return <EmptyState />
  }

  return (

    <div
      className="
        rounded-xl
        border
        overflow-hidden
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

            {TABLE_HEADERS.map(
              h => (

                <th
                  key={h}
                  className="
                    px-4 py-3
                    text-left
                    text-xs
                    font-medium
                    text-muted-foreground
                    uppercase
                    tracking-wide
                  "
                >

                  {h}

                </th>
              )
            )}

          </tr>

        </thead>

        <tbody
          className="
            divide-y
          "
        >

          {sanityData.map(
            kandidat => (

              <KandidatRow
                key={
                  kandidat._id
                }
                kandidat={
                  kandidat
                }
                dbList={
                  dbList
                }
              />
            )
          )}

        </tbody>

      </table>

    </div>
  )
}