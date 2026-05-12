'use client'

import SidebarHeader from './SidebarHeader'
import SidebarRole from './SidebarRole'
import SidebarNav from './SidebarNav'
import SidebarFooter from './SidebarFooter'

import { roleLabel } from '../constants/sidebar.constants'

import type { Role } from '../types/sidebar.types'

export default function AdminSidebar({
  role,
}: {
  role: Role
}) {

  const cfg = roleLabel[role]

  return (
    <aside className="hidden md:flex flex-col w-60 bg-card border-r shrink-0">

      <SidebarHeader />

      <SidebarRole
        label={cfg.label}
        color={cfg.color}
      />

      <SidebarNav role={role} />

      <SidebarFooter />
    </aside>
  )
}