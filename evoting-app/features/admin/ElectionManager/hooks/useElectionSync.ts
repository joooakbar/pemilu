import { useState }
from 'react'

import { toast }
from 'sonner'

import {
  syncElection,
} from '../services/election.service'

export function useElectionSync(
  setElections: any,
  router: any,
) {

  const [syncing, setSyncing] =
    useState(false)

  const [syncResult, setSyncResult] =
    useState<{
      action: string
      message: string
    } | null>(null)

  const syncFromSanity =
    async () => {

      setSyncing(true)

      setSyncResult(null)

      const res =
        await syncElection()

      let json

      try {

        json = await res.json()

      } catch {

        setSyncing(false)

        toast.error(
          'Invalid JSON response'
        )

        return
      }

      setSyncing(false)

      if (!res.ok) {

        toast.error(json.error)

        return
      }

      setSyncResult({
        action:
          json.data.action,

        message:
          json.data.message,
      })

      toast.success(
        json.data.message
      )

      const r2 = await fetch(
        '/api/admin/election'
      )

      const j2 = await r2.json()

      if (j2.success) {
        setElections(j2.data)
      }

      router.refresh()
    }

  return {
    syncing,
    syncResult,
    syncFromSanity,
  }
}