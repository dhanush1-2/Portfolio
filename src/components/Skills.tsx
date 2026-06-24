'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import audio from '@/utils/audio'

type SkillAttribute = { name: string; value: number }
type CoreSkill = {
  id: number
  name: string
  shortName: string
  icon: string
  attributes: SkillAttribute[]
  technologies: string[]
}

const CORES: CoreSkill[] = [
  {
    id: 0,
    name: 'Languages & Core',
    shortName: 'LANGUAGES',
    icon: '💻',
    attributes: [
      { name: 'Python Engineering', value: 96 },
      { name: 'TypeScript & Web Logic', value: 90 },
      { name: 'SQL Query Performance', value: 93 },
      { name: 'Systems Concepts (C)', value: 85 },
    ],
    technologies: [
      'Python — OOP, scripting, profiling',
      'TypeScript — React, Next.js, Node',
      'SQL — complex joins, index tuning',
      'C — system-level, memory management',
    ],
  },
  {
    id: 1,
    name: 'AI & Machine Learning',
    shortName: 'AI / ML',
    icon: '🧠',
    attributes: [
      { name: 'LLM Fine-Tuning', value: 94 },
      { name: 'Semantic Retrieval (RAG)', value: 96 },
      { name: 'Knowledge Graph Design', value: 95 },
      { name: 'MLOps & Drift Monitoring', value: 90 },
    ],
    technologies: [
      'LangChain & LangGraph workflows',
      'RAG pipelines — ChromaDB, FAISS',
      'PyTorch & TensorFlow training',
      'HuggingFace fine-tuning',
      'scikit-learn, XGBoost, LightGBM',
    ],
  },
  {
    id: 2,
    name: 'Data & Databases',
    shortName: 'DATABASES',
    icon: '🗄️',
    attributes: [
      { name: 'Graph DB Traversal (Neo4j)', value: 95 },
      { name: 'Vector Query Processing', value: 92 },
      { name: 'Caching & Latency Tuning', value: 90 },
      { name: 'Distributed Persistence', value: 91 },
    ],
    technologies: [
      'Neo4j — graph modelling & Cypher',
      'ChromaDB / FAISS vector stores',
      'PostgreSQL — relational design',
      'Redis — caching & message queues',
      'Supabase cloud infrastructure',
    ],
  },
  {
    id: 3,
    name: 'Web & Deployment',
    shortName: 'DEPLOYMENT',
    icon: '🚀',
    attributes: [
      { name: 'API Design & Speed', value: 94 },
      { name: 'Container Orchestration', value: 90 },
      { name: 'CI/CD Automation', value: 92 },
      { name: 'Telemetry & Monitoring', value: 85 },
    ],
    technologies: [
      'FastAPI & Next.js frameworks',
      'Docker container architecture',
      'GitHub Actions CI/CD pipelines',
      'Prometheus metric monitoring',
      'Streamlit & Flask applications',
    ],
  },
]

const GRADE = (v: number) =>
  v >= 95 ? 'MASTER' : v >= 90 ? 'EXPERT' : v >= 85 ? 'PROFICIENT' : 'SKILLED'

