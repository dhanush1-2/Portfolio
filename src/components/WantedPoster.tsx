'use client'

import { motion } from 'framer-motion'

interface WantedPosterProps {
  onClose: () => void
}

const ALIASES = [
  'LLM Fine-Tuning & RAG Architecture',
  'Multi-Agent Orchestration (LangGraph)',
  'Knowledge Graph Design (Neo4j)',
  'MLOps & Production AI Pipelines',
  'Full-Stack AI (FastAPI · Next.js)',
]

export default function WantedPoster({ onClose }: WantedPosterProps) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: 'rgba(4,2,1,0.88)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
      }}
    >
      <motion.div
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="booklet-container"
        style={{
          maxWidth: '420px',
          width: '100%',
          textAlign: 'center',
          padding: '36px 32px',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: '1rem',
            color: 'rgba(26,0,0,0.45)',
            cursor: 'pointer',
            lineHeight: 1,
            padding: '4px',
          }}
          aria-label="Close"
        >
          ×
        </button>

        {/* WANTED header */}
        <div style={{
          fontFamily: 'var(--font-rdr2)',
          fontSize: '2.8rem',
          color: '#7a0c0c',
          letterSpacing: '0.28em',
          marginBottom: '10px',
        }}>
          — WANTED —
        </div>

        {/* Double rule */}
        <div style={{ borderTop: '3px double rgba(26,0,0,0.35)', margin: '0 0 10px' }} />

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.3em',
          color: 'rgba(212,175,55,0.8)',
          marginBottom: '16px',
        }}>
          DEAD OR ALIVE
        </div>

        {/* Photograph placeholder */}
        <div style={{
          width: '100px',
          height: '112px',
          border: '1px dashed rgba(26,0,0,0.3)',
          margin: '0 auto 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', color: 'rgba(26,0,0,0.35)', letterSpacing: '0.1em' }}>
            [ PHOTOGRAPH ]
          </span>
        </div>

        {/* Name */}
        <div style={{
          fontFamily: 'var(--font-header)',
          fontStyle: 'italic',
          fontSize: '1.25rem',
          color: '#1a0000',
          fontWeight: 700,
          marginBottom: '4px',
        }}>
          Dhanush Chandra Shekar
        </div>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.58rem',
          color: '#7a5a3a',
          letterSpacing: '0.1em',
          marginBottom: '16px',
        }}>
          A.K.A. The AI Engineer
        </div>

        {/* Bounty */}
        <div style={{
          fontFamily: 'var(--font-rdr2)',
          fontSize: '1.3rem',
          color: 'rgba(212,175,55,0.9)',
          letterSpacing: '0.06em',
          marginBottom: '16px',
        }}>
          $2,000,000 REWARD
        </div>

        <div style={{ borderTop: '1px solid rgba(26,0,0,0.2)', margin: '0 0 16px' }} />

        {/* Known aliases */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.58rem',
          letterSpacing: '0.18em',
          color: '#5a4a3a',
          marginBottom: '12px',
          textAlign: 'left',
        }}>
          KNOWN ALIASES:
        </div>
        <ul style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '24px' }}>
          {ALIASES.map(a => (
            <li key={a} style={{ display: 'flex', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#8b4513', flexShrink: 0 }}>—</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#302014' }}>{a}</span>
            </li>
          ))}
        </ul>

        <div style={{ borderTop: '1px solid rgba(26,0,0,0.2)', marginBottom: '20px' }} />

        {/* PDF link */}
        <a
          href="https://drive.google.com/file/d/1McFAVDDGbraRk7BkDolprtWaDEtDYxV6/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="resume-btn"
          style={{ borderColor: 'rgba(212,175,55,0.7)', color: '#1a0d06', backgroundColor: 'rgba(212,175,55,0.15)', display: 'inline-block' }}
        >
          VIEW FULL DOSSIER →
        </a>
      </motion.div>
    </div>
  )
}
