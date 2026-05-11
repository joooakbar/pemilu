'use client'

import { useMemo, useState } from 'react'

import {
  Candidate,
  TabType,
} from '../types/candidate.types'

export const useCandidate = (
  kandidat: Candidate
) => {

  const [activeTab, setActiveTab] =
    useState<TabType>('visi')

  const content = useMemo(() => {

    switch (activeTab) {

      case 'visi':
        return kandidat.visi

      case 'misi':
        return kandidat.misi

      case 'program':
        return kandidat.program

      default:
        return kandidat.visi
    }

  }, [activeTab, kandidat])

  return {
    activeTab,
    setActiveTab,
    content,
  }
}