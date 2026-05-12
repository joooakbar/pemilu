'use client'

import UserInfo from './UserInfo'
import LogoutButton from './LogoutButton'

import type { TopBarProps } from '../types/topbar.types'

export default function TopBar({
  name,
  role,
}: TopBarProps) {
  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-6 shrink-0">
      <div />

      <div className="flex items-center gap-3">
        <UserInfo
          name={name}
          role={role}
        />

        <LogoutButton />
      </div>
    </header>
  )
}