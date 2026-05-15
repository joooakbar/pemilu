'use client'

import { useState } from 'react'

import LogSearch from './LogSearch'
import LogRow from './LogRow'

import type { LogRow as LogType } from '../types'

interface Props {
  data: LogType[]
}

export default function LogTable({
  data,
}: Props) {

  const [search, setSearch] =
    useState('')

  const keyword =
    search.toLowerCase()

  const filtered = data.filter(log =>
    log.action
      .toLowerCase()
      .includes(keyword)

    ||

    log.username
      .toLowerCase()
      .includes(keyword)
  )

  return (
    <div className="space-y-3">

      <LogSearch
        search={search}
        onChange={setSearch}
      />

      <div
        className="
          overflow-hidden
          rounded-lg
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
              bg-secondary/50
            "
          >

            <tr>

              <th
                className="
                  px-4
                  py-3
                  text-left
                  font-medium
                  text-muted-foreground
                "
              >
                Waktu
              </th>

              <th
                className="
                  px-4
                  py-3
                  text-left
                  font-medium
                  text-muted-foreground
                "
              >
                Aksi
              </th>

              <th
                className="
                  px-4
                  py-3
                  text-left
                  font-medium
                  text-muted-foreground
                "
              >
                User
              </th>

              <th
                className="
                  px-4
                  py-3
                  text-left
                  font-medium
                  text-muted-foreground
                "
              >
                Role
              </th>

              <th
                className="
                  px-4
                  py-3
                  text-left
                  font-medium
                  text-muted-foreground
                "
              >
                Entity
              </th>

              <th
                className="
                  px-4
                  py-3
                  text-left
                  font-medium
                  text-muted-foreground
                "
              >
                IP
              </th>

            </tr>

          </thead>

          <tbody className="divide-y">

            {filtered.map(log => (

              <LogRow
                key={log.id}
                log={log}
              />

            ))}

          </tbody>

        </table>

        {filtered.length === 0 && (

          <div
            className="
              py-10
              text-center
              text-muted-foreground
            "
          >
            Tidak ada log
          </div>

        )}

      </div>

    </div>
  )
}