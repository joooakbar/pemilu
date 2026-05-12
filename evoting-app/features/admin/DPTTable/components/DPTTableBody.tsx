import { Badge }
from '@/components/ui/badge'

import { DPTRow }
from '../types'

interface Props {
  data: DPTRow[]
}

export default function DPTTableBody({
  data,
}: Props) {

  return (
    <tbody className="divide-y">

      {data.slice(0, 100).map((d) => (

        <tr
          key={d.id}
          className="
            hover:bg-secondary/20
          "
        >

          <td
            className="
              px-4 py-2
              font-mono
              text-xs
            "
          >
            {d.nik}
          </td>

          <td
            className="
              px-4 py-2
              font-medium
            "
          >
            {d.nama}
          </td>

          <td
            className="
              px-4 py-2
              font-mono
              text-xs
            "
          >
            {d.kodeWilayah}
          </td>

          <td
            className="
              px-4 py-2
              text-xs
              text-muted-foreground
            "
          >
            {d.phone ?? '—'}
          </td>

          <td className="px-4 py-2">

            <Badge
              variant={
                d.hasVoted
                  ? 'default'
                  : 'secondary'
              }
            >

              {d.hasVoted
                ? '✓ Sudah'
                : 'Belum'}

            </Badge>

          </td>

          <td
            className="
              px-4 py-2
              text-xs
              text-muted-foreground
            "
          >

            {d.votedAt
              ? new Date(
                  d.votedAt
                ).toLocaleString(
                  'id-ID'
                )
              : '—'}

          </td>

        </tr>

      ))}

    </tbody>
  )
}