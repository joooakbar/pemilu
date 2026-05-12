'use client'

import { Button } from '@/components/ui/button'
import {
  UserPlus,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

import type { Role } from '../types/user.types'
import { ROLE_LABELS } from '../constants/user.constants'

interface Props {
  usersLength: number
  filterRole: Role | 'ALL'
  setFilterRole: (role: Role | 'ALL') => void
  showForm: boolean
  setShowForm: (value: boolean) => void
  users: any[]
}

export default function UserToolbar({
  usersLength,
  filterRole,
  setFilterRole,
  showForm,
  setShowForm,
  users,
}: Props) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3">
      <div className="flex gap-1 bg-secondary p-1 rounded-lg">
        {(['ALL', 'ADMIN', 'PANITIA', 'SAKSI'] as const).map(r => (
          <button
            key={r}
            onClick={() => setFilterRole(r)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              filterRole === r
                ? 'bg-card shadow text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {r === 'ALL'
              ? 'Semua'
              : ROLE_LABELS[r]
            }

            <span className="ml-1 opacity-60">
              (
              {r === 'ALL'
                ? usersLength
                : users.filter(u => u.role === r).length}
              )
            </span>
          </button>
        ))}
      </div>

      <Button
        onClick={() => setShowForm(!showForm)}
        className="gap-2"
        size="sm"
      >
        <UserPlus className="w-4 h-4" />

        {showForm
          ? 'Tutup Form'
          : 'Tambah Pengguna'}

        {showForm
          ? <ChevronUp className="w-3 h-3" />
          : <ChevronDown className="w-3 h-3" />}
      </Button>
    </div>
  )
}