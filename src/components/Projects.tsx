'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import { CircularGallery, type GalleryItem } from '@/components/ui/circular-gallery'
import GlowCard from '@/components/GlowCard'
import SectionHeader from '@/components/SectionHeader'

const PROJECTS = [
  {
    index: '01',
    status: 'DEPLOYED',
    title: 'LLM Gateway: Unified API Orchestration',
    problem: 'Managing OpenAI, Anthropic, and Gemini separately created fragmented infra with inconsistent latency and no fault isolation.',
    action: 'Built a unified FastAPI gateway with semantic caching, intelligent routing, and circuit breakers behind a single endpoint.',
    result: '98% reduction in p95 latency with zero-downtime failover and full Prometheus observability.',
    tags: ['FASTAPI', 'REDIS', 'POSTGRESQL', 'PROMETHEUS', 'DOCKER'],
    href: 'https://github.com/dhanush1-2/LLM-Gateway',
    imageUrl: '/projects/llm_gateway.png',
  },
  {
    index: '02',
    status: 'DEPLOYED',
    title: 'OrgMind: Multi Agent State Engine',
    problem: 'Teams using Slack, Notion, and GitHub had no shared memory — context was siloed and data conflicts went undetected.',
    action: 'Engineered a 12-agent LangGraph system backed by Neo4j to manage organizational state and flag conflicting transactions in real time.',
    result: 'Cross-platform state resolution across 3 integrated environments with automatic conflict detection.',
    tags: ['LANGGRAPH', 'NEO4J', 'GROQ', 'CHROMADB', 'REACT'],
    href: 'https://github.com/dhanush1-2/OrgMind',
    imageUrl: '/projects/orgmind.png',
  },
  {
    index: '03',
    status: 'DEPLOYED',
    title: 'LodeAI: Intelligent Recruitment Platform',
    problem: 'Technical hiring relied on manual code reviews, creating bottlenecks and inconsistent candidate evaluation at scale.',
    action: 'Built an AI-driven platform with VS Code integration, Docker-sandboxed code execution, and automated evaluation pipelines via Claude AI.',
    result: 'Full recruitment workflow from submission to structured scoring, fully automated end to end.',
    tags: ['NEXT.JS', 'TYPESCRIPT', 'SUPABASE', 'CLAUDE AI', 'DOCKER'],
    href: 'https://github.com/dhanush1-2/LodeAI',
    imageUrl: '/projects/lodeai.png',
  },
  {
    index: '04',
    status: 'DEPLOYED',
    title: 'GraphRAG: Knowledge Retrieval System',
    problem: 'Standard vector search over SEC filings missed multi-hop relationships between entities, reducing answer quality for complex queries.',
    action: 'Combined Neo4j graph traversal with vector embeddings to enable entity-aware, multi-hop Q&A retrieval over financial documents.',
    result: 'Outperformed vector-only baseline on context extraction across a 46-query benchmark suite.',
    tags: ['NEO4J', 'CHROMADB', 'CLAUDE API', 'SENTENCE TRANSFORMERS'],
    href: 'https://github.com/dhanush1-2/GraphRAG',
    imageUrl: '/projects/graphrag.png',
  },
  {
    index: '05',
    status: 'STABLE',
    title: 'Transformer: Neural Machine Translator',
    problem: 'Off-the-shelf NMT models are opaque — hard to study attention or customize training without abstraction layers in the way.',
    action: 'Built a complete encoder-decoder Transformer from scratch in PyTorch with custom attention, positional encoding, and training pipeline.',
    result: 'Fully functional sequence-to-sequence translation model trained end-to-end with zero external NMT dependencies.',
    tags: ['PYTORCH', 'PYTHON', 'NLP', 'CUDA'],
    href: 'https://github.com/dhanush1-2/Transformer-model',
    imageUrl: '/projects/transformer.png',
  },
  {
    index: '06',
    status: 'STABLE',
    title: 'Demand Forecasting: Production MLOps Pipeline',
    problem: 'Retail demand forecasts degraded silently over time — no retraining triggers, no drift monitoring, no deployment automation.',
    action: 'Built a full MLOps pipeline with XGBoost/LightGBM ensemble, automated retraining, drift detection, and CI/CD via GitHub Actions.',
    result: 'MAE of 0.2575 with zero-touch deployment and continuous monitoring in production.',
    tags: ['XGBOOST', 'LIGHTGBM', 'FASTAPI', 'DOCKER', 'GITHUB ACTIONS'],
    href: 'https://github.com/dhanush1-2/Demand-Forecasting',
    imageUrl: '/projects/demand_forecasting.png',
  },
  {
    index: '07',
    status: 'STABLE',
    title: 'Mental Health NLP: Discourse Classifier',
    problem: 'Mental health discourse on Reddit is nuanced and class-imbalanced — generic classifiers fail to categorize it reliably.',
    action: 'Fine-tuned DistilBERT with NLPAug data augmentation to handle severe class imbalance and improve cross-category robustness.',
    result: '72.5% F1 accuracy on a highly imbalanced multi-class mental health classification task.',
    tags: ['HUGGINGFACE', 'DISTILBERT', 'SCIKIT LEARN', 'NLPAUG'],
    href: 'https://github.com/dhanush1-2/mental-health-nlp',
    imageUrl: '/projects/mental_health_nlp.png',
  },
  {
    index: '08',
    status: 'DEPLOYED',
    title: 'InsightFlow: Star Schema ETL Pipeline',
    problem: 'Raw transactional data had no dimensional structure — BI reporting was slow and analytical queries were hard to maintain.',
    action: 'Designed a star schema and built a production ETL pipeline with PostgreSQL and SQLAlchemy, surfaced via Power BI dashboards.',
    result: 'Analytics-ready data layer enabling self-serve BI with structured dimensional queries across the full dataset.',
    tags: ['PYTHON', 'POSTGRESQL', 'SQLALCHEMY', 'POWER BI', 'ETL'],
    href: 'https://github.com/dhanush1-2/InsightFlow',
    imageUrl: '/projects/insightflow.png',
  },
  {
    index: '09',
    status: 'DEPLOYED',
    title: 'A/B Testing: Production Framework',
    problem: 'Marketing decisions were based on noisy experiment data — no rigorous statistical framework to validate conversion lifts.',
    action: 'Built an automated A/B testing framework with scipy statistical testing, ETL reporting cycles, and Tableau dashboards.',
    result: '12% conversion rate lift validated through statistically significant testing with automated reporting.',
    tags: ['PYTHON', 'SCIPY', 'STATSMODELS', 'POSTGRESQL', 'TABLEAU'],
    href: 'https://github.com/dhanush1-2/ab-testing',
    imageUrl: '/projects/ab_testing.png',
  },
]

