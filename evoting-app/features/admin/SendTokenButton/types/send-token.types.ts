export interface SendTokenProps {
  electionId: string
  electionStatus: string
}

export interface SendTokenResultData {
  generated?: number
  waSent?: number
  emailSent?: number
  failed?: number
  total?: number
}

export interface SendTokenOptionsData {
  generate: boolean
  via: string[]
  expiredJam: number
}