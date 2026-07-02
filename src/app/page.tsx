'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'

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
      const scrollPosition = window.scrollY + 140 // offset matching header margin
      
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
      setActiveTab(currentActive)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // set initial highlight
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="portfolio-container">
      {/* Sticky Top Header Navbar */}
      <Header
        tabs={TABS}
        activeTab={activeTab}
      />

      {/* Main content sections stacked vertically */}
      <main className="content-area">
        <section id="about">
          <Hero />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>

      {/* Keyboard Shortcuts HUD indicator */}
      <div className="control-prompts">
        <span className="mono-text">hover</span> keyboard to explore
      </div>
    </div>
  )
}
