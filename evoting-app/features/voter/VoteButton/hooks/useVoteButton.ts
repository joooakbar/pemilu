'use client'

import {
  useEffect,
} from 'react'

export const useVoteButton = (
  electionId: string
) => {

  useEffect(() => {

    if (!electionId) return

    sessionStorage.setItem(
      'electionId',
      electionId
    )

  }, [electionId])
}