export const formatNumber = (
  value: number
) => {
  return new Intl.NumberFormat('id-ID').format(
    value
  )
}