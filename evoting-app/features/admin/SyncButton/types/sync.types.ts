export interface SyncSectionData {
  created: number
  updated: number
  skipped: number
  errors: string[]
}

export interface SyncResult {
  timestamp: string

  election: SyncSectionData & {
    electionId?: string
  }

  kandidat: SyncSectionData
}