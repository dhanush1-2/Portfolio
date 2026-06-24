'use client'

import { useState, useEffect, useRef } from 'react'
import Sidebar from '@/components/Sidebar'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'
import audio from '@/utils/audio'
import DustParticles from '@/components/DustParticles'
import BackgroundMusic from '@/components/BackgroundMusic'

type TabItem = {
  label: string
  category: string
  title: string
  desc: string
  bgImage: string
  id: string
}

const TABS: TabItem[] = [
  {
    label: 'About',
    category: 'AI / ML ENGINEER',
    title: 'Dhanush Chandra Shekar',
    desc: 'Turning data into decisions and models into products. AI/ML Engineer and MS Data Science student at Indiana University, building end-to-end intelligent systems.',
    bgImage: '/assets/tumbleweed_bg.png',
    id: 'about',
  },
  {
    label: 'Projects',
    category: 'SELECTED DOSSIERS',
    title: 'Featured Projects',
    desc: '9 production systems spanning unified LLM gateways, multi-agent state engines, knowledge graphs (GraphRAG), MLOps pipelines, and ETL networks.',
    bgImage: '/assets/ledger_bg.png',
    id: 'projects',
  },
  {
    label: 'Skills',
    category: 'TECHNICAL ARSENAL',
    title: 'Technical Skills',
    desc: 'Expertise across Languages, AI/ML models, Data Infrastructure, and Web Deployment pipelines — from training Transformers from scratch to production scaling.',
    bgImage: '/assets/tumbleweed_bg.png',
    id: 'skills',
  },
  {
    label: 'Experience',
    category: 'CHRONICLE',
    title: 'Experience',
    desc: 'Professional history including Data Science faculty instruction at Indiana University Kelley School of Business and academic research systems design.',
    bgImage: '/assets/journal_bg.png',
    id: 'experience',
  },
  {
    label: 'Contact',
    category: 'DISPATCH',
    title: 'Contact',
    desc: 'Open to full-time AI/ML Engineering roles and research collaborations. Send a dispatch or view resume dossier to connect.',
    bgImage: '/assets/telegram_bg.png',
    id: 'contact',
  },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState<number>(0)
  const [isMuted, setIsMuted] = useState<boolean>(false)

  const gamepadRef = useRef<number | null>(null)
  const buttonStatesRef = useRef<{ [key: number]: boolean }>({})
  const isNavigatingRef = useRef(false)

  useEffect(() => {
    setIsMuted(audio.isMuted())
  }, [])

  const toggleMute = () => {
    const nextMuted = !isMuted
    audio.setMuted(nextMuted)
    setIsMuted(nextMuted)
  }

  const moveUp = () => {
    audio.playHover()
    setActiveTab((prev) => (prev === 0 ? TABS.length - 1 : prev - 1))
  }

  const moveDown = () => {
    audio.playHover()
    setActiveTab((prev) => (prev === TABS.length - 1 ? 0 : prev + 1))
  }

  // Keyboard navigation (up/down only)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (key === 'arrowup' || key === 'w') { e.preventDefault(); moveUp() }
      else if (key === 'arrowdown' || key === 's') { e.preventDefault(); moveDown() }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeTab])

  // Gamepad polling (D-pad / stick navigation only)
  useEffect(() => {
    const pollGamepad = () => {
      const gamepads = navigator.getGamepads ? navigator.getGamepads() : []
      const gamepad = gamepads[0]
      if (gamepad) {
        const axesY   = gamepad.axes[1]
        const nowUp   = gamepad.buttons[12]?.pressed || axesY < -0.5
        const nowDown = gamepad.buttons[13]?.pressed || axesY >  0.5
        if (nowUp   && !buttonStatesRef.current[12]) moveUp()
        if (nowDown && !buttonStatesRef.current[13]) moveDown()
        buttonStatesRef.current[12] = nowUp
        buttonStatesRef.current[13] = nowDown
      }
      gamepadRef.current = requestAnimationFrame(pollGamepad)
    }
    gamepadRef.current = requestAnimationFrame(pollGamepad)
    return () => { if (gamepadRef.current) cancelAnimationFrame(gamepadRef.current) }
  }, [activeTab])

  // Scroll-based section navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isNavigatingRef.current) { e.preventDefault(); return }

      // If the cursor is inside a scrollable booklet that can still scroll, let it
      const booklet = (e.target as Element).closest('.booklet-container') as HTMLElement | null
      if (booklet) {
        const { scrollTop, scrollHeight, clientHeight } = booklet
        if (e.deltaY > 0 && scrollTop + clientHeight < scrollHeight - 5) return
        if (e.deltaY < 0 && scrollTop > 5) return
      }

      e.preventDefault()
      isNavigatingRef.current = true

      if (e.deltaY > 0) {
        audio.playHover()
        setActiveTab(prev => Math.min(prev + 1, TABS.length - 1))
      } else if (e.deltaY < 0) {
        audio.playHover()
        setActiveTab(prev => Math.max(prev - 1, 0))
      }

      setTimeout(() => { isNavigatingRef.current = false }, 900)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  const activeBg = TABS[activeTab].bgImage

  return (
    <div className="rdr2-pause-screen">
      <DustParticles />
      <BackgroundMusic />

      {/* Sidebar */}
      <Sidebar
        tabs={TABS}
        activeTab={activeTab}
        setActiveTab={(index) => {
          audio.playSelect()
          setActiveTab(index)
        }}
        isMuted={isMuted}
        toggleMute={toggleMute}
      />

      {/* Right content area */}
      <main className="content-area">
        {/* Background image — always visible, faint blend */}
        <div
          className="preview-panel"
          style={{ backgroundImage: `url("${activeBg}")` }}
        >
          <div className="preview-overlay" />
        </div>

        {/* Section content — always shown */}
        <div className="detail-panel-container">
          {activeTab === 0 && <Hero />}
          {activeTab === 1 && <Projects />}
          {activeTab === 2 && <Skills />}
          {activeTab === 3 && <Experience />}
          {activeTab === 4 && <Contact />}
        </div>
      </main>

      {/* HUD */}
      <div className="control-prompts">
        <div className="control-prompt-item">
          <span className="btn-prompt-icon" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'rgba(255,255,255,0.7)' }}>↕</span> Navigate
        </div>
      </div>
    </div>
  )
}
