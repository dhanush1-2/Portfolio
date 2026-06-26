'use client'

import { AnimatePresence, motion } from 'framer-motion'

interface ChapterCardProps {
  chapter: { index: number; label: string } | null
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

export default function ChapterCard({ chapter }: ChapterCardProps) {
  return (
    <AnimatePresence>
      {chapter !== null && (
        <motion.div
          key={chapter.index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 450,
            background: 'rgba(4,2,1,0.93)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          {/* Top ornament */}
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'rgba(212,175,55,0.5)',
            letterSpacing: '0.3em',
            marginBottom: '20px',
          }}>
            ────────── ◆ ──────────
          </div>

          {/* Chapter label */}
          <div style={{
            fontFamily: 'var(--font-rdr2)',
            fontSize: '0.78rem',
            color: 'rgba(212,175,55,0.7)',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            Chapter {ROMAN[chapter.index] ?? chapter.index + 1}
          </div>

          {/* Section name */}
          <div style={{
            fontFamily: 'var(--font-header)',
            fontSize: '2.4rem',
            fontStyle: 'italic',
            fontWeight: 700,
            color: 'rgba(255,252,245,0.92)',
            letterSpacing: '0.04em',
          }}>
            {chapter.label}
          </div>

          {/* Bottom ornament */}
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'rgba(212,175,55,0.5)',
            letterSpacing: '0.3em',
            marginTop: '20px',
          }}>
            ────────── ◆ ──────────
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
