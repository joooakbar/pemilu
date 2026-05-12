'use client'

import { useState }
from 'react'

import LogSearch
from './LogSearch'

import LogTableContent
from './LogTableContent'

import type {
  LogRow,
} from '../types/log.types'

interface Props {

  data: LogRow[]
}

export default function LogTable({

  data,

}: Props) {

  const [

    search,

    setSearch,

  ] = useState('')

  const filtered =
    data.filter(d =>

      d.action
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

      ||

      d.username
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    )

  return (

    <div
      className="
        space-y-3
      "
    >

      <LogSearch
        search={search}
        onChange={setSearch}
      />

      <LogTableContent
        data={filtered}
      />

    </div>
  )
}