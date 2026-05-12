import Image
from 'next/image'

import {
  Badge,
} from '@/components/ui/badge'

import {

  CheckCircle2,

  AlertCircle,

} from 'lucide-react'

import type {
  KandidatSanity,
} from '@/types'

import type {
  KandidatRefDB,
} from '../types/kandidat.types'

import {
  getKandidatStatus,
} from '../utils/kandidat.utils'

interface Props {

  kandidat:
    KandidatSanity

  dbList:
    KandidatRefDB[]
}

export default function KandidatRow({

  kandidat,

  dbList,

}: Props) {

  const {

    synced,

    hasChanges,

  } = getKandidatStatus(
    kandidat,
    dbList
  )

  return (

    <tr
      className="
        hover:bg-secondary/20
        transition-colors
      "
    >

      <td
        className="
          px-4 py-3
          font-black
          text-xl
          text-primary
        "
      >

        {kandidat.nomorUrut}

      </td>

      <td
        className="
          px-4 py-3
        "
      >

        {kandidat.foto
          ?.asset?.url ? (

          <Image
            src={
              kandidat
              .foto
              .asset
              .url
            }
            alt={
              kandidat
              .namaPaslon
            }
            width={44}
            height={44}
            className="
              rounded-full
              object-cover
              border-2
              border-border
            "
          />

        ) : (

          <div
            className="
              w-11 h-11
              rounded-full
              bg-secondary
              flex items-center
              justify-center
              text-xl
            "
          >

            👤

          </div>
        )}

      </td>

      <td
        className="
          px-4 py-3
          font-semibold
        "
      >

        {kandidat.namaPaslon}

      </td>

      <td
        className="
          px-4 py-3
          font-mono
          text-xs
          text-muted-foreground
        "
      >

        {kandidat._id.slice(
          0,
          22
        )}…

      </td>

      <td
        className="
          px-4 py-3
        "
      >

        {!synced && (

          <Badge
            variant="destructive"
            className="
              text-xs gap-1
            "
          >

            <AlertCircle
              className="
                w-3 h-3
              "
            />

            Belum sync

          </Badge>
        )}

        {synced &&
          hasChanges && (

          <Badge
            className="
              text-xs gap-1
              bg-amber-500
            "
          >

            <AlertCircle
              className="
                w-3 h-3
              "
            />

            Ada perubahan

          </Badge>
        )}

        {synced &&
          !hasChanges && (

          <Badge
            className="
              text-xs gap-1
              bg-green-600
            "
          >

            <CheckCircle2
              className="
                w-3 h-3
              "
            />

            Tersinkronisasi

          </Badge>
        )}

      </td>

      <td
        className="
          px-4 py-3
        "
      >

        <a
          href="/studio"
          target="_blank"
          className="
            text-xs
            text-primary
            hover:underline
            underline-offset-2
          "
        >

          Edit ↗

        </a>

      </td>

    </tr>
  )
}