"use client";

import { useRouter } from "next/navigation";
import CountdownCard from "./CountdownCard";

interface HeroProps {
    namaPemilihan: string;
    startTime?: string;
    endTime?: string;
    status?: "DRAFT" | "ACTIVE" | "ENDED";
    electionId?: string;
}

const Hero = ({
    namaPemilihan,
    startTime,
    endTime,
    status,
    electionId,
} : HeroProps) => {

    const router = useRouter();

    const goToVote = () => {
        router.push('/vote');
    };

    const scrollToSection = (selector: string) => {
        const el = document.querySelector(selector);

        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    console.log("Status CountdownCard =", status);

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
                        onClick={goToVote}
                    >
                        <span>🗳️</span> Gunakan Hak Pilih Sekarang
                    </button>

                    <button
                        className="btn-cek"
                        onClick={() => scrollToSection("#cek-dpt")}
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
            electionId={electionId}
            />
        </section>
    );
};

export default Hero;