'use client'

import { motion } from 'framer-motion'

const ENTRIES = [
  {
    period: '2024 — PRESENT',
    role: 'Faculty Assistant in Data Science',
    org: 'Indiana University · Kelley School of Business',
    location: 'Bloomington, Indiana',
    bullets: [
      'Instruct and guide graduate-level scholars through complex data cleaning protocols, descriptive statistics, and linear regression analysis frameworks.',
      'Architect and maintain scalable academic computing labs utilizing specialized analytics frameworks and production-grade tooling.',
      'Design structured assessment workflows that translate theoretical ML concepts into applied, reproducible engineering practices.',
    ],
  },
  {
    period: '2024 — 2026',
    role: 'MS Candidate in Data Science',
    org: 'Indiana University Bloomington',
    location: 'Bloomington, Indiana',
    bullets: [
      'Pursuing Master of Science in Data Science with a core focus on Machine Learning, Natural Language Processing, and scalable Data Engineering architectures.',
      'Researching and implementing systems in advanced databases (SQL, Neo4j Graph Systems, vector databases ChromaDB/FAISS), distributed state pipelines, and MLOps principles.',
      'Maintained a solid standard of excellence, translating academic ML research into production-ready full-stack applications.',
    ],
  },
]

export default function Experience() {
  return (
    <div className="booklet-container" style={{
      backgroundImage: `linear-gradient(rgba(241,235,217,0.76), rgba(241,235,217,0.76)), url("/assets/journal_bg.png")`,
      backgroundSize: '100% 100%, cover',
      backgroundPosition: 'center, center',
    }}>

      {/* Booklet Header */}
      <div className="booklet-header">
        <h2 className="booklet-title" style={{ fontFamily: 'var(--font-header)', fontStyle: 'italic' }}>Experience</h2>
        <span className="booklet-stamp" style={{ transform: 'rotate(2.5deg)', borderColor: '#4a3a2a', color: '#4a3a2a' }}>2024 — PRESENT</span>
      </div>

      <div style={{ position: 'relative', zIndex: 5, color: '#2b1c10', textAlign: 'left' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#7a5a3a', marginBottom: '28px', maxWidth: '650px', lineHeight: '1.6', letterSpacing: '0.1em' }}>
          INDIANA UNIVERSITY · BLOOMINGTON, IN · 39.1653° N, 86.5264° W
        </p>

        {ENTRIES.map((entry, idx) => (
          <div 
            key={idx} 
            style={{ 
              borderLeft: '2px solid #5a4838', 
              paddingLeft: '24px', 
              marginLeft: '8px', 
              marginBottom: '36px',
              fontFamily: 'var(--font-header)'
            }}
          >
            {/* Timestamp & Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#7a5a3a', letterSpacing: '0.15em', fontWeight: 'bold' }}>
                {entry.period} // {entry.location.toUpperCase()}
              </span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a0d06', margin: '4px 0' }}>
                {entry.role}
              </h3>
              <span style={{ fontSize: '1rem', color: '#4a3625', fontStyle: 'italic' }}>
                {entry.org}
              </span>
            </div>

            {/* Bullets styled like diary logs */}
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {entry.bullets.map((bullet, bIdx) => (
                <li 
                  key={bIdx} 
                  style={{ 
                    fontFamily: 'var(--font-body)', 
                    fontSize: '0.92rem', 
                    lineHeight: '1.65', 
                    color: '#302014',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px'
                  }}
                >
                  <span style={{ color: '#7a5a3a', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginTop: '2px' }}>—</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Decorative journal flourish at bottom (pencil line / map coordinates) */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', opacity: 0.5 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.2em', color: '#4a3a2a' }}>
            ◆ &nbsp; INDIANA UNIVERSITY · KELLEY SCHOOL OF BUSINESS &nbsp; ◆
          </span>
        </div>
      </div>
    </div>
  )
}
