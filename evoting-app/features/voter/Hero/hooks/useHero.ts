'use client'

import { useRouter } from 'next/navigation'

export const useHero = (
  idPemilihan?: string
) => {

  const router = useRouter()

  const handleVote = () => {

    if (!idPemilihan) return

    router.push(
      `/vote/${idPemilihan}`
    )
  }

  const handleScroll = (
    selector: string
  ) => {

    const element =
      document.querySelector(selector)

    if (!element) return

    element.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return {
    handleVote,
    handleScroll,
  }
}