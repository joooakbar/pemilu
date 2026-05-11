export const getStatusText = (
  status: string
) => {

  switch (status) {

    case 'DRAFT':
      return '⏳ Pemilihan belum dimulai'

    case 'SUSPENDED':
      return '⚠️ Pemilihan sedang dihentikan sementara'

    case 'ENDED':
      return '✅ Pemilihan telah selesai'

    default:
      return ''
  }
}