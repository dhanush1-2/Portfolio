'use client'

import { motion } from 'framer-motion'

const PROJECTS = [
  {
    index: '01',
    status: 'DEPLOYED',
    title: 'LLM-Gateway: Unified API Orchestration',
    description:
      'Production API gateway unifying OpenAI, Anthropic, and Gemini endpoints behind a semantic caching layer. Achieves 98% p95 latency reduction through intelligent routing algorithms and circuit-breaker fault isolation protocols.',
    tags: 'FASTAPI // REDIS // POSTGRESQL // PROMETHEUS // DOCKER',
    href: 'https://github.com/dhanush1-2/LLM-Gateway',
  },
  {
    index: '02',
    status: 'DEPLOYED',
    title: 'OrgMind: Multi-Agent State Engine',
    description:
      'Engineered a 12-agent organizational memory system leveraging LangGraph and Neo4j to manage complex state logic and detect transactional data conflicts across distributed Slack, Notion, and GitHub environments.',
    tags: 'LANGGRAPH // NEO4J // GROQ // CHROMADB // REACT',
    href: 'https://github.com/dhanush1-2/OrgMind',
  },
  {
    index: '03',
    status: 'DEPLOYED',
    title: 'LodeAI: Intelligent Recruitment Platform',
    description:
      'AI-driven technical recruitment platform with VS Code integration and Docker-sandboxed code execution environment. Delivers automated candidate evaluation pipelines and structured interview workflow automation at scale.',
    tags: 'NEXT.JS // TYPESCRIPT // SUPABASE // CLAUDE AI // DOCKER',
    href: 'https://github.com/dhanush1-2/LodeAI',
  },
  {
    index: '04',
    status: 'DEPLOYED',
    title: 'GraphRAG: Knowledge Retrieval System',
    description:
      'Knowledge-graph-enhanced retrieval framework utilizing Neo4j and vector search over benchmarked SEC financial filings to optimize multi-hop Q&A context extraction accuracy and semantic precision.',
    tags: 'NEO4J // CHROMADB // CLAUDE API // SENTENCE-TRANSFORMERS',
    href: 'https://github.com/dhanush1-2/GraphRAG',
  },
  {
    index: '05',
    status: 'STABLE',
    title: 'Transformer-model: Neural Machine Translator',
    description:
      'Engineered and trained an encoder-decoder Transformer neural network model from scratch in PyTorch, establishing a complete pipeline for sequence-to-sequence translation and neural machine translation tasks.',
    tags: 'PYTORCH // PYTHON // NLP // CUDA',
    href: 'https://github.com/dhanush1-2/Transformer-model',
  },
  {
    index: '06',
    status: 'STABLE',
    title: 'Demand-Forecasting: Production MLOps Pipeline',
    description:
      'End-to-end MLOps pipeline for retail demand forecasting with automated retraining cycles, model performance drift monitoring, and CI/CD deployment via GitHub Actions. XGBoost and LightGBM ensemble architecture.',
    tags: 'XGBOOST // LIGHTGBM // FASTAPI // DOCKER // GITHUB ACTIONS',
    href: 'https://github.com/dhanush1-2/Demand-Forecasting',
  },
  {
    index: '07',
    status: 'STABLE',
    title: 'Mental-Health-NLP: Discourse Classifier',
    description:
      'Fine-tuned DistilBERT classifier categorizing mental health discourse across Reddit with 72.5% F1 accuracy. Implements augmented training protocols to improve model robustness across imbalanced class distributions.',
    tags: 'HUGGINGFACE // DISTILBERT // SCIKIT-LEARN // NLPAUG',
    href: 'https://github.com/dhanush1-2/mental-health-nlp',
  },
  {
    index: '08',
    status: 'DEPLOYED',
    title: 'InsightFlow: Star Schema ETL Pipeline',
    description:
      'Structured a production ETL pipeline leveraging PostgreSQL and SQLAlchemy with custom star schema dimensional modeling. Integrates business intelligence reporting via interactive Power BI dashboard flows.',
    tags: 'PYTHON // POSTGRESQL // SQLALCHEMY // POWER BI // ETL',
    href: 'https://github.com/dhanush1-2/InsightFlow',
  },
  {
    index: '09',
    status: 'DEPLOYED',
    title: 'ab-testing: Production A/B Testing Framework',
    description:
      'Built a rigorous statistical evaluation framework that successfully delivered a 12% conversion rate lift. Features automated ETL reporting cycles, scipy statistical testing, and dashboard reporting via Tableau.',
    tags: 'PYTHON // SCIPY // STATSMODELS // POSTGRESQL // TABLEAU',
    href: 'https://github.com/dhanush1-2/ab-testing',
  },
]

export default function Projects() {
  return (
    <div className="booklet-container" style={{
      backgroundImage: `linear-gradient(rgba(241,235,217,0.76), rgba(241,235,217,0.88)), url("/assets/ledger_bg.png")`,
      backgroundSize: '100% 100%, cover',
      backgroundPosition: 'center, center',
    }}>

      {/* Ledger Header */}
      <div className="booklet-header">
        <h2 className="booklet-title">Projects</h2>
        <span className="booklet-stamp">OPEN SOURCE</span>
      </div>

      <div style={{ position: 'relative', zIndex: 5 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#5a4a3a', marginBottom: '24px', letterSpacing: '0.1em' }}>
          * PRODUCTION-GRADE SYSTEMS · ALL REPOSITORIES OPEN SOURCE ON GITHUB
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
          {PROJECTS.map((project) => (
            <a
              key={project.index}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ledger-item-card"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', opacity: 0.8 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', fontWeight: 'bold' }}>
                  FILE // {project.index}
                </span>
                <span style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '0.6rem', 
                  border: '1px solid #1a0000', 
                  padding: '1px 5px',
                  fontWeight: 'bold',
                  transform: 'rotate(-1deg)' 
                }}>
                  {project.status}
                </span>
              </div>
              <h3 className="ledger-item-title">{project.title}</h3>
              <p className="ledger-item-desc">{project.description}</p>
              <div className="ledger-item-footer">
                <span style={{ fontSize: '0.58rem', maxWidth: '80%' }}>{project.tags}</span>
                <span style={{ textDecoration: 'underline', fontWeight: 'bold', fontSize: '0.6rem' }}>INSPECT →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
