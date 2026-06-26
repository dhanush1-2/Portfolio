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
import ChapterCard from '@/components/ChapterCard'

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
  const boundaryRef = useRef<{ dir: 1 | -1; hitAt: number } | null>(null)
  const prevTabRef = useRef(-1)
  const [chapterTab, setChapterTab] = useState<number | null>(null)

  useEffect(() => {
    setIsMuted(audio.isMuted())
  }, [])

  // Cinematic chapter card on section change
  useEffect(() => {
    if (prevTabRef.current === -1) { prevTabRef.current = activeTab; return }
    prevTabRef.current = activeTab
    setChapterTab(activeTab)
    const t = setTimeout(() => setChapterTab(null), 1400)
    return () => clearTimeout(t)
  }, [activeTab])

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

      const dir = e.deltaY > 0 ? 1 : -1 as 1 | -1
      const booklet = (e.target as Element).closest('.booklet-container') as HTMLElement | null

      if (booklet) {
        const { scrollTop, scrollHeight, clientHeight } = booklet
        const atBottom = scrollTop + clientHeight >= scrollHeight - 5
        const atTop = scrollTop <= 5

        // Booklet still has room to scroll — let it, reset boundary tracker
        if (dir > 0 && !atBottom) { boundaryRef.current = null; return }
        if (dir < 0 && !atTop)    { boundaryRef.current = null; return }

        // At boundary — guard against trackpad momentum triggering section jump
        const now = Date.now()
        if (!boundaryRef.current || boundaryRef.current.dir !== dir) {
          // First event hitting this boundary — record it, don't navigate yet
          boundaryRef.current = { dir, hitAt: now }
          e.preventDefault()
          return
        }
        if (now - boundaryRef.current.hitAt < 600) {
          // Still within 600ms — likely momentum, block navigation
          e.preventDefault()
          return
        }
        // 600ms passed with continued scroll intent — treat as deliberate navigation
        boundaryRef.current = null
      } else {
        boundaryRef.current = null
      }

      e.preventDefault()
      isNavigatingRef.current = true
      audio.playHover()
      setActiveTab(prev => dir > 0
        ? Math.min(prev + 1, TABS.length - 1)
        : Math.max(prev - 1, 0)
      )
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
      <ChapterCard chapter={chapterTab !== null ? { index: chapterTab, label: TABS[chapterTab].label } : null} />

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

      {/* Attribution */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9997,
        background: 'linear-gradient(to top, rgba(4,2,1,0.92) 0%, transparent 100%)',
        padding: '10px 24px 8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          letterSpacing: '0.1em',
          color: 'rgba(185, 168, 130, 0.75)',
          textAlign: 'center',
          lineHeight: '1.7',
          textTransform: 'uppercase',
        }}>
          Visual design & UI aesthetics inspired by{' '}
          <span style={{ color: 'rgba(212,175,55,0.85)' }}>Red Dead Redemption 2</span>
          {' '}(2018) ·{' '}
          <span style={{ color: 'rgba(212,175,55,0.85)' }}>© Rockstar Games / Take-Two Interactive Software, Inc.</span>
          {' '}· All game trademarks, characters, and intellectual property are the sole property of their respective owners.
          This is a personal, non-commercial portfolio and is not affiliated with or endorsed by Rockstar Games.
        </p>
      </div>
    </div>
  )
}
