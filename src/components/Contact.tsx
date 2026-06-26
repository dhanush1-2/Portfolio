'use client'

import { useState, useEffect } from 'react'

export default function Contact() {
  const [currentDate, setCurrentDate] = useState<string>('')

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
    setCurrentDate(new Date().toLocaleDateString('en-US', options).toUpperCase())
  }, [])

  return (
    <div className="telegram-card" style={{
      backgroundImage: `linear-gradient(rgba(237,230,208,0.76), rgba(237,230,208,0.95)), url("/assets/telegram_bg.png")`,
      backgroundSize: '100% 100%, cover',
      backgroundPosition: 'center, center',
    }}>

      <div className="telegram-header-stamp">
        <h2 className="telegram-header-title">Contact</h2>
        <span style={{ fontSize: '0.62rem', letterSpacing: '0.2em', opacity: 0.8, display: 'block', marginTop: '6px' }}>
          AI/ML ENGINEER · INDIANA UNIVERSITY · BLOOMINGTON, IN
        </span>
      </div>

      <div style={{ position: 'relative', zIndex: 5 }}>
        <div className="telegram-meta-grid">
          <span className="telegram-meta-label">TO:</span>
          <span>DHANUSH CHANDRA SHEKAR // DHANUSH12232002@GMAIL.COM</span>

          <span className="telegram-meta-label">FROM:</span>
          <span>YOU / VISITOR</span>

          <span className="telegram-meta-label">DATE:</span>
          <span>{currentDate || '—'}</span>

          <span className="telegram-meta-label">STATUS:</span>
          <span style={{ color: 'var(--color-brass-gold)', fontWeight: 'bold' }}>OPEN TO OPPORTUNITIES</span>
        </div>

        <div className="telegram-message-body">
          OPEN TO FULL-TIME AI/ML ENGINEERING ROLES · EXPERIENCED IN PRODUCTION-GRADE LLM SYSTEMS · MULTI-AGENT ORCHESTRATION · RAG PIPELINES · MLOPS · AND FULL-STACK AI APPLICATIONS · AVAILABLE FROM 2026 · REACH OUT BELOW
        </div>

        <div className="dispatch-cta-group" style={{ margin: '24px 0 32px' }}>
          <a href="mailto:dhanush12232002@gmail.com" className="dispatch-btn" style={{ borderColor: '#2b2015', color: '#2b2015' }}>
            Email Me
          </a>
          <a
            href="https://drive.google.com/file/d/1McFAVDDGbraRk7BkDolprtWaDEtDYxV6/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-btn"
            style={{ borderColor: 'rgba(212, 175, 55, 0.7)', color: '#1a0d06', backgroundColor: 'rgba(212, 175, 55, 0.15)' }}
          >
            View Resume
          </a>
        </div>

        <div className="dispatch-links" style={{ margin: '0', borderTop: '1px dashed rgba(43, 32, 21, 0.25)', paddingTop: '20px' }}>
          <a href="https://linkedin.com/in/dhanush-chandra-shekar" target="_blank" rel="noopener noreferrer" className="dispatch-link" style={{ color: '#5a4430', fontSize: '0.65rem' }}>
            LINKEDIN
          </a>
          <span className="dispatch-sep" style={{ color: 'rgba(43, 32, 21, 0.4)' }}>·</span>
          <a href="https://github.com/dhanush1-2" target="_blank" rel="noopener noreferrer" className="dispatch-link" style={{ color: '#5a4430', fontSize: '0.65rem' }}>
            GITHUB
          </a>
          <span className="dispatch-sep" style={{ color: 'rgba(43, 32, 21, 0.4)' }}>·</span>
          <a href="https://dhanushc.live" target="_blank" rel="noopener noreferrer" className="dispatch-link" style={{ color: '#5a4430', fontSize: '0.65rem' }}>
            PORTFOLIO
          </a>
        </div>
      </div>
    </div>
  )
}
