import { Button }
from '@/components/ui/button'

import { Pencil }
from 'lucide-react'

import {
  STATUS_COLOR,
  STATUS_ICON,
} from '../constants/election.constants'

import { ElectionDB }
from '../types'

interface Props {
  election: ElectionDB
  onEdit: () => void
}

export default function ElectionCard({
  election,
  onEdit,
}: Props) {

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
          flex items-start
          justify-between
          gap-4
          p-5
        "
      >

        <div
          className="
            space-y-2
            flex-1
            min-w-0
          "
        >

          <div
            className="
              flex items-center
              gap-2
              flex-wrap
            "
          >

            <span className="text-lg">
              {
                STATUS_ICON[
                  election.status
                ]
              }
            </span>

            <p className="font-semibold">
              {election.nama}
            </p>

            <span
              className={`
                text-xs
                px-2 py-0.5
                rounded border
                font-medium

                ${
                  STATUS_COLOR[
                    election.status
                  ]
                }
              `}
            >

              {election.status}

            </span>

          </div>

        </div>

        {(election.status ===
          'DRAFT'

          ||

          election.status ===
          'ACTIVE') && (

          <Button
            size="sm"
            variant="outline"
            onClick={onEdit}
            className="
              gap-1.5
              shrink-0
            "
          >

            <Pencil
              className="
                w-3.5 h-3.5
              "
            />

            Edit

          </Button>

        )}

      </div>

    </div>
  )
}