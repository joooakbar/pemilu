export const formatNumber = (
  value: number
) => {

  return new Intl.NumberFormat(
    'id-ID'
  ).format(value)
}

export const getProgressWidth = (
  persen: number
) => {

  return `${persen}%`
}