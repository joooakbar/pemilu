'use client'

import KandidatToolbar
from './components/KandidatToolbar'

import SyncResultAlert from './components/SyncResultAlert'

import {
  useKandidatSync,
}
from './hooks/useKandidatSync'

import type {

  KandidatTableProps,

} from './types/kandidat.types'

export default function KandidatTable({

  sanityData,

  dbData,

}: KandidatTableProps) {

  const {

    dbList,

    syncing,

    result,

    sync,

  } = useKandidatSync(
    dbData
  )

  return (

    <div
      className="
        space-y-4
      "
    >

      <KandidatToolbar
        syncing={syncing}
        totalSanity={
          sanityData.length
        }
        totalDB={
          dbList.length
        }
        onSync={sync}
      />

      {result && (
        <SyncResultAlert
          result={result}
        />
      )}

    </div>
  )
}