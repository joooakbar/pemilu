'use client'
import SidebarHeader from './SidebarHeader'
import SidebarRole from './SidebarRole'
import SidebarNav from './SidebarNav'
import SidebarFooter from './SidebarFooter'
import type { Role } from '../types'

interface Props {
  role: Role
}

export default function AdminSidebar({
  role,
}: Props) {

  const roleConfig = (() => {

    switch (role) {

      case 'ADMIN':
        return {
          label: 'Admin',
          color: 'bg-blue-500',
        }

      default:
        return {
          label: 'Petugas',
          color: 'bg-green-500',
        }
    }
  })()

  return (
    <aside
      className="
        hidden
        w-60
        shrink-0
        flex-col
        border-r
        bg-card
        md:flex
      "
    >

      <SidebarHeader />

      <SidebarRole
        label={roleConfig.label}
        color={roleConfig.color}
      />

      <SidebarNav role={role} />

      <SidebarFooter />

    </aside>
  )
}