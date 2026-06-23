"use client";

import CountdownCard from "../../CountdownCard/components/CountdownCard";
import { useElectionEngine } from "@/hooks/useElectionEngine";
import { HeroProps } from "@/features/voter/Hero/types/pemilihan.types";

const Hero = ({
  namaPemilihan,
  status,
  idPemilihan,
  startTime,
  endTime,
}: HeroProps) => {
  const isManuallyEnded = status === "ENDED";

  const { canVote, isStarted, isEnded } = useElectionEngine(
    idPemilihan,
    startTime,
    endTime,
    isManuallyEnded,
  );

  const handleVote = () => {
    if (!canVote) return;
    window.location.href = `/vote/${idPemilihan}`;
  };

  const handleScroll = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="hero">
      <div className="hero-content reveal">
        <div className="hero-eyebrow">
          <span>🗳️ {namaPemilihan}</span>
        </div>

        <h2>
          Suaramu
          <br />
          Menentukan
          <br />
          <em>Masa Depan</em>
        </h2>

        <p>
          Gunakan hak pilih Anda secara aman, mudah, dan transparan melalui
          sistem e-voting terenkripsi.
        </p>

        <div className="hero-actions">
          <button
            className="btn-vote-hero"
            onClick={handleVote}
            disabled={!canVote}
          >
            <span>🗳️</span>

            {!isStarted
              ? "Pemilihan Belum Dimulai"
              : isEnded
                ? "Pemilihan Telah Berakhir"
                : "Gunakan Hak Pilih Sekarang"}
          </button>

          <button className="btn-cek" onClick={() => handleScroll("#cek-dpt")}>
            Cek Status DPT Saya
          </button>
        </div>
      </div>

      <CountdownCard
        startTime={startTime}
        endTime={endTime}
        status={status}
        namaPemilihan={namaPemilihan}
        idPemilihan={idPemilihan}
      />
    </section>
  );
};

export default Hero;
