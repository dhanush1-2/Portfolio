'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SectionHeaderProps {
  label: string
  title: string
}

export default function SectionHeader({ label, title }: SectionHeaderProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      className="section-header"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="section-label">{label}</span>
      <h2 ref={ref} className={`section-title${isInView ? ' revealed' : ''}`}>
        {title}
      </h2>
      <div className="ornament-divider" aria-hidden="true">
        <span className="ornament-divider-gem">◆</span>
      </div>
    </motion.div>
  )
}
