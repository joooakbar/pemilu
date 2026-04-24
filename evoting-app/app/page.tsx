<<<<<<< HEAD
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
=======
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
>>>>>>> 96054bc9326897fd107ea2423b359eb1f719a971
