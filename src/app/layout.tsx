import type { Metadata } from 'next'
import { Playfair_Display, Inter, JetBrains_Mono, Rye } from 'next/font/google'
import CinematicLoader from '@/components/CinematicLoader'
import CustomCursor from '@/components/CustomCursor'
import './globals.css'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const rye = Rye({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-rye',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dhanush Chandra Shekar — AI/ML Engineer',
  description:
    'Data Scientist & Systems Engineer specializing in production-grade intelligent infrastructure, distributed multi-agent workflows, and structural knowledge graph integration.',
  openGraph: {
    title: 'Dhanush Chandra Shekar — AI/ML Engineer',
    description:
      'Data Scientist & Systems Engineer specializing in production-grade intelligent infrastructure, distributed multi-agent workflows, and structural knowledge graph integration.',
    url: 'https://dhanushc.live',
    siteName: 'Dhanush Chandra Shekar',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable} ${jetbrainsMono.variable} ${rye.variable}`}
    >
      <body>
        <CinematicLoader />
        <CustomCursor />
        <div className="vignette" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
