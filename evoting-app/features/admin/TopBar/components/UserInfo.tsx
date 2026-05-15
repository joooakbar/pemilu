'use client'

import { User } from 'lucide-react'

import { cn } from '@/lib/utils'

import type { UserInfoProps } from '../types'

export default function UserInfo({
  name,
  role,
}: UserInfoProps) {

  const roleColor = (() => {

    switch (role) {

      case 'ADMIN':
        return `
          border-blue-200
          bg-blue-100
          text-blue-700
        `

      case 'PANITIA':
        return `
          border-amber-200
          bg-amber-100
          text-amber-700
        `

      default:
        return `
          border-green-200
          bg-green-100
          text-green-700
        `
    }
  })()

  return (
    <div
      className="
        flex
        items-center
        gap-2
      "
    >

      <div
        className="
          flex-center
          h-7
          w-7
          rounded-full
          bg-primary/10
        "
      >

        <User
          className="
            h-4
            w-4
            text-primary
          "
        />

      </div>

      <span
        className="
          text-sm
          font-medium
        "
      >
        {name}
      </span>

      <span
        className={cn(
          `
            rounded
            border
            px-2
            py-0.5
            text-xs
            font-medium
          `,
          roleColor
        )}
      >
        {role}
      </span>

    </div>
  )
}