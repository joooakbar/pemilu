import LogRow
from './LogRow'

import EmptyState
from './EmptyState'

import type {
  LogRow as LogType,
} from '../types/log.types'

interface Props {

  data: LogType[]
}

export default function LogTableContent({

  data,

}: Props) {

  return (

    <div
      className="
        rounded-lg
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
            bg-secondary/50
          "
        >

          <tr>

            {[
              'Waktu',
              'Aksi',
              'User',
              'Role',
              'Entity',
              'IP',
            ].map(h => (

              <th
                key={h}
                className="
                  px-4 py-3
                  text-left
                  font-medium
                  text-muted-foreground
                "
              >

                {h}

              </th>
            ))}

          </tr>

        </thead>

        <tbody
          className="
            divide-y
          "
        >

          {data.map(log => (

            <LogRow
              key={log.id}
              log={log}
            />

          ))}

        </tbody>

      </table>

      {data.length === 0 && (

        <EmptyState />

      )}

    </div>
  )
}