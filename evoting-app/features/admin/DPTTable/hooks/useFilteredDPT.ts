import { DPTRow } from '../types'

export function useFilteredDPT(
  data: DPTRow[],
  search: string
) {
  return data.filter((item) =>
    item.nama
      .toLowerCase()
      .includes(search.toLowerCase())

    ||

    item.nik.includes(search)
  )
}