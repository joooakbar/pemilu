import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Toaster } from '@/components/ui/sonner'
import { Fraunces, DM_Sans, JetBrains_Mono } from "next/font/google";
import './globals.css'

const helveticaNeue = localFont({
  src: [
    { path: '/fonts/HelveticaNeueThin.otf',       weight: '300', style: 'normal' },
    { path: '/fonts/HelveticaNeueRoman.otf',      weight: '400', style: 'normal' },
    { path: '/fonts/HelveticaNeueMedium.otf',     weight: '500', style: 'normal' },
    { path: '/fonts/HelveticaNeueBold.otf',       weight: '700', style: 'normal' },
    { path: '/fonts/HelveticaNeueBlack.otf',      weight: '800', style: 'normal' },
  ],
  variable: '--font-helvetica',
})

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: { default: 'E-VOTIS', template: '%s | E-VOTIS' },
  description: 'Sistem E-Voting Terenkripsi',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${helveticaNeue.variable} font-sans antialiased`}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
