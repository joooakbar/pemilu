import { useState }
from 'react'

import { toast }
from 'sonner'

import {
  emergencyRequest,
} from '../services/emergency.service'

export function useEmergencyAction(
  election: any,
  router: any,
) {

  const [loading, setLoading] =
    useState(false)

  const [confirm, setConfirm] =
    useState(false)

  const [action, setAction] =
    useState<
      'SUSPEND'
      | 'RESUME'
      | 'END'
      | null
    >(null)

  const request =
    async (
      act:
        | 'SUSPEND'
        | 'RESUME'
        | 'END'
    ) => {

      setLoading(true)

      const res =
        await emergencyRequest(
          election.id,
          act
        )

      const json =
        await res.json()

      if (!res.ok) {

        toast.error(json.error)

        setLoading(false)

        return
      }

      toast.success(
        `Status election:
        ${json.data.status}`
      )

      router.refresh()

      setConfirm(false)

      setLoading(false)
    }

  return {
    loading,
    confirm,
    action,

    setConfirm,
    setAction,

    request,
  }
}