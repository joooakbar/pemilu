export type Role = 'ADMIN' | 'PANITIA' | 'SAKSI'

export interface UserRow {
  id: string
  username: string
  email: string
  role: Role
  isActive: boolean
  createdAt: string
}

export interface UserTableProps {
  currentUserId: string
}

export interface UserFormData {
  username: string
  email: string
  password: string
  role: Role
}