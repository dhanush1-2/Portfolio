'use client'

import { motion } from 'framer-motion'

interface SectionHeaderProps {
  label: string
  title: string
}

export default function SectionHeader({ label, title }: SectionHeaderProps) {
  return (
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '32px' }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <span className="nav-text" style={{ fontSize: '0.62rem', color: 'var(--color-text-muted)', letterSpacing: '0.15em' }}>
        {label}
      </span>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
        {title}
      </h2>
      <div style={{ width: '32px', height: '1.5px', background: 'var(--color-border)', marginTop: '4px' }} />
    </motion.div>
  )
}
