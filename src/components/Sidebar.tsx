'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TabItem {
  label: string
  id: string
}

interface SidebarProps {
  tabs: TabItem[]
  activeTab: number
  setActiveTab: (index: number) => void
  isMuted: boolean
  toggleMute: () => void
}

// ─── Pocket Watch ────────────────────────────────────────────────────────────
function PocketWatch() {
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    setTime(new Date())
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // SSR-safe fallback — renders same dimensions, no trig
  if (!time) return <div style={{ width: 90, height: 112 }} />

  const rnd = (n: number) => Math.round(n * 100) / 100

  // Clock geometry
  const CX = 50, CY = 68          // main dial centre
  const SCX = 50, SCY = 88        // sub-dial centre (6 o'clock)
  const DIAL_R = 33               // inner dial radius
  const SUB_R  = 7                // sub-dial radius
  const GOLD   = '#c8a060'
  const DARK   = '#060300'

  // Time → angles (degrees, clockwise from 12)
  const hrs = time.getHours() % 12
  const mins = time.getMinutes()
  const secs = time.getSeconds()
  const hrAngle  = rnd(hrs * 30 + mins * 0.5)
  const minAngle = rnd(mins * 6)
  const secAngle = rnd(secs * 6)

  // 60 tick marks (minute-resolution)
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const isHour    = i % 5  === 0
    const isQuarter = i % 15 === 0
    const a = (i * 6 - 90) * (Math.PI / 180)
    const c = rnd(Math.cos(a)), s = rnd(Math.sin(a))
    return {
      x1: rnd(CX + DIAL_R       * c), y1: rnd(CY + DIAL_R       * s),
      x2: rnd(CX + (isQuarter ? DIAL_R - 7 : isHour ? DIAL_R - 4 : DIAL_R - 2) * c),
      y2: rnd(CY + (isQuarter ? DIAL_R - 7 : isHour ? DIAL_R - 4 : DIAL_R - 2) * s),
      sw: isQuarter ? 1.4 : isHour ? 0.8 : 0.35,
    }
  })

  // Arabic numerals — skip 6 (sub-dial sits there)
  const NR = 23   // numeral radius
  const NUMS = [12, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11].map(n => {
    const a = (n * 30 - 90) * (Math.PI / 180)
    return { n, x: rnd(CX + NR * Math.cos(a)), y: rnd(CY + NR * Math.sin(a)) }
  })

  // Sub-dial tick marks
  const subTicks = Array.from({ length: 12 }, (_, i) => {
    const a = (i * 30 - 90) * (Math.PI / 180)
    const c = rnd(Math.cos(a)), s = rnd(Math.sin(a))
    return {
      x1: rnd(SCX + (SUB_R - 0.5) * c), y1: rnd(SCY + (SUB_R - 0.5) * s),
      x2: rnd(SCX + (SUB_R - 2.0) * c), y2: rnd(SCY + (SUB_R - 2.0) * s),
    }
  })

  return (
    <svg viewBox="0 0 100 112" className="sidebar-watch-svg" aria-hidden="true">

      {/* ── Chain bow (loop for chain attachment) ── */}
      <path d="M44 16 Q44 7 50 7 Q56 7 56 16"
        fill="none" stroke={GOLD} strokeWidth="2.2" strokeLinecap="round"/>

      {/* ── Crown / winding stem ── */}
      <rect x="46.5" y="14" width="7" height="10" rx="2.5"
        fill={DARK} stroke={GOLD} strokeWidth="1.5"/>
      <rect x="48" y="15.5" width="4" height="6" rx="1.5"
        fill="#0e0700" stroke={GOLD} strokeWidth="0.6"/>
      {/* Short stem connecting crown to case */}
      <rect x="48.5" y="23" width="3" height="7"
        fill={DARK} stroke={GOLD} strokeWidth="0.9"/>

      {/* ── Outer case ── */}
      <circle cx={CX} cy={CY} r="38" fill="#070400" stroke={GOLD} strokeWidth="2"/>
      {/* Engraved decorative ring */}
      <circle cx={CX} cy={CY} r="35.5" fill="none"
        stroke={GOLD} strokeWidth="0.35" strokeDasharray="1.5 2.5" opacity="0.6"/>
      {/* Dial background */}
      <circle cx={CX} cy={CY} r={DIAL_R} fill={DARK} stroke={GOLD} strokeWidth="0.9"/>

      {/* ── Tick marks ── */}
      {ticks.map((t, i) => (
        <line key={i}
          x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke={GOLD} strokeWidth={t.sw} strokeLinecap="round"/>
      ))}

      {/* ── Arabic numerals ── */}
      {NUMS.map(({ n, x, y }) => (
        <text key={n}
          x={x} y={y}
          textAnchor="middle" dominantBaseline="central"
          fontSize={n >= 10 ? '5' : '5.8'}
          fontFamily="Georgia, 'Palatino Linotype', serif"
          fill={GOLD} fontWeight="bold">
          {n}
        </text>
      ))}

      {/* ── Sub-dial at 6 o'clock (seconds) ── */}
      <circle cx={SCX} cy={SCY} r={SUB_R} fill="#040200" stroke={GOLD} strokeWidth="0.7"/>
      {subTicks.map((t, i) => (
        <line key={i}
          x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke={GOLD} strokeWidth="0.4" strokeLinecap="round" opacity="0.75"/>
      ))}
      {/* Sub-dial seconds hand */}
      <g transform={`rotate(${secAngle} ${SCX} ${SCY})`}>
        <line x1={SCX} y1={SCY + 1.5} x2={SCX} y2={SCY - (SUB_R - 1.5)}
          stroke="#7a0808" strokeWidth="0.9" strokeLinecap="round"/>
      </g>
      <circle cx={SCX} cy={SCY} r="1.2" fill={GOLD}/>
      {/* "S" label above sub-dial */}
      <text x={SCX} y={SCY - SUB_R - 1.5}
        textAnchor="middle" fontSize="2.4"
        fontFamily="Georgia, serif" fill={GOLD} opacity="0.6">SEC</text>

      {/* ── Hour hand — ornate with filigree diamond tip ── */}
      <g transform={`rotate(${hrAngle} ${CX} ${CY})`}>
        {/* Body: tapered teardrop from base to shoulder */}
        <path d={`M ${CX} ${CY+5} L ${CX-3} ${CY+2}
                  L ${CX-2.5} ${CY-8} L ${CX-1.2} ${CY-15}
                  L ${CX} ${CY-17} L ${CX+1.2} ${CY-15}
                  L ${CX+2.5} ${CY-8} L ${CX+3} ${CY+2} Z`}
          fill={GOLD}/>
        {/* Filigree: stem → open diamond at tip */}
        <line x1={CX} y1={CY-17} x2={CX} y2={CY-19}
          stroke={GOLD} strokeWidth="0.9"/>
        <polygon
          points={`${CX},${CY-19} ${CX-2},${CY-21.5} ${CX},${CY-24} ${CX+2},${CY-21.5}`}
          fill="none" stroke={GOLD} strokeWidth="0.85" strokeLinejoin="round"/>
      </g>

      {/* ── Minute hand — longer, slimmer, filigree tip ── */}
      <g transform={`rotate(${minAngle} ${CX} ${CY})`}>
        <path d={`M ${CX} ${CY+6} L ${CX-2.5} ${CY+2}
                  L ${CX-2} ${CY-14} L ${CX-1} ${CY-24}
                  L ${CX} ${CY-27} L ${CX+1} ${CY-24}
                  L ${CX+2} ${CY-14} L ${CX+2.5} ${CY+2} Z`}
          fill={GOLD}/>
        {/* Filigree: stem → open diamond at tip */}
        <line x1={CX} y1={CY-27} x2={CX} y2={CY-29}
          stroke={GOLD} strokeWidth="0.8"/>
        <polygon
          points={`${CX},${CY-29} ${CX-1.5},${CY-31.5} ${CX},${CY-34} ${CX+1.5},${CY-31.5}`}
          fill="none" stroke={GOLD} strokeWidth="0.75" strokeLinejoin="round"/>
      </g>

      {/* ── Centre cap ── */}
      <circle cx={CX} cy={CY} r="3.5" fill="#6b0000" stroke={GOLD} strokeWidth="0.9"/>
      <circle cx={CX} cy={CY} r="1.5" fill={GOLD}/>
    </svg>
  )
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
export default function Sidebar({
  tabs,
  activeTab,
  setActiveTab,
  isMuted,
  toggleMute,
}: SidebarProps) {

  const handleNav = useCallback((e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    e.preventDefault()
    setActiveTab(index)
  }, [setActiveTab])

  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <motion.aside
        className="sidebar"
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Site navigation"
      >
        {/* Ink-bleed filter for sidebar edge */}
        <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
          <defs>
            <filter id="rdr2-ink-bleed">
              <feTurbulence type="fractalNoise" baseFrequency="0.015 0.05" numOctaves="4" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>
        </svg>
        <div className="sidebar-bg"/>

        <div className="sidebar-content">
          {/* Pocket watch */}
          <div className="sidebar-watch">
            <PocketWatch/>
          </div>

          {/* Nav */}
          <nav className="sidebar-nav">
            <div style={{ position: 'relative' }}>
              {/* Trail track line */}
              <div style={{
                position: 'absolute',
                left: '-14px',
                top: '8px',
                bottom: '8px',
                width: '1px',
                background: 'rgba(212,175,55,0.18)',
                pointerEvents: 'none',
              }} />
              <ul className="sidebar-nav-list">
                {tabs.map((tab, index) => (
                  <li key={tab.id} className="sidebar-nav-item">
                    {activeTab === index && (
                      <motion.div
                        layoutId="trail-marker"
                        style={{
                          position: 'absolute',
                          left: '-18px',
                          top: '50%',
                          marginTop: '-3px',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: 'rgba(212,175,55,0.9)',
                          boxShadow: '0 0 6px rgba(212,175,55,0.5)',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <a
                      href={`#${tab.id}`}
                      className={`sidebar-link${activeTab === index ? ' active' : ''}`}
                      onClick={(e) => handleNav(e, index)}
                    >
                      {tab.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

        </div>
      </motion.aside>

    </>
  )
}
