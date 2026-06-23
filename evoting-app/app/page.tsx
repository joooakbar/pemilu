import {
  getKandidatList,
  getPengumumanList,
  getTataCara,
} from "@/sanity/lib/fetchers";

import { prisma } from "@/lib/db";
import { StatusPemilihan } from "@prisma/client";

import TataCaraSection from "@/features/voter/TataCaraSection/components/TataCaraSection";
import BeritaSection from "@/features/voter/BeritaSection/components/BeritaSection";
import Hero from "@/features/voter/Hero/components/Hero";
import LiveTicker from "@/features/voter/LiveTicker/components/LiveTicker";
import Navbar from "@/features/voter/Navbar/components/Navbar";
import CandidateSection from "@/features/voter/CandidateSection/components/CandidateSection";
import StatsBar from "@/features/voter/StatsBar/components/StatsBar";
import CekDPTSection from "@/features/voter/CekDPTSection/components/CekDPTSection";
import Footer from "@/features/voter/Footer/components/Footer";
import VoterPageRefresher from "@/lib/services/refresh";

export const metadata = { title: "Beranda Pemilihan" };

export default async function VoterHomePage() {
  const [kandidat, pengumuman, tataCara, pemilihan] = await Promise.all([
    getKandidatList(),
    getPengumumanList(),
    getTataCara(),
    prisma.pemilihan.findFirst({ orderBy: { createdAt: "desc" } }),
  ]);
  console.log("STATUS PEMILIHAN HALAMAN VOTE:", pemilihan?.status);
  return (
    <div className="space-y-0">
      <VoterPageRefresher />
      {/* Hero + Countdown */}
      <header className="site-header">
        <Navbar
          idPemilihan={pemilihan?.id}
          status={(pemilihan?.status as StatusPemilihan) ?? "DRAFT"}
          startTime={pemilihan?.startTime?.toISOString()}
          endTime={pemilihan?.endTime?.toISOString()}
        />

        <LiveTicker idPemilihan={pemilihan?.id} />
      </header>

      <Hero
        namaPemilihan={pemilihan?.nama ?? "E-VOTIS"}
        status={(pemilihan?.status as StatusPemilihan) ?? "DRAFT"}
        startTime={pemilihan?.startTime?.toISOString() ?? ""}
        endTime={pemilihan?.endTime?.toISOString() ?? ""}
        idPemilihan={pemilihan?.id}
      />
      {pemilihan?.id && <StatsBar idPemilihan={pemilihan.id} />}

      {/* Kandidat */}
      <CandidateSection kandidat={kandidat} />

      {/* Cek DPT */}
      <CekDPTSection idPemilihan={pemilihan?.id ?? ""} />

      {/* Tata Cara */}
      {tataCara && <TataCaraSection data={tataCara} />}

      {/* Berita & Pengumuman */}
      <BeritaSection data={pengumuman} />

      <Footer />
    </div>
  );
}
