"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavbarProps } from "../types/navbar.types";
import { useElectionEngine } from "@/hooks/useElectionEngine";

const Navbar1 = ({ idPemilihan, status, startTime, endTime }: NavbarProps) => {
  const isManuallyEnded = status === "ENDED";

  const { isStarted, isEnded, canVote } = useElectionEngine(
    idPemilihan,
    startTime,
    endTime,
    isManuallyEnded,
  );

  const electionStatus = isEnded ? "ENDED" : isStarted ? "ACTIVE" : "DRAFT";

  const scrollToSection = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <nav className="navbar">
      <Link href="/" className="nav-brand">
        <div className="nav-logo">🗳️</div>
        <div className="nav-brand-text">
          <h1>E-VOTIS</h1>
          <p>Portal Pemilih</p>
        </div>
      </Link>

      <div className="nav-links">
        <button onClick={() => scrollToSection("#kandidat")}>Kandidat</button>

        <button onClick={() => scrollToSection("#cek-dpt")}>Cek DPT</button>

        <button onClick={() => scrollToSection("#tatacara")}>
          Cara Memilih
        </button>

        <button onClick={() => scrollToSection("#berita")}>Berita</button>
      </div>

      <div className="nav-right">
        <div className={cn("nav-status", electionStatus)}>
          <div className={cn("dot", electionStatus)} />
          {electionStatus}
        </div>

        {canVote ? (
          <Link href={`/vote/${idPemilihan}`} className="btn-vote-nav">
            Gunakan Hak Pilih →
          </Link>
        ) : (
          <button className="btn-vote-nav disabled" disabled>
            {electionStatus === "DRAFT" && "Pemilihan Belum Dimulai"}
            {electionStatus === "ENDED" && "Pemilihan Telah Berakhir"}
            {electionStatus === "ACTIVE" && "Sedang Berlangsung"}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar1;
