export interface ElectionInfoSanity {}

export type ElectionStatus =
  | 'DRAFT'
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'ENDED'

export interface ElectionDB {
  id: string
  nama: string
  startTime: string
  endTime: string
  status: ElectionStatus
  tempatVoting?: string | null
  deskripsi?: string | null
  sanityId?: string | null
}

export interface ElectionManagerProps {
  initialElections: ElectionDB[]
  sanityInfo: ElectionInfoSanity | null
}

export interface RowProps {
  label: string
  value: string
  highlight?: boolean
  warn?: boolean
  mono?: boolean
}