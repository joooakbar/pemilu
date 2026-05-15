import { useState } from 'react'
import { toast } from 'sonner'
import { emergencyRequest } from '../services/emergency.service'

type Action = 'SUSPEND' | 'RESUME' | 'END'

export function useEmergencyAction(election: any, router: any) {
  const [loading, setLoading] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [action, setAction] = useState<Action | null>(null)

  const request = async (act: Action) => {
    try {
      setLoading(true)

      const res = await emergencyRequest(election.id, act)
      const json = await res.json()

      if (!res.ok) {
        toast.error(json.error || 'Terjadi kesalahan')
        return
      }

      toast.success(`Status election: ${json.data.status}`)

      setConfirm(false)
      router.refresh()
    } catch (err: any) {
      toast.error(err?.message || 'Request gagal')
    } finally {
      setLoading(false)
    }
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