const GALLERY_ITEMS: GalleryItem[] = PROJECTS.map((p) => ({
  id: p.index,
  image: p.imageUrl,
  title: p.title.split(':')[0],
  caption: p.title.split(':')[1]?.trim() ?? '',
  meta: p.status,
  href: p.href,
}))

const STEP = 360 / PROJECTS.length

export default function Projects() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  // Scrolling through the pinned track turns the ring from the first project to the last
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  const target = useTransform(scrollYProgress, [0, 1], [0, STEP * (PROJECTS.length - 1)])
  const rotation = useSpring(target, { stiffness: 140, damping: 28, mass: 0.5 })

  useMotionValueEvent(rotation, 'change', (r) => {
    const i = Math.min(PROJECTS.length - 1, Math.max(0, Math.round(r / STEP)))
    setActive((prev) => (prev === i ? prev : i))
  })

  // Jump the page scroll to the point where project i faces the front
  const select = (i: number) => {
    const track = trackRef.current
    if (!track) return
    const top = track.getBoundingClientRect().top + window.scrollY
    const travel = track.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + (travel * i) / (PROJECTS.length - 1), behavior: 'smooth' })
  }

  const project = PROJECTS[active]

  return (
    <div>
      <SectionHeader
        index="01"
        label="selected work"
        title="Featured Projects"
        description="Production ready architectures bridging LLMs, vector indexes, MLOps orchestration, and structured analytics. Scroll to turn the ring; every repository is open source on GitHub."
      />

      <div ref={trackRef} className="relative overflow-x-clip" style={{ height: `${PROJECTS.length * 45 + 100}vh` }}>
        <div className="sticky top-0 flex h-svh flex-col justify-center gap-6 pb-6 pt-28 sm:pt-24 lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center lg:gap-10 lg:pb-0">
          {/* Ring */}
          <div className="relative flex flex-col items-center gap-5">
            <CircularGallery items={GALLERY_ITEMS} rotation={rotation} activeIndex={active} onSelect={select} />

            <div className="flex items-center gap-4 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-neutral-500">
              <button
                type="button"
                onClick={() => select(Math.max(0, active - 1))}
                disabled={active === 0}
                aria-label="Previous project"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-neutral-300 transition-colors hover:border-white/30 disabled:opacity-30"
              >
                ←
              </button>
              <span className="min-w-[64px] text-center">
                <span className="text-neutral-200">{project.index}</span> / {String(PROJECTS.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={() => select(Math.min(PROJECTS.length - 1, active + 1))}
                disabled={active === PROJECTS.length - 1}
                aria-label="Next project"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-neutral-300 transition-colors hover:border-white/30 disabled:opacity-30"
              >
                →
              </button>
            </div>
          </div>

          {/* Details for the project in front */}
          <GlowCard className="shrink-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={project.index}
                className="relative z-20 flex flex-col gap-4 p-5 md:p-7"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <div className="flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.2em]">
                  <span className="text-neutral-500">Project {project.index}</span>
                  <span className="flex items-center gap-1.5 text-neutral-400">
                    <span className={project.status === 'DEPLOYED' ? 'h-1.5 w-1.5 rounded-full bg-emerald-400' : 'h-1.5 w-1.5 rounded-full bg-neutral-400'} />
                    {project.status}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-normal leading-snug text-white">{project.title}</h3>

                <dl className="flex flex-col gap-3 text-[0.82rem] font-extralight leading-relaxed">
                  {(['problem', 'action', 'result'] as const).map((key) => (
                    <div key={key} className={key === 'result' ? 'grid grid-cols-[64px_1fr] gap-3' : 'hidden grid-cols-[64px_1fr] gap-3 sm:grid'}>
                      <dt className={key === 'result' ? 'pt-[3px] font-mono text-[0.6rem] uppercase tracking-[0.15em] text-neutral-300' : 'pt-[3px] font-mono text-[0.6rem] uppercase tracking-[0.15em] text-neutral-600'}>
                        {key}
                      </dt>
                      <dd className={key === 'result' ? 'font-light text-neutral-200' : 'text-neutral-500'}>{project[key]}</dd>
                    </div>
                  ))}
                </dl>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.05] pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((t) => (
                      <span key={t} className="rounded-md border border-white/[0.07] bg-white/[0.02] px-2 py-0.5 font-mono text-[0.58rem] tracking-[0.08em] text-neutral-500">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-lg bg-neutral-100 px-3.5 py-2 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black transition-colors hover:bg-white"
                  >
                    GitHub ↗
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </GlowCard>
        </div>
      </div>
    </div>
  )
}
