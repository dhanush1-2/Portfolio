'use client'

import { motion } from 'framer-motion'
import GlowCard from '@/components/GlowCard'
import SectionHeader from '@/components/SectionHeader'

const ENTRIES = [
  {
    period: '2024 to Present',
    role: 'Faculty Assistant in Data Science',
    org: 'Indiana University · Kelley School of Business',
    location: 'Bloomington, IN',
    description:
      'Graduate students struggled to bridge statistical theory and production-grade code. Redesigned lab workflows around real datasets, authored reproducible Python exercises for 30+ students, and built rubrics that graded engineering practice alongside math.',
    tags: ['Teaching', 'Data Science', 'Python', 'Statistics'],
  },
  {
    period: '2024 to 2026',
    role: 'MS in Data Science',
    org: 'Indiana University Bloomington',
    location: 'Bloomington, IN',
    description:
      'Coursework alone doesn\'t produce production-ready engineers. Pushed every project toward real deployments — building graph databases, vector search pipelines, and MLOps systems that went beyond academic exercises into working open-source software.',
    tags: ['ML', 'NLP', 'Neo4j', 'MLOps', 'PyTorch'],
  },
]

export default function Experience() {
  return (
    <div>
      <SectionHeader index="03" label="background" title="Experience" />

      <ol className="relative flex flex-col gap-6 pl-8 md:pl-12">
        {/* Dotted rail, same dash rhythm as the flow paths */}
        <span
          aria-hidden="true"
          className="absolute bottom-4 left-[7px] top-4 w-px md:left-[15px]"
          style={{ backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)', backgroundSize: '1px 5px' }}
        />

        {ENTRIES.map((entry, idx) => (
          <motion.li
            key={entry.role}
            className="relative"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Node on the rail */}
            <span
              aria-hidden="true"
              className="absolute -left-8 top-8 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-white/20 bg-black md:-left-12 md:ml-2"
            >
              <span className="h-[5px] w-[5px] rounded-full bg-neutral-200 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </span>

            <GlowCard>
              <div className="relative z-20 grid gap-6 p-6 md:grid-cols-[200px_1fr] md:p-8">
                <div className="flex flex-col gap-1 font-mono text-[0.65rem] uppercase tracking-[0.2em]">
                  <span className="text-neutral-200">{entry.period}</span>
                  <span className="text-neutral-600">{entry.location}</span>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="font-heading text-xl font-normal text-white md:text-2xl">{entry.role}</h3>
                    <p className="mt-1 text-sm font-light text-neutral-500">{entry.org}</p>
                  </div>
                  <p className="max-w-3xl text-sm font-extralight leading-relaxed text-neutral-400">{entry.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {entry.tags.map((tag) => (
                      <span key={tag} className="rounded-md border border-white/[0.07] bg-white/[0.02] px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-neutral-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlowCard>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
