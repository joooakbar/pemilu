import { StatusPemilihan } from '../types/countdown.types'

export const getCountdownLabel = (
  status: StatusPemilihan
) => {

  switch (status) {

    case 'DRAFT':
      return '🕐 Pemilihan Akan Dimulai Dalam'

    case 'ACTIVE':
      return '⏱ Pemilihan Berakhir Dalam'

    case 'ENDED':
      return '⛔ Pemilihan Telah Berakhir'

    default:
      return ''
  }
}