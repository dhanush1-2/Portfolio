'use client'

import { useState, useEffect } from 'react'

const DYNAMIC_TAGS: Record<string, string> = {
  Q: 'Query optimization through indexing and profiling SQL database structures',
  W: 'Workflow automation for deploying CI/CD runs via GitHub Actions',
  E: 'End to end MLOps including pipeline stages and model drift monitoring',
  R: 'Retrieval Augmented Generation for semantic search over documents',
  T: 'Transformer architectures for training custom encoder decoder models',
  Y: 'Yield performance tracking and data health metrics telemetry',
  U: 'Unified API gateways for orchestrating multi provider LLM calls',
  I: 'Intelligent agents and LangGraph multi agent state orchestration',
  O: 'Output controls enforcing structured JSON response schemas',
  P: 'PyTorch CUDA configurations and parallel tensor operations',
  A: 'AI ML systems builder designing end to end infrastructures',
  S: 'Star schema design for dimensional modeling in analytics pipelines',
  D: 'Deep learning for training custom neural networks from scratch',
  F: 'Fine tuning LLMs utilizing targeted instruction validation',
  G: 'Graph modeling traversing Neo4j knowledge graph databases',
  H: 'Hyperparameter sweeps boosting convergence and model accuracy',
  J: 'Jupyter research for exploratory data analysis and prototyping',
  K: 'Knowledge graphs using GraphRAG for context aware retrieval',
  L: 'Latency tuning for reducing API response cycles and caching',
  Z: 'Zero shot learning for generalized classification without labels',
  X: 'XGBoost ensembles for gradient boosted prediction models',
  C: 'Clean architecture for modular testable production ready code',
  V: 'Vector databases for ChromaDB and FAISS semantic indexing',
  B: 'Bayesian modeling for probabilistic inference and uncertainty',
  N: 'Neural network optimization such as pruning and quantization',
  M: 'Machine translation sequence to sequence NLP pipelines',
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
]

export default function Hero() {
  const [nameText, setNameText] = useState('')
  const [subtitleText, setSubtitleText] = useState('')
  const [activeKey, setActiveKey] = useState<string>('D')
  const [displayedTagline, setDisplayedTagline] = useState<string>('')

  // Initial typewriter load effect for Name & Title
  useEffect(() => {
    let tName: NodeJS.Timeout
    let tSub: NodeJS.Timeout
    const name = 'Dhanush Chandra Shekar'
    const sub = 'AI ML Engineer and Systems Builder'

    let idx1 = 0
    const typeName = () => {
      if (idx1 <= name.length) {
        setNameText(name.slice(0, idx1))
        idx1++
        tName = setTimeout(typeName, 80)
      } else {
        let idx2 = 0
        const typeSub = () => {
          if (idx2 <= sub.length) {
            setSubtitleText(sub.slice(0, idx2))
            idx2++
            tSub = setTimeout(typeSub, 55)
          }
        }
        typeSub()
      }
    }
    typeName()

    return () => {
      clearTimeout(tName)
      clearTimeout(tSub)
    }
  }, [])

  // Typewriter effect on hovering letter keys
  const tagLine = DYNAMIC_TAGS[activeKey] || ''

  useEffect(() => {
    let timer: NodeJS.Timeout
    setDisplayedTagline('')
    let idx = 0
    const typeTagline = () => {
      if (idx <= tagLine.length) {
        setDisplayedTagline(tagLine.slice(0, idx))
        idx++
        timer = setTimeout(typeTagline, 35)
      }
    }
    typeTagline()
    return () => clearTimeout(timer)
  }, [activeKey, tagLine])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', textAlign: 'center', alignItems: 'center' }}>
      
      {/* Centered Intro Title */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: '4.2rem', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.03em', color: 'var(--color-text-primary)', minHeight: '4.5rem' }}>
          {nameText}
          {nameText.length < 22 && (
            <span style={{ display: 'inline-block', width: '3px', height: '0.85em', background: 'var(--color-border)', marginLeft: '4px', verticalAlign: 'middle', animation: 'blink-cursor 0.8s step-end infinite' }} />
          )}
        </h2>
        <h3 className="mono-text" style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)', marginTop: '12px', minHeight: '1.8rem' }}>
          {subtitleText}
        </h3>
      </div>

      <p style={{ fontSize: '1.15rem', lineHeight: 1.75, color: 'var(--color-text-muted)', maxWidth: '700px' }}>
        MS Data Science student at Indiana University graduating 2026. 
        I build end to end intelligent systems ranging from training models in PyTorch to deploying production MLOps architectures.
      </p>

      {/* Interactive Keyboard & Console Stack */}
      <div className="hero-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        
        {/* Tagline display console (positioned ABOVE the keyboard) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', alignItems: 'center' }}>
          <span className="nav-text" style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', letterSpacing: '0.15em' }}>
            [ active parameter ]
          </span>
          <div className="tagline-console" style={{ minHeight: '80px', padding: '16px 24px', borderRadius: '12px', width: '100%', maxWidth: '780px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="mono-text" style={{ fontSize: '1.25rem', color: 'var(--color-text-primary)', fontWeight: 'bold' }}>
              {displayedTagline}
              <span
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  width: '2.5px',
                  height: '1.1em',
                  background: 'var(--color-border)',
                  marginLeft: '6px',
                  verticalAlign: 'middle',
                  animation: 'blink-cursor 0.8s step-end infinite',
                }}
              />
            </span>
          </div>
        </div>

        {/* Keyboard layout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', alignItems: 'center' }}>
          <span className="nav-text" style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', letterSpacing: '0.15em' }}>
            hover to explore
          </span>
          
          <div className="keyboard-container">
            {KEYBOARD_ROWS.map((row, rIdx) => (
              <div key={rIdx} className="keyboard-row" style={{ paddingLeft: rIdx === 1 ? 'var(--keyboard-stagger)' : rIdx === 2 ? 'calc(var(--keyboard-stagger) * 2)' : '0px' }}>
                {row.map((key) => (
                  <div
                    key={key}
                    className={`keycap${activeKey === key ? ' pressed' : ''}`}
                    onMouseEnter={() => setActiveKey(key)}
                    onClick={() => setActiveKey(key)}
                  >
                    {key}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Social outline pills (placed below the keyboard) */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '8px' }}>
          <a
            href="https://drive.google.com/file/d/1McFAVDDGbraRk7BkDolprtWaDEtDYxV6/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="social-pill"
          >
            Resume
          </a>
          <a href="https://linkedin.com/in/dhanush-chandra-shekar" target="_blank" rel="noopener noreferrer" className="social-pill">
            LinkedIn
          </a>
          <a href="https://github.com/dhanush1-2" target="_blank" rel="noopener noreferrer" className="social-pill">
            GitHub
          </a>
          <a href="mailto:dhanush12232002@gmail.com" className="social-pill">
            Email
          </a>
        </div>

      </div>

    </div>
  )
}
