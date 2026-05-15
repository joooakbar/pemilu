'use client'
import { useRouter } from 'next/navigation'
import { EmergencyButtonProps } from '../types'
import { useEmergencyAction } from '../hooks/useEmergencyAction'
import EmergencyStatusCard from './EmergencyStatusCard'
import EmergencyActions from './EmergencyActions'
import EmergencyConfirm from './EmergencyConfirm'

export default function EmergencyButton({ election }: EmergencyButtonProps) {
  const router = useRouter()

  const {
    loading,
    confirm,
    action,
    setConfirm,
    setAction,
    request,
  } = useEmergencyAction(election, router)

  const isSuspended = election.status === 'SUSPENDED'
  const isActive = election.status === 'ACTIVE'

  const handleAction = (type: 'SUSPEND' | 'RESUME' | 'END') => {
    setAction(type)
    setConfirm(true)
  }

  const handleCancel = () => {
    setConfirm(false)
    setAction(null)
  }

  return (
    <div className="space-y-6 max-w-lg">
      <EmergencyStatusCard election={election} />

      <EmergencyActions
        isActive={isActive}
        isSuspended={isSuspended}
        onSuspend={() => handleAction('SUSPEND')}
        onResume={() => handleAction('RESUME')}
        onEnd={() => handleAction('END')}
      />

      {confirm && action && (
        <EmergencyConfirm
          action={action}
          loading={loading}
          onConfirm={() => request(action)}
          onCancel={handleCancel}
        />
      )}
    </div>
  )
}