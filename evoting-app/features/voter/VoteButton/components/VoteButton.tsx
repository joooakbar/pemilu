'use client'

import Link from 'next/link'

import {
  Vote,
} from 'lucide-react'

import {
  Button,
} from '@/components/ui/button'

import {
  useVoteButton,
} from '../hooks/useVoteButton'

import {
  getStatusText,
} from '../utils/votebutton.utils'

import type {
  VoteButtonProps,
} from '../types/votebutton.types'

export default function VoteButton({
  status,
  electionId,
}: VoteButtonProps) {

  useVoteButton(electionId)

  if (status !== 'ACTIVE') {

    return (
      <div className="text-center text-muted-foreground text-sm">

        {getStatusText(status)}

      </div>
    )
  }

  return (
    <Button
      asChild
      size="lg"
      className="gap-2 text-lg px-8 py-6 rounded-xl shadow-lg"
    >

      <Link href="/vote">

        <Vote
          className="w-5 h-5"
        />

        Gunakan Hak Pilih Saya

      </Link>

    </Button>
  )
}