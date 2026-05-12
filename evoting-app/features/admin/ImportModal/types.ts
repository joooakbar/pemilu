export interface ImportResultData {
  message: string
  inserted: number
  updated: number
  skipped: number
  errors: string[]
  total: number
}

export interface ImportModalProps {
  electionId?: string
}