'use client'

import { useState }
from 'react'

import {
  ElectionManagerProps,
} from '../types'

import {
  useElectionForm,
} from '../hooks/useElectionForm'

import {
  useElectionEdit,
} from '../hooks/useElectionEdit'

import ElectionList
from './ElectionList'

import EmptyElection
from './EmptyElection'

import InfoSection
from './InfoSection'

export default function ElectionManager({
  initialElections,
  sanityInfo,
}: ElectionManagerProps) {

  const [elections] =
    useState(initialElections)

  const {
    showForm,
  } = useElectionForm()

  const {
    editId,
  } = useElectionEdit()

  return (
    <div className="space-y-6">

      {/* nanti:
          SanityInfoPanel
      */}

      {elections.length === 0 ? (

        <EmptyElection />

      ) : (

        <ElectionList
          elections={elections}
          onEdit={(el) => {
            console.log(el)
          }}
        />

      )}

      <InfoSection />

    </div>
  )
}