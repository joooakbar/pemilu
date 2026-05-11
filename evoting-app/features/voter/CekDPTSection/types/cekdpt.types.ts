export type StatusType =
  | 'idle'
  | 'found'
  | 'not-found'
  | 'empty'
  | 'invalid'

export type DPTResult = {
  nama: string
  kodeWilayah: string
  hasVoted: boolean
}

export type CekDPTSectionProps = {
  idPemilihan: string
}