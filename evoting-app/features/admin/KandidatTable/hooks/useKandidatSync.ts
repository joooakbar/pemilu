'use client'

import { useState }
from 'react'

import { toast }
from 'sonner'

import {
  syncKandidat,
  fetchKandidatDB,
}
from '../services/kandidat.service'

import type {

  KandidatRefDB,

  SyncResult,

} from '../types/kandidat.types'

export function useKandidatSync(

  initialDB:
    KandidatRefDB[]

) {

  const [
    dbList,

    setDbList,

  ] = useState(initialDB)

  const [
    syncing,

    setSyncing,

  ] = useState(false)

  const [
    result,

    setResult,

  ] = useState<
    SyncResult | null
  >(null)

  const sync = async () => {

    setSyncing(true)

    setResult(null)

    const res =
      await syncKandidat()

    const json =
      await res.json()

    setSyncing(false)

    if (!res.ok) {

      toast.error(
        json.error
      )

      return
    }

    setResult(json.data)

    toast.success(
      json.data.message
    )

    const r2 =
      await fetchKandidatDB()

    const j2 =
      await r2.json()

    if (j2.success) {

      setDbList(j2.data)
    }
  }

  return {

    dbList,

    syncing,

    result,

    sync,
  }
}