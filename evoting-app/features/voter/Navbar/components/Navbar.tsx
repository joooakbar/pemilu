'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useNavbar } from '../hooks/useNavbar'  
import type {
  NavbarProps,
} from '../types/navbar.types'

const Navbar = ({
  electionStatus,
}: NavbarProps) => {

  const {
    handleScroll,
  } = useNavbar()

  return (
    <nav className="navbar">

      <Link
        href="/"
        className="nav-brand"
      >

        <div className="nav-logo">
          🗳️
        </div>

        <div className="nav-brand-text">

          <h1>
            E-VOTIS
          </h1>

          <p>
            Portal Pemilih
          </p>

        </div>

      </Link>

      <div className="nav-links">

        <button
          className="nav-link"
          onClick={() =>
            handleScroll(
              '#kandidat'
            )
          }
        >
          Kandidat
        </button>

        <button
          className="nav-link"
          onClick={() =>
            handleScroll(
              '#cek-dpt'
            )
          }
        >
          Cek DPT
        </button>

        <button
          className="nav-link"
          onClick={() =>
            handleScroll(
              '#tatacara'
            )
          }
        >
          Cara Memilih
        </button>

        <button
          className="nav-link"
          onClick={() =>
            handleScroll(
              '#berita'
            )
          }
        >
          Berita
        </button>

      </div>

      <div className="nav-right">

        <div
          className={cn(
            'nav-status',
            electionStatus
          )}
        >

          <div
            className={cn(
              'dot',
              electionStatus
            )}
          />

          {electionStatus}

        </div>

        <Link
          href="/vote"
          className="btn-vote-nav"
        >
          Gunakan Hak Pilih →
        </Link>

      </div>

    </nav>
  )
}

export default Navbar