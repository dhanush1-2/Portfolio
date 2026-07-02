'use client'

import { motion } from 'framer-motion'

const ENTRIES = [
  {
    period: '2024 to Present',
    role: 'Faculty Assistant in Data Science',
    org: 'Indiana University · Kelley School of Business',
    location: 'Bloomington, IN',
    description:
      'Instruct graduate students through data cleaning, statistics, and regression analysis. Architect scalable academic computing labs and design assessment workflows translating ML theory into reproducible engineering practices.',
    tags: ['Teaching', 'Data Science', 'Python', 'Statistics'],
  },
  {
    period: '2024 to 2026',
    role: 'MS in Data Science',
    org: 'Indiana University Bloomington',
    location: 'Bloomington, IN',
    description:
      'Focused on Machine Learning, NLP, and scalable Data Engineering. Research in graph databases, vector search, distributed pipelines, and MLOps, translating academic research into production ready applications.',
    tags: ['ML', 'NLP', 'Neo4j', 'MLOps', 'PyTorch'],
  },
]

export default function Experience() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header */}
      <div>
        <span className="nav-text" style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px' }}>
          background
        </span>
        <h2 style={{ fontSize: '2.4rem', fontWeight: 'bold' }}>Experience</h2>
      </div>

      {/* Horizontal Scrollable Timeline */}
      <div className="horizontal-timeline-container">
        
        {/* Horizontal Axis Axis Line */}
        <div className="horizontal-timeline-axis" />

        {/* Track holding the items */}
        <div className="horizontal-timeline-track">
          {ENTRIES.map((entry, idx) => (
            <div key={idx} className="horizontal-timeline-item">
              
              {/* Central axis dot */}
              <div className="horizontal-timeline-dot" />

              {/* Vertical connector to card */}
              <div className="horizontal-timeline-connector" />

              {/* Slide item card */}
              <motion.div
                className="horizontal-timeline-card"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
              >
                {/* Period & Location metadata */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                  <span className="mono-text" style={{ fontSize: '0.88rem', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                    {entry.period}
                  </span>
                  <span className="nav-text" style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', letterSpacing: '0.06em' }}>
                    {entry.location}
                  </span>
                </div>

                {/* Role Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 'bold', color: 'var(--color-text-primary)', marginBottom: '4px', lineHeight: '1.2' }}>
                      {entry.role}
                    </h3>
                    <span className="mono-text" style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
                      {entry.org}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--color-text-muted)' }}>
                    {entry.description}
                  </p>

                  {/* Tags list */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="mono-text"
                        style={{
                          fontSize: '0.72rem',
                          border: '1px solid var(--color-border)',
                          padding: '3px 12px',
                          borderRadius: '100px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          background: 'var(--color-bg)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            </div>
          ))}
        </div>

      </div>

    </div>
  )
}
