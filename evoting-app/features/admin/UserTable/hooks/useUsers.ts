'use client'

import { useEffect, useState, useCallback } from 'react'
import { toast } from 'sonner'

import type {
  UserRow,
  UserFormData,
} from '../types/user.types'

export function useUsers() {
  const [users, setUsers] = useState<UserRow[]>([])
  const [loading, setLoading] = useState(true)

  const loadUsers = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/users')
      const json = await res.json()

      if (json.success) {
        setUsers(json.data)
      }
    } catch {
      toast.error('Gagal memuat pengguna')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  const createUser = async (form: UserFormData) => {
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })

    return await res.json()
  }

  return {
    users,
    setUsers,
    loading,
    createUser,
  }
}