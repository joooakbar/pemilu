import { getKandidatList, getPengumumanList, getTataCara, getElectionInfo } from '@/sanity/lib/fetchers'
import prisma from '@/lib/db'
import TataCaraSection   from '@/components/voter/TataCaraSection'
import BeritaSection     from '@/components/voter/BeritaSection'
import Hero from '@/components/voter/Hero'
import LiveTicker from '@/components/LiveTicker'
import Navbar from '@/components/Navbar'
import CandidateSection from '@/components/voter/CandidateSection'
import StatsBar from '@/components/voter/StatsBar'
import CekDPTSection from '@/components/voter/CekDPTSection'
import Footer from '@/components/Footer'

export const metadata = { title: 'Beranda Pemilihan' }

export default async function VoterHomePage() {
  const [kandidat, pengumuman, tataCara, infoSanity, election] = await Promise.all([
    getKandidatList(),
    getPengumumanList(),
    getTataCara(),
    getElectionInfo(),
    prisma.election.findFirst({ orderBy: { createdAt: 'desc' } }),
  ])

  return (
    <div className="space-y-0">
      {/* Hero + Countdown */}
      <header className='site-header'> 
        <Navbar 
          electionStatus={election?.status ?? 'DRAFT'}        
        />
        <LiveTicker />
      </header>
      
      <Hero 
        namaPemilihan={infoSanity?.namaPemilihan ?? election?.nama ?? 'E-VOTIS'}
        startTime={election?.startTime.toISOString() ?? ''}
        endTime={election?.endTime.toISOString() ?? ''}
        status={(election?.status as "DRAFT" | "ACTIVE" | "ENDED") ?? "DRAFT"}
        electionId={election?.id}
      />

      <StatsBar />

      {/* Kandidat */}
      <CandidateSection kandidat={kandidat} />


      {/* Cek DPT */}
      <CekDPTSection electionId={election?.id ?? ''} />

      {/* Tata Cara */}
      {tataCara && ( <TataCaraSection data={tataCara} />)}

      {/* Berita & Pengumuman */}
      <BeritaSection data={pengumuman} />

      <Footer />
    </div>
  )
}