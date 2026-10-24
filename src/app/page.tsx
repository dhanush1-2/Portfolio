'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Footer from '@/components/Footer'

type TabItem = {
  label: string
  id: string
}

const TABS: TabItem[] = [
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState<number>(0)

  // Scroll listener to reliably highlight the active tab
  useEffect(() => {
    const handleScroll = () => {
      // Check which section is currently active by measuring offset top values
      const scrollPosition = window.scrollY + 140 // offset matching header height

      let currentActive = 0
      for (let i = 0; i < TABS.length; i++) {
        const el = document.getElementById(TABS[i].id)
        if (el) {
          const top = el.offsetTop
          if (scrollPosition >= top) {
            currentActive = i
          }
        }
      }
      // The footer is shorter than the viewport, so it never reaches the header line; treat the page bottom as Contact
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        currentActive = TABS.length - 1
      }
      setActiveTab(currentActive)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // set initial highlight

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen">
      <Header tabs={TABS} activeTab={activeTab} />

      {/* Faint radial glow behind the content */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_60%)]"
      />

      {/* Full-bleed hero, outside the centred content column */}
      <section id="about">
        <Hero />
      </section>

      <main className="mx-auto flex max-w-7xl flex-col gap-28 px-4 pb-24 pt-12 sm:px-6 md:gap-36">
        <section id="projects">
          <Projects />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="experience">
          <Experience />
        </section>
      </main>

      {/* The footer doubles as the contact section */}
      <section id="contact">
        <Footer />
      </section>
    </div>
  )
}
