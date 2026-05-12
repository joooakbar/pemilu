'use client'

import { User } from 'lucide-react'
import { cn } from '@/lib/utils'

import { roleColor } from '../constants/topbar.constants'
import type { UserInfoProps } from '../types/topbar.types'

export default function UserInfo({
  name,
  role,
}: UserInfoProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-full bg-primary/10 flex-center">
        <User className="w-4 h-4 text-primary" />
      </div>

      <span className="text-sm font-medium">
        {name}
      </span>

      <span
        className={cn(
          'text-xs px-2 py-0.5 rounded border font-medium',
          roleColor[role]
        )}
      >
        {role}
      </span>
    </div>
  )
}