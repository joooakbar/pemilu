import { getKandidatList, getPengumumanList, getTataCara, getElectionInfo } from '@/sanity/lib/fetchers'
import { prisma } from '@/lib/db'
import TataCaraSection from '@/features/voter/TataCaraSection/components/TataCaraSection'
import BeritaSection from '@/features/voter/BeritaSection/components/BeritaSection'
import Hero from '@/features/voter/Hero/components/Hero'
import LiveTicker from '@/features/voter/LiveTicker/components/LiveTicker'
import Navbar from '@/features/voter/Navbar/components/Navbar'
import CandidateSection from '@/features/voter/CandidateSection/components/CandidateSection'
import StatsBar from '@/features/voter/StatsBar/components/StatsBar'
import CekDPTSection from '@/features/voter/CekDPTSection/components/CekDPTSection'
import Footer from '@/features/voter/Footer/components/Footer'

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
          idPemilihan={pemilihan?.id}     
        />
        <LiveTicker />
      </header>
      
      <Hero
        namaPemilihan={infoSanity?.namaPemilihan ?? pemilihan?.nama ?? 'E-VOTIS'}
        startTime={pemilihan?.startTime?.toISOString() ?? ''}
        endTime={pemilihan?.endTime?.toISOString() ?? ''}
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