import { getKandidatList, getPengumumanList, getTataCara, getElectionInfo } from '@/sanity/lib/fetchers'
import { prisma } from '@/lib/db'
import TataCaraSection   from '@/components/voter/TataCaraSection'
import BeritaSection     from '@/components/voter/BeritaSection'
import Hero from '@/components/voter/Hero'
import LiveTicker from '@/components/voter/LiveTicker'
import Navbar from '@/components/voter/Navbar'
import CandidateSection from '@/components/voter/CandidateSection'
import StatsBar from '@/components/voter/StatsBar'
import CekDPTSection from '@/components/voter/CekDPTSection'
import Footer from '@/components/voter/Footer'

export const metadata = { title: 'Beranda Pemilihan' }

export default async function VoterHomePage() {
  const [kandidat, pengumuman, tataCara, infoSanity, pemilihan] = await Promise.all([
    getKandidatList(),
    getPengumumanList(),
    getTataCara(),
    getElectionInfo(),
    prisma.pemilihan.findFirst({ orderBy: { createdAt: 'desc' } }),
  ])

  console.log("PEMILIHAN:", pemilihan)

  return (
    <div className="space-y-0">
      {/* Hero + Countdown */}
      <header className='site-header'> 
        <Navbar
          electionStatus={pemilihan?.status ?? 'DRAFT'}        
        />
        <LiveTicker />
      </header>
      
      <Hero
        namaPemilihan={infoSanity?.namaPemilihan ?? pemilihan?.nama ?? 'E-VOTIS'}
        startTime={pemilihan?.startTime?.toLocaleString() ?? ''}
        endTime={pemilihan?.endTime?.toLocaleString() ?? ''}
        status={(pemilihan?.status as "DRAFT" | "ACTIVE" | "ENDED") ?? "DRAFT"}
        idPemilihan={pemilihan?.id}
      />
      
      <StatsBar />

      {/* Kandidat */}
      <CandidateSection kandidat={kandidat} />


      {/* Cek DPT */}
      <CekDPTSection idPemilihan={pemilihan?.id ?? ''} />

      {/* Tata Cara */}
      {tataCara && ( <TataCaraSection data={tataCara} />)}

      {/* Berita & Pengumuman */}
      <BeritaSection data={pengumuman} />

      <Footer />
    </div>
  )
}