'use client'
import { useState } from 'react'
import { ElectionManagerProps } from '../types'
import { useElectionForm } from '../hooks/useElectionForm'
import { useElectionEdit } from '../hooks/useElectionEdit'
import ElectionList from './ElectionList'

export default function ElectionManager({
  initialElections,
  sanityInfo,
}: ElectionManagerProps) {

  const [elections] =
    useState(initialElections)

  const { showForm } =
    useElectionForm()

  const { editId } =
    useElectionEdit()

  return (
    <div className="space-y-6">

      {/* nanti: SanityInfoPanel */}

      {elections.length === 0 ? (

        <div className="py-12 text-center text-muted-foreground">
          Tidak ada election
        </div>

      ) : (

        <ElectionList
          elections={elections}
          onEdit={(election) =>
            console.log(election)
          }
        />

      )}

      <div
        className="
          space-y-1.5 rounded-lg border
          bg-secondary/40 p-4
          text-xs text-muted-foreground
        "
      >

        <p className="text-sm font-semibold text-foreground">
          ℹ️ Penjelasan Sinkronisasi
        </p>

        <p>
          ① Edit nama, jadwal, tempat di
          <strong>{' '}Sanity Studio</strong>
        </p>

        <p>
          ② Klik
          <strong>{' '}Sinkronisasi</strong>
        </p>

        <p>
          ③ Status election hanya diubah via
          Emergency Stop
        </p>

        <p>
          ④ Setelah sync, election otomatis
          dipakai dashboard
        </p>

      </div>

    </div>
  )
}