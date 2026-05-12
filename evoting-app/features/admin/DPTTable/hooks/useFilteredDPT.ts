import { DPTRow }
from '../types'

export function useFilteredDPT(
  data: DPTRow[],
  search: string
) {

  return data.filter((d) =>

    d.nama
      .toLowerCase()
      .includes(search.toLowerCase())

    ||

    d.nik.includes(search)

  )
}