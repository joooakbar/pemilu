import { Badge }
from '@/components/ui/badge'

import {
  formatDateTime,
} from '@/lib/utils'

import {
  actionColor,
} from '../constants/log.constants'

import type {
  LogRow as LogType,
} from '../types/log.types'

interface Props {

  log: LogType
}

export default function LogRow({

  log,

}: Props) {

  return (

    <tr
      className="
        hover:bg-secondary/20
      "
    >

      {/* Waktu */}
      <td
        className="
          px-4 py-2
          text-xs
          text-muted-foreground
          whitespace-nowrap
        "
      >

        {formatDateTime(
          log.createdAt
        )}

      </td>

      {/* Action */}
      <td
        className="
          px-4 py-2
        "
      >

        <span
          className={`
            text-xs
            px-2 py-0.5
            rounded
            font-mono
            font-medium

            ${
              actionColor[
                log.action
              ]

              ??

              'bg-secondary text-foreground'
            }
          `}
        >

          {log.action}

        </span>

      </td>

      {/* Username */}
      <td
        className="
          px-4 py-2
          font-medium
        "
      >

        {log.username}

      </td>

      {/* Role */}
      <td
        className="
          px-4 py-2
        "
      >

        <Badge
          variant="outline"
          className="
            text-xs
          "
        >

          {log.role}

        </Badge>

      </td>

      {/* Entity */}
      <td
        className="
          px-4 py-2
          text-xs
          text-muted-foreground
        "
      >

        {log.entity}

      </td>

      {/* IP */}
      <td
        className="
          px-4 py-2
          font-mono
          text-xs
          text-muted-foreground
        "
      >

        {log.ipAddress}

      </td>

    </tr>
  )
}