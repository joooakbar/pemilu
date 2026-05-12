'use client'

import { usePathname } from 'next/navigation'

import SidebarNavItem from './SidebarNavItem'

import { navItems } from '../constants/sidebar.constants'
import { isActivePath } from '../utils/sidebar.utils'

import type { Role } from '../types/sidebar.types'

export default function SidebarNav({
  role,
}: {
  role: Role
}) {

  const pathname = usePathname()

  return (
    <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">

      {navItems
        .filter(item => item.roles.includes(role))
        .map(item => (
          <SidebarNavItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={isActivePath(pathname, item.href)}
          />
        ))}
    </nav>
  )
}