export default function Skills() {
  const [selected, setSelected] = useState(0)
  const active = CORES[selected]

  return (
    <div
      className="booklet-container"
      style={{
        backgroundImage: `linear-gradient(rgba(241,235,217,0.76), rgba(241,235,217,0.88)), url("/assets/tumbleweed_bg.png")`,
        backgroundSize: '100% 100%, cover',
        backgroundPosition: 'center, center',
        position: 'relative',
        minHeight: '520px',
      }}
    >
      {/* ── Journal header ── */}
      <div style={{ marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid rgba(26,0,0,0.2)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: '#7a5a3a', letterSpacing: '0.22em', display: 'block', marginBottom: '8px' }}>
          FIELD NOTES — TECHNICAL PROFICIENCY LOG
        </span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '1.8rem', color: '#1a0a06', fontStyle: 'italic', fontWeight: 700 }}>
            Technical Skills
          </h2>
          <span className="booklet-stamp" style={{ borderColor: '#5a4a3a', color: '#5a4a3a', transform: 'rotate(1.5deg)' }}>
            PROFICIENCY
          </span>
        </div>
      </div>

      {/* ── Tab row ── */}
      <div style={{ display: 'flex', borderBottom: '2px solid rgba(26,0,0,0.22)', marginBottom: '26px', gap: '0' }}>
        {CORES.map((core, idx) => (
          <button
            key={core.id}
            onClick={() => { audio.playHover(); setSelected(idx) }}
            style={{
              flex: 1,
              background: selected === idx ? 'rgba(122,12,12,0.06)' : 'transparent',
              border: 'none',
              borderLeft: idx > 0 ? '1px solid rgba(26,0,0,0.15)' : 'none',
              borderBottom: selected === idx ? '2px solid #7a0c0c' : '2px solid transparent',
              padding: '10px 8px 12px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '5px',
              marginBottom: '-2px',
              transition: 'all 0.2s ease',
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>{core.icon}</span>
            <span style={{
              fontFamily: 'var(--font-rdr2)',
              fontSize: '0.52rem',
              letterSpacing: '0.08em',
              color: selected === idx ? '#7a0c0c' : '#7a5a3a',
              fontWeight: selected === idx ? 'bold' : 'normal',
              transition: 'color 0.2s ease',
            }}>
              {core.shortName}
            </span>
          </button>
        ))}
      </div>

      {/* ── Animated content panel ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
        >
          {/* Section title */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '1.15rem', color: '#1a0000', fontStyle: 'italic' }}>
              {active.name}
            </h3>
            <div style={{ marginTop: '6px', height: '1px', background: 'rgba(26,0,0,0.18)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '36px' }}>

            {/* ── Left: proficiency bars ── */}
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: '#7a5a3a', letterSpacing: '0.18em', display: 'block', marginBottom: '18px' }}>
                — PROFICIENCY RATINGS
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {active.attributes.map((attr, idx) => (
                  <div key={attr.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#302014' }}>
                        {attr.name}
                      </span>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', color: '#7a0c0c', letterSpacing: '0.08em' }}>
                          {GRADE(attr.value)}
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#5a4a3a' }}>
                          {attr.value}
                        </span>
                      </div>
                    </div>
                    <div style={{
                      height: '7px',
                      background: 'rgba(26,0,0,0.08)',
                      border: '1px solid rgba(26,0,0,0.18)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      <motion.div
                        style={{ height: '100%', background: 'linear-gradient(to right, #5a1a08, #8b4513, #a05020)', originX: 0 }}
                        initial={{ width: 0 }}
                        animate={{ width: `${attr.value}%` }}
                        transition={{ duration: 0.55, delay: idx * 0.08, ease: 'easeOut' }}
                      />
                      {/* tick marks */}
                      {[25, 50, 75].map(tick => (
                        <div key={tick} style={{
                          position: 'absolute',
                          left: `${tick}%`,
                          top: 0,
                          bottom: 0,
                          width: '1px',
                          background: 'rgba(26,0,0,0.12)',
                        }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: field observations ── */}
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: '#7a5a3a', letterSpacing: '0.18em', display: 'block', marginBottom: '18px' }}>
                — FIELD OBSERVATIONS
              </span>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {active.technologies.map((tech, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.06 }}
                    style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#8b4513', flexShrink: 0, marginTop: '2px' }}>—</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.87rem', color: '#302014', lineHeight: '1.55' }}>{tech}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Journal footer notation ── */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '28px',
        paddingTop: '12px',
        borderTop: '1px solid rgba(26,0,0,0.14)',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(26,0,0,0.35)', letterSpacing: '0.12em' }}>
          § {String(selected + 1).padStart(2, '0')} / {String(CORES.length).padStart(2, '0')}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(26,0,0,0.35)', letterSpacing: '0.1em' }}>
          {active.icon}&nbsp;&nbsp;{active.name.toUpperCase()}
        </span>
      </div>
    </div>
  )
}
