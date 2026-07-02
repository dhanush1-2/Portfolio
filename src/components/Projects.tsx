'use client'

import { motion } from 'framer-motion'

const PROJECTS = [
  {
    index: '01',
    status: 'DEPLOYED',
    title: 'LLM Gateway: Unified API Orchestration',
    description:
      'Production API gateway unifying OpenAI, Anthropic, and Gemini endpoints behind a semantic caching layer. Achieves 98% p95 latency reduction through intelligent routing algorithms and circuit breaker fault isolation protocols.',
    tags: ['FASTAPI', 'REDIS', 'POSTGRESQL', 'PROMETHEUS', 'DOCKER'],
    href: 'https://github.com/dhanush1-2/LLM-Gateway',
  },
  {
    index: '02',
    status: 'DEPLOYED',
    title: 'OrgMind: Multi Agent State Engine',
    description:
      'Engineered a 12 agent organizational memory system leveraging LangGraph and Neo4j to manage complex state logic and detect transactional data conflicts across distributed Slack, Notion, and GitHub environments.',
    tags: ['LANGGRAPH', 'NEO4J', 'GROQ', 'CHROMADB', 'REACT'],
    href: 'https://github.com/dhanush1-2/OrgMind',
  },
  {
    index: '03',
    status: 'DEPLOYED',
    title: 'LodeAI: Intelligent Recruitment Platform',
    description:
      'AI driven technical recruitment platform with VS Code integration and Docker sandboxed code execution environment. Delivers automated candidate evaluation pipelines and structured interview workflow automation at scale.',
    tags: ['NEXT.JS', 'TYPESCRIPT', 'SUPABASE', 'CLAUDE AI', 'DOCKER'],
    href: 'https://github.com/dhanush1-2/LodeAI',
  },
  {
    index: '04',
    status: 'DEPLOYED',
    title: 'GraphRAG: Knowledge Retrieval System',
    description:
      'Knowledge graph enhanced retrieval framework utilizing Neo4j and vector search over benchmarked SEC financial filings to optimize multi hop Q&A context extraction accuracy and semantic precision.',
    tags: ['NEO4J', 'CHROMADB', 'CLAUDE API', 'SENTENCE TRANSFORMERS'],
    href: 'https://github.com/dhanush1-2/GraphRAG',
  },
  {
    index: '05',
    status: 'STABLE',
    title: 'Transformer model: Neural Machine Translator',
    description:
      'Engineered and trained an encoder decoder Transformer neural network model from scratch in PyTorch, establishing a complete pipeline for sequence to sequence translation and NMT tasks.',
    tags: ['PYTORCH', 'PYTHON', 'NLP', 'CUDA'],
    href: 'https://github.com/dhanush1-2/Transformer-model',
  },
  {
    index: '06',
    status: 'STABLE',
    title: 'Demand Forecasting: Production MLOps Pipeline',
    description:
      'End to end MLOps pipeline for retail demand forecasting with automated retraining cycles, model performance drift monitoring, and CI/CD deployment via GitHub Actions. XGBoost and LightGBM ensemble architecture.',
    tags: ['XGBOOST', 'LIGHTGBM', 'FASTAPI', 'DOCKER', 'GITHUB ACTIONS'],
    href: 'https://github.com/dhanush1-2/Demand-Forecasting',
  },
  {
    index: '07',
    status: 'STABLE',
    title: 'Mental Health NLP: Discourse Classifier',
    description:
      'Fine tuned DistilBERT classifier categorizing mental health discourse across Reddit with 72.5% F1 accuracy. Implements augmented training protocols to improve model robustness across imbalanced class distributions.',
    tags: ['HUGGINGFACE', 'DISTILBERT', 'SCIKIT LEARN', 'NLPAUG'],
    href: 'https://github.com/dhanush1-2/mental-health-nlp',
  },
  {
    index: '08',
    status: 'DEPLOYED',
    title: 'InsightFlow: Star Schema ETL Pipeline',
    description:
      'Structured a production ETL pipeline leveraging PostgreSQL and SQLAlchemy with custom star schema dimensional modeling. Integrates business intelligence reporting via interactive Power BI dashboard flows.',
    tags: ['PYTHON', 'POSTGRESQL', 'SQLALCHEMY', 'POWER BI', 'ETL'],
    href: 'https://github.com/dhanush1-2/InsightFlow',
  },
  {
    index: '09',
    status: 'DEPLOYED',
    title: 'ab testing: Production A/B Testing Framework',
    description:
      'Built a rigorous statistical evaluation framework that successfully delivered a 12% conversion rate lift. Features automated ETL reporting cycles, scipy statistical testing, and dashboard reporting via Tableau.',
    tags: ['PYTHON', 'SCIPY', 'STATSMODELS', 'POSTGRESQL', 'TABLEAU'],
    href: 'https://github.com/dhanush1-2/ab-testing',
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: idx * 0.05, ease: 'easeOut' }}
          >
            {/* Header info */}
            <div>
              <div className="project-card-header">
                <span className="mono-text" style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>
                  {project.index}
                </span>
                <span className="project-arrow-badge">↗</span>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginTop: '16px', color: 'var(--color-text-primary)' }}>
                {project.title}
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.65', color: 'var(--color-text-muted)', marginTop: '12px' }}>
                {project.description}
              </p>
            </div>

            {/* Footer tags */}
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '16px', marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.tags.map((t) => (
                <span key={t} className="tag-badge">
                  {t}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
      
    </div>
  )
}
