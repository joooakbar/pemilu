'use client'

import Link from "next/link"
import { cn } from "@/lib/utils"

interface NavbarProps {
    electionStatus: string
}

const Navbar1 = ({  electionStatus }: NavbarProps) => {
    const scrollToSection = (selector: string) => {
        const el = document.querySelector(selector);
        if (el) {
            el.scrollIntoView({ behavior: "smooth"});
        }
    };

  return (
    <nav className="navbar">
        <Link href="/" className="nav-brand">
            <div className="nav-logo">
                🗳️
            </div>
            <div className="nav-brand-text">
                <h1>E-VOTIS</h1>
                <p>Portal Pemilih</p>
            </div>
        </Link>

        <div className="nav-links">
            <button
                className="nav-link"
                onClick={() => scrollToSection("#kandidat")}
            >
                Kandidat
            </button>

            <button
                className="nav-link"
                onClick={() => scrollToSection("#cek-dpt")}
            >
                Cek DPT
            </button>

            <button
                className="nav-link"
                onClick={() => scrollToSection("#tatacara")}
            >
            Cara Memilih
            </button>

            <button
                className="nav-link"
                onClick={() => scrollToSection("#berita")}
            >
            Berita
            </button>
        </div>

        <div className="nav-right">
            <div className={cn("nav-status", electionStatus)}>
                <div className={cn("dot", electionStatus)}></div>
                {electionStatus}
            </div>

            <Link href="/vote" className="btn-vote-nav">
                Gunakan Hak Pilih → 
            </Link>
        </div>
    </nav>
  )
}

export default Navbar1;