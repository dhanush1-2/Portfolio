'use client'

import { motion } from 'framer-motion'
import {
  siC,
  siClaude,
  siDocker,
  siFastapi,
  siGithubactions,
  siHuggingface,
  siJupyter,
  siLangchain,
  siLanggraph,
  siNeo4j,
  siNextdotjs,
  siNodedotjs,
  siNvidia,
  siPostgresql,
  siPrometheus,
  siPython,
  siPytorch,
  siReact,
  siRedis,
  siScikitlearn,
  siSqlalchemy,
  siSupabase,
  siTypescript,
} from 'simple-icons'
import { TechStack, type TechItem } from '@/components/ui/tech-stack'
import SectionHeader from '@/components/SectionHeader'

// Tools without a simple-icons logo get a short text mark instead
const SKILL_GROUPS: { category: string; items: TechItem[] }[] = [
  {
    category: 'AI / ML',
    items: [
      { name: 'PyTorch', path: siPytorch.path },
      { name: 'LangGraph', path: siLanggraph.path },
      { name: 'Hugging Face', path: siHuggingface.path },
      { name: 'Transformers', mark: 'TRF' },
      { name: 'RAG', mark: 'RAG' },
      { name: 'XGBoost', mark: 'XGB' },
      { name: 'LightGBM', mark: 'LGBM' },
      { name: 'scikit learn', path: siScikitlearn.path },
      { name: 'CUDA', path: siNvidia.path },
      { name: 'Claude API', path: siClaude.path },
    ],
  },
  {
    category: 'Languages',
    items: [
      { name: 'Python', path: siPython.path },
      { name: 'TypeScript', path: siTypescript.path },
      { name: 'SQL', mark: 'SQL' },
      { name: 'C', path: siC.path },
    ],
  },
  {
    category: 'Data & Databases',
    items: [
      { name: 'Neo4j', path: siNeo4j.path },
      { name: 'ChromaDB', mark: 'CHR' },
      { name: 'FAISS', mark: 'FAISS' },
      { name: 'PostgreSQL', path: siPostgresql.path },
      { name: 'Redis', path: siRedis.path },
      { name: 'SQLAlchemy', path: siSqlalchemy.path },
    ],
  },
  {
    category: 'Frameworks',
    items: [
      { name: 'FastAPI', path: siFastapi.path },
      { name: 'Next.js', path: siNextdotjs.path },
      { name: 'React', path: siReact.path },
      { name: 'Node.js', path: siNodedotjs.path },
      { name: 'LangChain', path: siLangchain.path },
    ],
  },
  {
    category: 'DevOps & Tools',
    items: [
      { name: 'Docker', path: siDocker.path },
      { name: 'GitHub Actions', path: siGithubactions.path },
      { name: 'Prometheus', path: siPrometheus.path },
      { name: 'Supabase', path: siSupabase.path },
      { name: 'Jupyter', path: siJupyter.path },
      { name: 'Power BI', mark: 'BI' },
      { name: 'Tableau', mark: 'TBL' },
    ],
  },
]

export default function Skills() {
  return (
    <div>
      <SectionHeader index="02" label="tech stack" title="Skills & Tools" />

      <div className="flex flex-col">
        {SKILL_GROUPS.map((group, gIdx) => (
          <motion.div
            key={group.category}
            className="grid items-center gap-2 border-t border-white/[0.06] py-6 last:border-b md:grid-cols-[220px_1fr] md:gap-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: gIdx * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[0.6rem] tracking-[0.2em] text-neutral-600">
                {String(gIdx + 1).padStart(2, '0')}
              </span>
              <h3 className="font-heading text-base font-light uppercase tracking-[0.12em] text-neutral-200">
                {group.category}
              </h3>
            </div>
            <TechStack items={group.items} className="justify-start py-5 md:py-6" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
