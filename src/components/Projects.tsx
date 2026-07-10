'use client'

import { motion } from 'framer-motion'

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
    gradient: 'linear-gradient(135deg, #f2f7ff 0%, #e1edff 100%)',
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
    gradient: 'linear-gradient(135deg, #fffaf5 0%, #ffece0 100%)',
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
    gradient: 'linear-gradient(135deg, #fbf7ff 0%, #f0e1ff 100%)',
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
    gradient: 'linear-gradient(135deg, #fffbf2 0%, #ffeed1 100%)',
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
    gradient: 'linear-gradient(135deg, #f0fbf8 0%, #d8f5ee 100%)',
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
    gradient: 'linear-gradient(135deg, #fff5f5 0%, #ffe3e3 100%)',
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
    gradient: 'linear-gradient(135deg, #fffcf0 0%, #fff2d1 100%)',
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
    gradient: 'linear-gradient(135deg, #f4fbf4 0%, #ddf2dd 100%)',
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
    gradient: 'linear-gradient(135deg, #fff5f8 0%, #ffe3ed 100%)',
  },
]

export default function Projects() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {/* Header */}
      <div>
        <span className="nav-text" style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px' }}>
          selected work
        </span>
        <h2 style={{ fontSize: '2.4rem', fontWeight: 'bold' }}>Featured Projects</h2>
      </div>

      <p className="mono-text" style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', maxWidth: '720px', lineHeight: 1.65 }}>
        Production-ready architectures bridging LLMs, vector embedding indexes, MLOps orchestration, and structured analytics models. All repositories are open source on GitHub.
      </p>

      {/* Grid List */}
      <div className="projects-grid">
        {PROJECTS.map((project, idx) => (
          <motion.a
            key={project.index}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
            style={{ background: project.gradient }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: idx * 0.05, ease: 'easeOut' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <div>
                {/* Card top row */}
                <div className="project-card-header">
                  <span className="mono-text" style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: 'bold' }}>
                    {project.index}
                  </span>
                  <span className="project-arrow-badge">↗</span>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '1.35rem', fontWeight: 'bold', marginTop: '16px', color: 'var(--color-text-primary)' }}>
                  {project.title}
                </h3>

                {/* PAR case study block */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span className="mono-text par-label" style={{ color: 'var(--color-text-muted)', minWidth: '64px' }}>
                      PROBLEM
                    </span>
                    <p style={{ fontSize: '0.875rem', lineHeight: '1.55', color: 'var(--color-text-muted)', margin: 0 }}>
                      {project.problem}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span className="mono-text par-label" style={{ color: 'var(--color-text-muted)', minWidth: '64px' }}>
                      ACTION
                    </span>
                    <p style={{ fontSize: '0.875rem', lineHeight: '1.55', color: 'var(--color-text-muted)', margin: 0 }}>
                      {project.action}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span className="mono-text par-label" style={{ color: 'var(--color-text-primary)', minWidth: '64px', fontWeight: 'bold' }}>
                      RESULT
                    </span>
                    <p style={{ fontSize: '0.875rem', lineHeight: '1.55', color: 'var(--color-text-primary)', margin: 0, fontWeight: 500 }}>
                      {project.result}
                    </p>
                  </div>
                </div>
              </div>

              {/* Graphical illustration */}
              <div className="project-image-container">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="project-image"
                />
              </div>

              {/* Footer tags */}
              <div style={{ borderTop: '1.5px solid rgba(17, 17, 17, 0.08)', paddingTop: '16px', marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.tags.map((t) => (
                  <span key={t} className="tag-badge">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>

    </div>
  )
}
