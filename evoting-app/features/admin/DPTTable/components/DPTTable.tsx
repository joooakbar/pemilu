'use client'

import { useState }
from 'react'

import {
  DPTTableProps,
} from '../types'

import { useDPTData }
from '../hooks/useDPTData'

import { useFilteredDPT }
from '../hooks/useFilteredDPT'

import DPTSearch
from './DPTSearch'

import DPTTableHeader
from './DPTTableHeader'

import DPTTableBody
from './DPTTableBody'

import DPTEmpty
from './DPTEmpty'

import DPTLoading
from './DPTLoading'

import DPTFooter
from './DPTFooter'

export default function DPTTable({
  electionId,
}: DPTTableProps) {

  const [search, setSearch] =
    useState('')

  const {
    data,
    loading,
  } = useDPTData(search)

  const filtered =
    useFilteredDPT(
      data,
      search
    )

  if (loading) {
    return <DPTLoading />
  }

  return (
    <div className="space-y-3">

      <DPTSearch
        search={search}
        setSearch={setSearch}
      />

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

          <DPTTableHeader />

          <DPTTableBody
            data={filtered}
          />

        </table>

        {filtered.length === 0 && (
          <DPTEmpty />
        )}

      </div>

      <DPTFooter
        total={filtered.length}
      />

    </div>
  )
}