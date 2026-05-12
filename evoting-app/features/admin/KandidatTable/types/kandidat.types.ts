import type {
  KandidatSanity,
} from '@/types'

export interface KandidatRefDB {

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

  errors: string[]

  total: number
}

export interface KandidatTableProps {

  sanityData:
    KandidatSanity[]

  dbData:
    KandidatRefDB[]
}