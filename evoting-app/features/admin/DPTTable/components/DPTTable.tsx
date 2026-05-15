'use client'
import { useState } from 'react'
import { DPTTableProps } from '../types'
import { useDPTData } from '../hooks/useDPTData'
import { useFilteredDPT } from '../hooks/useFilteredDPT'
import DPTSearch from './DPTSearch'
import DPTTableBody from './DPTTableBody'
import DPTLoading from './DPTLoading'

const headers = [
  'NIK',
  'Nama',
  'Kode Wilayah',
  'Phone',
  'Status',
  'Waktu Pilih',
]

export default function DPTTable({
  electionId,
}: DPTTableProps) {

  const [search, setSearch] =
    useState('')

  const { data, loading } =
    useDPTData(search)

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

      <div className="overflow-hidden rounded-lg border">

        <table className="w-full text-sm">

          <thead className="bg-secondary/50">
            <tr>

              {headers.map((header) => (
                <th
                  key={header}
                  className="
                    px-4 py-3 text-left
                    font-medium text-muted-foreground
                  "
                >
                  {header}
                </th>
              ))}

            </tr>
          </thead>

          <DPTTableBody
            data={filtered}
          />

        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            Tidak ada data
          </div>
        )}

      </div>

      <p className="text-xs text-muted-foreground">
        Menampilkan {Math.min(filtered.length, 100)}
        {' '}dari {filtered.length} pemilih
      </p>

    </div>
  )
}