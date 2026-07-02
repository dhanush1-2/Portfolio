'use client'

import { motion } from 'framer-motion'

const SKILL_GROUPS = [
  {
    category: 'Languages',
    items: ['Python', 'TypeScript', 'SQL', 'C'],
  },
  {
    category: 'AI / ML',
    items: ['PyTorch', 'LangGraph', 'HuggingFace', 'Transformers', 'RAG', 'XGBoost', 'LightGBM', 'scikit learn'],
  },
  {
    category: 'Data & Databases',
    items: ['Neo4j', 'ChromaDB', 'FAISS', 'PostgreSQL', 'Redis', 'SQLAlchemy'],
  },
  {
    category: 'Frameworks',
    items: ['FastAPI', 'Next.js', 'React', 'Node.js', 'LangChain'],
  },
  {
    category: 'DevOps & Tools',
    items: ['Docker', 'GitHub Actions', 'Prometheus', 'Supabase', 'Power BI', 'Tableau'],
  },
]

export default function Skills() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      
      {/* Header */}
      <div>
        <span className="nav-text" style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px' }}>
          tech stack
        </span>
        <h2 style={{ fontSize: '2.4rem', fontWeight: 'bold' }}>Skills</h2>
      </div>

      {/* Skill groups — each category on its own row */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {SKILL_GROUPS.map((group, gIdx) => (
          <motion.div
            key={group.category}
            className="skills-row-container"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: gIdx * 0.06, ease: 'easeOut' }}
          >
            {/* Category label — fixed width */}
            <span className="skills-category-label">
              {group.category}
            </span>

            {/* Skill pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {group.items.map((item) => (
                <span
                  key={item}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.88rem',
                    border: '1.5px solid var(--color-border)',
                    padding: '6px 16px',
                    borderRadius: '100px',
                    background: 'var(--color-parchment-cream)',
                    color: 'var(--color-text-primary)',
                    transition: 'all 0.2s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-ink-dark)'
                    e.currentTarget.style.color = 'var(--color-bg)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--color-parchment-cream)'
                    e.currentTarget.style.color = 'var(--color-text-primary)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  )
}
