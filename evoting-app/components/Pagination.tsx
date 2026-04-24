'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function Pagination({
  currentPage,
  totalPages,
  className,
}: {
  currentPage: number
  totalPages: number
  className?: string
}) {
  const searchParams = useSearchParams()

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    return `?${params.toString()}`
  }

  return (
    <div className={`flex justify-center gap-2 ${className}`}>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={createPageURL(page)}
          className={`px-4 py-2 rounded ${
            currentPage === page
              ? 'bg-accent text-primary-foreground'
              : 'border-1 border-accent hover:bg-accent/80'
          }`}
        >
          {page}
        </Link>
      ))}
    </div>
  )
}
