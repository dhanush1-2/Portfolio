'use client'

import { motion } from 'framer-motion'
import GlowCard from '@/components/GlowCard'
import SectionHeader from '@/components/SectionHeader'
import { cn } from '@/lib/utils'

const SKILL_GROUPS = [
  {
    category: 'AI / ML',
    blurb: 'Training, fine tuning, and retrieval systems',
    items: ['PyTorch', 'LangGraph', 'HuggingFace', 'Transformers', 'RAG', 'XGBoost', 'LightGBM', 'scikit learn'],
    wide: true,
  },
  {
    category: 'Languages',
    blurb: 'Daily drivers',
    items: ['Python', 'TypeScript', 'SQL', 'C'],
  },
  {
    category: 'Data & Databases',
    blurb: 'Graph, vector, and relational stores',
    items: ['Neo4j', 'ChromaDB', 'FAISS', 'PostgreSQL', 'Redis', 'SQLAlchemy'],
  },
  {
    category: 'Frameworks',
    blurb: 'APIs and product surfaces',
    items: ['FastAPI', 'Next.js', 'React', 'Node.js', 'LangChain'],
  },
  {
    category: 'DevOps & Tools',
    blurb: 'Shipping, monitoring, reporting',
    items: ['Docker', 'GitHub Actions', 'Prometheus', 'Supabase', 'Power BI', 'Tableau'],
  },
]

export default function Skills() {
  return (
    <div>
      <SectionHeader
        index="02"
        label="tech stack"
        title="Skills & Tools"
        description="The toolkit behind the systems above, grouped by where it sits in the stack."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((group, gIdx) => (
          <motion.div
            key={group.category}
            className={cn(group.wide && 'md:col-span-2')}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: gIdx * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlowCard className="h-full">
              <div className="relative z-20 flex h-full flex-col gap-5 p-6 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-lg font-light uppercase tracking-wide text-white">{group.category}</h3>
                    <p className="mt-1 text-xs font-extralight text-neutral-500">{group.blurb}</p>
                  </div>
                  <span className="font-mono text-[0.6rem] tracking-[0.2em] text-neutral-600">
                    {String(gIdx + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 text-[0.8rem] font-light text-neutral-300 transition-colors hover:border-white/25 hover:text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
