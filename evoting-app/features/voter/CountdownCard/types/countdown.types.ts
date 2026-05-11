export type StatusPemilihan =
  | 'DRAFT'
  | 'ACTIVE'
  | 'ENDED'

export type CountdownCardProps = {
  startTime: string

  endTime: string

  namaPemilihan: string

  status: StatusPemilihan

  idPemilihan?: string
}

export type TimeLeft = {
  h: string
  m: string
  s: string
}