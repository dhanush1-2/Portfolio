'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [currentDate, setCurrentDate] = useState<string>('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
    setCurrentDate(new Date().toLocaleDateString('en-US', options).toUpperCase())
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) return
    
    // Construct pre-filled mailto redirect link
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`)
    const body = encodeURIComponent(`Hello Dhanush,\n\n${message}\n\nBest regards,\n${name}\nEmail: ${email}`)
    const mailtoUrl = `mailto:dhanush12232002@gmail.com?subject=${subject}&body=${body}`
    
    // Open native client
    window.location.href = mailtoUrl
    
    setSent(true)
    setTimeout(() => {
      setName('')
      setEmail('')
      setMessage('')
      setSent(false)
    }, 4000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', textAlign: 'left' }}>
      
      {/* Header */}
      <div>
        <span className="nav-text" style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px' }}>
          get in touch
        </span>
        <h2 style={{ fontSize: '2.4rem', fontWeight: 'bold' }}>Contact</h2>
      </div>

      <p className="mono-text" style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', maxWidth: '720px', lineHeight: 1.65 }}>
        Available for full time roles, research collaborations, or intelligent systems consultation. Let&apos;s build together.
      </p>

      {/* Centered highly detailed interactive message composer card */}
      <motion.div
        className="contact-envelope"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '32px',
          background: 'var(--color-parchment-cream)',
          border: '2px solid var(--color-border)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '6px 6px 0px var(--color-border)',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          
          {/* Left panel: Info */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '32px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="nav-text" style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>
                  DIRECT CHANNEL
                </span>
                <a
                  href="mailto:dhanush12232002@gmail.com"
                  className="mono-text"
                  style={{ fontSize: '1rem', fontWeight: 'bold', textDecoration: 'underline', textUnderlineOffset: '4px' }}
                >
                  dhanush12232002@gmail.com ↗
                </a>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="nav-text" style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>
                  NETWORKS
                </span>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '4px' }}>
                  <a
                    href="https://linkedin.com/in/dhanush-chandra-shekar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-pill"
                    style={{ padding: '6px 14px', fontSize: '0.72rem' }}
                  >
                    LinkedIn ↗
                  </a>
                  <a
                    href="https://github.com/dhanush1-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-pill"
                    style={{ padding: '6px 14px', fontSize: '0.72rem' }}
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="nav-text" style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>
                  LOCATION
                </span>
                <span className="mono-text" style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>
                  Bloomington, Indiana (USA)
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="nav-text" style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>
                  STATUS
                </span>
                <span className="mono-text" style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#097969' }}>
                  OPEN TO FULL TIME OPPORTUNITIES
                </span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '20px' }}>
              <span className="nav-text" style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>
                SYSTEM SYNCHRONIZED
              </span>
              <span className="mono-text" style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>
                {currentDate || 'LOADING...'}
              </span>
            </div>

          </div>

          {/* Right panel: Composer Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <span className="nav-text" style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', letterSpacing: '0.08em', display: 'block' }}>
              SEND MESSAGE
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="form-name" className="mono-text" style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Name</label>
              <input
                id="form-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                required
                style={{
                  background: 'var(--color-bg)',
                  border: '1.5px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '12px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="form-email" className="mono-text" style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Email</label>
              <input
                id="form-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                style={{
                  background: 'var(--color-bg)',
                  border: '1.5px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '12px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="form-msg" className="mono-text" style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Message</label>
              <textarea
                id="form-msg"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message details..."
                required
                rows={4}
                style={{
                  background: 'var(--color-bg)',
                  border: '1.5px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '12px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  resize: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={sent}
              style={{
                background: sent ? '#097969' : 'var(--color-ink-dark)',
                color: 'var(--color-bg)',
                border: '2px solid var(--color-border)',
                borderRadius: '10px',
                padding: '14px',
                fontFamily: 'var(--font-nav)',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: sent ? 'none' : '3px 3px 0px var(--color-border)',
                transform: sent ? 'translate(3px, 3px)' : 'none',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                if (!sent) e.currentTarget.style.transform = 'translate(-1px, -1px)'
              }}
              onMouseLeave={(e) => {
                if (!sent) e.currentTarget.style.transform = 'none'
              }}
            >
              {sent ? 'Message Dispatched Successfully!' : 'Dispatch Message ↗'}
            </button>
          </form>

        </div>
      </motion.div>

    </div>
  )
}
