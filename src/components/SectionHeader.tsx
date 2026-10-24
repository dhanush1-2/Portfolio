'use client'

import { motion } from 'framer-motion'

interface SectionHeaderProps {
  index: string
  label: string
  title: string
  description?: string
}

export default function SectionHeader({ index, label, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-12 flex flex-col gap-4">
      <span className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-neutral-500">
        <span className="text-neutral-300">{index}</span>
        <span className="h-px w-8 bg-white/20" />
        {label}
      </span>
      {/* Masked word-by-word reveal, like the gateway title. The heading is observed (the clipped words never intersect) */}
      <motion.h2
        className="font-heading text-4xl font-light uppercase tracking-tight text-white md:text-5xl"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        transition={{ staggerChildren: 0.12 }}
      >
        {title.split(' ').map((word, i) => (
          <span key={i} className="mr-[0.25em] inline-block overflow-hidden pt-1 align-bottom">
            <motion.span
              className="inline-block bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent"
              variants={{ hidden: { y: '120%' }, show: { y: '0%' } }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.h2>
      {description && (
        <p className="max-w-2xl text-sm font-extralight leading-relaxed text-neutral-500 md:text-base">
          {description}
        </p>
      )}
    </div>
  )
}
