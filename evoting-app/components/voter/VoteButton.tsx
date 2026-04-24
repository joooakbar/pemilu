'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Vote } from 'lucide-react'

export default function VoteButton({ status, electionId }: { status: string; electionId: string }) {
  useEffect(() => {
    if (electionId) sessionStorage.setItem('electionId', electionId)
  }, [electionId])

  if (status !== 'ACTIVE') return (
    <div className="text-center text-muted-foreground text-sm">
      {status === 'DRAFT'     && '⏳ Pemilihan belum dimulai'}
      {status === 'SUSPENDED' && '⚠️ Pemilihan sedang dihentikan sementara'}
      {status === 'ENDED'     && '✅ Pemilihan telah selesai'}
    </div>
  )

  return (
    <Button asChild size="lg" className="gap-2 text-lg px-8 py-6 rounded-xl shadow-lg">
      <Link href="/vote">
        <Vote className="w-5 h-5" /> Gunakan Hak Pilih Saya
      </Link>
    </Button>
  )
}
