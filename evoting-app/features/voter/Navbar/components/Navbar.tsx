"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavbarProps } from "../types/navbar.types";
import { useNavbarState } from "../hooks/useNavbarState";

const Navbar1 = ({ startTime, endTime, idPemilihan }: NavbarProps) => {
  const { status, isActive } = useNavbarState(startTime, endTime);
  console.log("startTime:", startTime);
  console.log("endTime:", endTime);
  console.log("now:", new Date().toISOString());
  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
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

        <button className="nav-link" onClick={() => scrollToSection("#berita")}>
          Berita
        </button>
      </div>

      <div className="nav-right">
        <div className={cn("nav-status", status)}>
          <div className={cn("dot", status)}></div>
          {status}
        </div>

        {isActive ? (
          <Link href={`/vote/${idPemilihan}`} className="btn-vote-nav">
            Gunakan Hak Pilih →
          </Link>
        ) : (
          <button className="btn-vote-nav disabled" disabled>
            {status === "DRAFT"
              ? "Pemilihan Belum Dimulai"
              : status === "ENDED"
                ? "Pemilihan Telah Berakhir"
                : "Terima Kasih"}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar1;
