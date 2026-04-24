'use client'
import { useEffect, useState, useRef } from 'react'
import type { ElectionStats } from '@/types'

export function useElectionStats(electionId: string) {
  const [stats, setStats]   = useState<ElectionStats | null>(null)
  const [error, setError]   = useState<string | null>(null)
  const sourceRef           = useRef<EventSource | null>(null)

  useEffect(() => {
    if (!electionId) return

    const url = `/api/stats/live?electionId=${electionId}`
    const es  = new EventSource(url)
    sourceRef.current = es

    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data) as ElectionStats
        setStats(data)
        setError(null)
      } catch {
        setError('Gagal parse data statistik')
      }
    }

    es.onerror = () => {
      setError('Koneksi SSE terputus, mencoba ulang...')
    }

    return () => {
      es.close()
      sourceRef.current = null
    }
  }, [electionId])

  return { stats, error }
}
