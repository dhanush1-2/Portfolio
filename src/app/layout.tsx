import type { Metadata } from 'next'
import { JetBrains_Mono, Inter, Space_Grotesk } from 'next/font/google'
import CustomCursor from '@/components/CustomCursor'
import FullPagePhysicsBall from '@/components/FullPagePhysicsBall'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
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
        <CustomCursor />
        <FullPagePhysicsBall />
        {children}
      </body>
    </html>
  )
}
