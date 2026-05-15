import type { KandidatSanity } from '@/types'

export interface KandidatDB {
  id: string
  nomorUrut: number
  nama: string
  sanityId: string
  isActive: boolean
}

export interface SyncResult {
  message: string
  created: number
  updated: number
  skipped: number
  total: number
  errors: string[]
}

export interface KandidatTableProps {
  sanityData: KandidatSanity[]
  dbData: KandidatDB[]
}