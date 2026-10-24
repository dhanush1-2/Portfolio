import type { Metadata } from 'next'
import { JetBrains_Mono, Inter, Space_Grotesk } from 'next/font/google'
import SmoothScroll from '@/components/SmoothScroll'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-stack',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dhanush Chandra Shekar · AI ML Engineer',
  description:
    'Data Scientist and Systems Engineer specializing in production grade intelligent infrastructure, distributed multi agent workflows, and structural knowledge graph integration.',
  openGraph: {
    title: 'Dhanush Chandra Shekar · AI ML Engineer',
    description:
      'Data Scientist and Systems Engineer specializing in production grade intelligent infrastructure, distributed multi agent workflows, and structural knowledge graph integration.',
    url: 'https://dhanushc.live',
    siteName: 'Dhanush Chandra Shekar',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <SmoothScroll />
        {/* Page-wide dither texture, matching the gateway flow overlay */}
        <div aria-hidden="true" className="dither pointer-events-none fixed inset-0 z-[60] opacity-[0.035]" />
        {children}
      </body>
    </html>
  )
}
