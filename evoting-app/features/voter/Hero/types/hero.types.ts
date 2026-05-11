export type StatusPemilihan =
  | 'DRAFT'
  | 'ACTIVE'
  | 'ENDED'

export type HeroProps = {
  namaPemilihan: string

  startTime: string

  endTime: string

  status: StatusPemilihan

  idPemilihan?: string
}