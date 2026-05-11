export const getBeritaUtama = <T>(
  data: T[]
) => {
  return data[0]
}

export const getBeritaList = <T>(
  data: T[]
) => {
  return data.slice(1)
}