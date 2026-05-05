"use client";

import CountdownCard from "@/components/voter/CountdownCard"
import { useHero } from "@/features/voter/hooks/useHero"
import { HeroProps } from "@/features/voter/types/pemilihan.types";

const Hero = ({
    namaPemilihan,
    startTime,
    endTime,
    status,
    idPemilihan,
}: HeroProps) => {
    const { handleVote, handleScroll } = useHero(idPemilihan);

    return (
        <section className="hero">
            <div className="hero-content reveal">
                <div className="hero-eyebrow">
                    <span>
                        🗳️ {namaPemilihan}
                    </span>
                </div>

                <h2>
                    Suaramu<br />
                    Menentukan<br />
                    <em>Masa Depan</em>
                </h2>

                <p>
                    Gunakan hak pilih Anda secara aman, mudah, dan transparan melalui sistem e-voting terenkripsi. Pilih pemimpin terbaik untuk Negara Anda.
                </p>

                <div className="hero-actions">
                    <button 
                        className="btn-vote-hero"
                        onClick={handleVote}
                    >
                        <span>🗳️</span> Gunakan Hak Pilih Sekarang
                    </button>

                    <button
                        className="btn-cek"
                        onClick={() => handleScroll("#cek-dpt")}
                    >
                        Cek Status DPT Saya
                    </button>
                </div>
            </div>

            <CountdownCard 
            startTime={startTime}
            endTime={endTime}
            namaPemilihan={namaPemilihan}
            status={status}
            idPemilihan={idPemilihan}
            />
        </section>
    );
};

export default Hero;