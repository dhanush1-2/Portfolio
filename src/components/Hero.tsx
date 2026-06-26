'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import WantedPoster from '@/components/WantedPoster'

const STATS = [
  { label: 'ROLE', value: 'AI/ML Engineer · Systems Builder' },
  { label: 'EDUCATION', value: 'MS Data Science · Indiana University 2026' },
  { label: 'AFFILIATION', value: 'Kelley School of Business · Bloomington, IN' },
  { label: 'SPECIALISATION', value: 'LLMs · RAG · MLOps · Full-Stack AI' },
  { label: 'AVAILABILITY', value: 'Open to Full-Time Roles — 2026', highlight: true },
  { label: 'LANGUAGES', value: 'Python · TypeScript · C · SQL' },
]

export default function Hero() {
  const [showPoster, setShowPoster] = useState(false)

  return (
    <>
    <div className="booklet-container" style={{
      backgroundImage: `linear-gradient(rgba(241,235,217,0.76), rgba(241,235,217,0.88)), url("/assets/tumbleweed_bg.png")`,
      backgroundSize: '100% 100%, cover',
      backgroundPosition: 'center, center',
    }}>
      <div className="booklet-header">
        <h2 className="booklet-title" style={{ fontSize: '1.8rem' }}>About</h2>
        <span className="booklet-stamp" style={{ borderColor: '#5a4a3a', color: '#5a4a3a' }}>OPEN TO WORK</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', marginTop: '20px' }}>

        {/* LEFT — Bio */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#7a5a3a', letterSpacing: '0.2em' }}>[ PROFILE ]</span>
            <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '1.6rem', color: '#1a0a06', margin: '8px 0 6px' }}>
              Dhanush Chandra Shekar
            </h3>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#7a5a3a', marginBottom: '16px', letterSpacing: '0.05em', fontStyle: 'italic' }}>
              "Turning data into decisions and models into products"
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', lineHeight: '1.75', color: '#302014' }}>
              I&apos;m an AI/ML Engineer and MS Data Science student at Indiana University (graduating 2026), with a strong foundation in machine learning, NLP, and data engineering. I enjoy building end-to-end systems — from raw data pipelines to deployed AI-powered products. My work spans everything from fine-tuning LLMs and building RAG systems to production MLOps pipelines and full-stack AI applications.
            </p>
          </div>

          {/* Skill alignment bar */}
          <div className="honor-slider-container" style={{ background: 'rgba(26,0,0,0.04)', border: '1px solid rgba(26,0,0,0.18)' }}>
            <div className="honor-slider-label" style={{ color: '#5a4a3a' }}>
              <span>RESEARCH</span>
              <span style={{ color: '#7a0c0c' }}>PRODUCTION</span>
            </div>
            <div className="honor-slider-track">
              <div className="honor-slider-center" />
              <div className="honor-slider-pip" style={{ left: '78%' }}>🤠</div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: '#7a5a3a', marginTop: '8px', letterSpacing: '0.1em', textAlign: 'center' }}>
              TENDENCY: PRODUCTION-FIRST · CLEAN ARCHITECTURE · END-TO-END OWNERSHIP
            </div>
          </div>
        </div>

        {/* RIGHT — Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#7a5a3a', letterSpacing: '0.2em' }}>[ DETAILS ]</span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {STATS.map((s) => (
              <motion.div
                key={s.label}
                style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(26,0,0,0.15)', paddingBottom: '8px', gap: '16px' }}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#5a4a3a', flexShrink: 0 }}>{s.label}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: s.highlight ? '#7a0c0c' : '#1a0000', fontWeight: s.highlight ? 'bold' : 'normal', textAlign: 'right' }}>{s.value}</span>
              </motion.div>
            ))}
          </div>

          {/* Social links */}
          <div style={{ display: 'flex', gap: '14px', paddingTop: '14px', borderTop: '1px solid rgba(26,0,0,0.15)', alignItems: 'center' }}>
            {[
              {
                label: 'LinkedIn',
                href: 'https://linkedin.com/in/dhanush-chandra-shekar',
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                ),
              },
              {
                label: 'GitHub',
                href: 'https://github.com/dhanush1-2',
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                ),
              },
              {
                label: 'Email',
                href: 'mailto:dhanush12232002@gmail.com',
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                ),
              },
            ].map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                title={label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '30px',
                  height: '30px',
                  border: '1px solid rgba(26,0,0,0.22)',
                  color: '#5a4a3a',
                  transition: 'color 0.2s ease, border-color 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.color = '#7a0c0c'
                  el.style.borderColor = '#7a0c0c'
                  el.style.background = 'rgba(122,12,12,0.06)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.color = '#5a4a3a'
                  el.style.borderColor = 'rgba(26,0,0,0.22)'
                  el.style.background = 'transparent'
                }}
              >
                {icon}
              </a>
            ))}

            {/* Resume — opens Wanted Poster */}
            <button
              onClick={() => setShowPoster(true)}
              title="Resume"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '30px',
                height: '30px',
                border: '1px solid rgba(26,0,0,0.22)',
                color: '#5a4a3a',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'color 0.2s ease, border-color 0.2s ease, background 0.2s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.color = '#7a0c0c'
                el.style.borderColor = '#7a0c0c'
                el.style.background = 'rgba(122,12,12,0.06)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.color = '#5a4a3a'
                el.style.borderColor = 'rgba(26,0,0,0.22)'
                el.style.background = 'transparent'
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>

    {showPoster && <WantedPoster onClose={() => setShowPoster(false)} />}
    </>
  )
}
