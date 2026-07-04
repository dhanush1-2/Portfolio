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
    imageUrl: '/projects/llm_gateway.png',
    gradient: 'linear-gradient(135deg, #f2f7ff 0%, #e1edff 100%)',
  },
  {
    index: '02',
    status: 'DEPLOYED',
    title: 'OrgMind: Multi Agent State Engine',
    description:
      'Engineered a 12 agent organizational memory system leveraging LangGraph and Neo4j to manage complex state logic and detect transactional data conflicts across distributed Slack, Notion, and GitHub environments.',
    tags: ['LANGGRAPH', 'NEO4J', 'GROQ', 'CHROMADB', 'REACT'],
    href: 'https://github.com/dhanush1-2/OrgMind',
    imageUrl: '/projects/orgmind.png',
    gradient: 'linear-gradient(135deg, #fffaf5 0%, #ffece0 100%)',
  },
  {
    index: '03',
    status: 'DEPLOYED',
    title: 'LodeAI: Intelligent Recruitment Platform',
    description:
      'AI driven technical recruitment platform with VS Code integration and Docker sandboxed code execution environment. Delivers automated candidate evaluation pipelines and structured interview workflow automation at scale.',
    tags: ['NEXT.JS', 'TYPESCRIPT', 'SUPABASE', 'CLAUDE AI', 'DOCKER'],
    href: 'https://github.com/dhanush1-2/LodeAI',
    imageUrl: '/projects/lodeai.png',
    gradient: 'linear-gradient(135deg, #fbf7ff 0%, #f0e1ff 100%)',
  },
  {
    index: '04',
    status: 'DEPLOYED',
    title: 'GraphRAG: Knowledge Retrieval System',
    description:
      'Knowledge graph enhanced retrieval framework utilizing Neo4j and vector search over benchmarked SEC financial filings to optimize multi hop Q&A context extraction accuracy and semantic precision.',
    tags: ['NEO4J', 'CHROMADB', 'CLAUDE API', 'SENTENCE TRANSFORMERS'],
    href: 'https://github.com/dhanush1-2/GraphRAG',
    imageUrl: '/projects/graphrag.png',
    gradient: 'linear-gradient(135deg, #fffbf2 0%, #ffeed1 100%)',
  },
  {
    index: '05',
    status: 'STABLE',
    title: 'Transformer model: Neural Machine Translator',
    description:
      'Engineered and trained an encoder decoder Transformer neural network model from scratch in PyTorch, establishing a complete pipeline for sequence to sequence translation and NMT tasks.',
    tags: ['PYTORCH', 'PYTHON', 'NLP', 'CUDA'],
    href: 'https://github.com/dhanush1-2/Transformer-model',
    imageUrl: '/projects/transformer.png',
    gradient: 'linear-gradient(135deg, #f0fbf8 0%, #d8f5ee 100%)',
  },
  {
    index: '06',
    status: 'STABLE',
    title: 'Demand Forecasting: Production MLOps Pipeline',
    description:
      'End to end MLOps pipeline for retail demand forecasting with automated retraining cycles, model performance drift monitoring, and CI/CD deployment via GitHub Actions. XGBoost and LightGBM ensemble architecture.',
    tags: ['XGBOOST', 'LIGHTGBM', 'FASTAPI', 'DOCKER', 'GITHUB ACTIONS'],
    href: 'https://github.com/dhanush1-2/Demand-Forecasting',
    imageUrl: '/projects/demand_forecasting.png',
    gradient: 'linear-gradient(135deg, #fff5f5 0%, #ffe3e3 100%)',
  },
  {
    index: '07',
    status: 'STABLE',
    title: 'Mental Health NLP: Discourse Classifier',
    description:
      'Fine tuned DistilBERT classifier categorizing mental health discourse across Reddit with 72.5% F1 accuracy. Implements augmented training protocols to improve model robustness across imbalanced class distributions.',
    tags: ['HUGGINGFACE', 'DISTILBERT', 'SCIKIT LEARN', 'NLPAUG'],
    href: 'https://github.com/dhanush1-2/mental-health-nlp',
    imageUrl: '/projects/mental_health_nlp.png',
    gradient: 'linear-gradient(135deg, #fffcf0 0%, #fff2d1 100%)',
  },
  {
    index: '08',
    status: 'DEPLOYED',
    title: 'InsightFlow: Star Schema ETL Pipeline',
    description:
      'Structured a production ETL pipeline leveraging PostgreSQL and SQLAlchemy with custom star schema dimensional modeling. Integrates business intelligence reporting via interactive Power BI dashboard flows.',
    tags: ['PYTHON', 'POSTGRESQL', 'SQLALCHEMY', 'POWER BI', 'ETL'],
    href: 'https://github.com/dhanush1-2/InsightFlow',
    imageUrl: '/projects/insightflow.png',
    gradient: 'linear-gradient(135deg, #f4fbf4 0%, #ddf2dd 100%)',
  },
  {
    index: '09',
    status: 'DEPLOYED',
    title: 'ab testing: Production A/B Testing Framework',
    description:
      'Built a rigorous statistical evaluation framework that successfully delivered a 12% conversion rate lift. Features automated ETL reporting cycles, scipy statistical testing, and dashboard reporting via Tableau.',
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
            {/* Header info */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <div>
                <div className="project-card-header">
                  <span className="mono-text" style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: 'bold' }}>
                    {project.index}
                  </span>
                  <span className="project-arrow-badge">↗</span>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 'bold', marginTop: '16px', color: 'var(--color-text-primary)' }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--color-text-muted)', marginTop: '12px' }}>
                  {project.description}
                </p>
              </div>

              {/* Graphical illustration nested inside */}
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
