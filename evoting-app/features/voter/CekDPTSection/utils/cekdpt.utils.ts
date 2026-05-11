import { StatusType } from '../types/cekdpt.types'

export const getStatusTitle = (
  status: StatusType
) => {

  switch (status) {

    case 'found':
      return 'Anda Terdaftar'

    case 'empty':
      return 'Field Kosong'

    case 'invalid':
      return 'NIK Tidak Valid'

    case 'not-found':
      return 'Data Tidak Ditemukan'

    default:
      return ''
  }
}

export const getStatusDescription = (
  status: StatusType
) => {

  switch (status) {

    case 'found':
      return 'Nama Anda ditemukan dalam Daftar Pemilih Tetap.'

    case 'empty':
      return 'Harap isi field NIK terlebih dahulu.'

    case 'invalid':
      return 'NIK harus terdiri dari 16 digit angka.'

    case 'not-found':
      return 'NIK yang Anda masukkan tidak ditemukan.'

    default:
      return ''
  }
}