'use client'
import {  Power,  Trash2,} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {  ROLE_COLOR,  ROLE_LABELS} from '../constants/user.constants'
import type { UserRow as UserRowType } from '../types'

interface Props {
  user: UserRowType
  currentUserId: string
  toggleActive: (user: UserRowType) => void
  deleteUser: (user: UserRowType) => void
}

export default function UserRow({
  user,
  currentUserId,
  toggleActive,
  deleteUser,
}: Props) {
  return (
    <tr
      className={`hover:bg-secondary/20 transition-colors ${
        !user.isActive ? 'opacity-50' : ''
      }`}
    >
      <td className="px-4 py-3 font-medium">
        {user.username}
      </td>

      <td className="px-4 py-3 text-muted-foreground text-xs">
        {user.email}
      </td>

      <td className="px-4 py-3">
        <span
          className={`text-xs px-2 py-0.5 rounded border font-medium ${ROLE_COLOR[user.role]}`}
        >
          {ROLE_LABELS[user.role]}
        </span>
      </td>

      <td className="px-4 py-3">
        <Badge
          variant={user.isActive ? 'default' : 'secondary'}
          className="text-xs"
        >
          {user.isActive
            ? '● Aktif'
            : '○ Nonaktif'}
        </Badge>
      </td>

      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
        {new Date(user.createdAt).toLocaleDateString('id-ID')}
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <button
            onClick={() => toggleActive(user)}
            className="p-1.5 rounded-md"
          >
            <Power className="w-3.5 h-3.5" />
          </button>

          {user.id !== currentUserId && (
            <button
              onClick={() => deleteUser(user)}
              className="p-1.5 rounded-md text-red-500"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </td>
    </tr>
  )
}