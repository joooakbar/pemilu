import { useEffect, useState } from 'react'
import { DPTRow } from '../types'

export function useDPTData(
  search: string
) {

  const [data, setData] =
    useState<DPTRow[]>([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    const load = async () => {

      setLoading(true)

      const res = await fetch(
        '/api/admin/dpt?' +
        new URLSearchParams({
          q: search,
        })
      )

      const json = await res.json()

      if (json.success) {
        setData(json.data)
      }

      setLoading(false)
    }

    load()

  }, [search])

  return {
    data,
    loading,
  }
}