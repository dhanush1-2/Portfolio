'use client'

import { useState, useEffect } from 'react'

interface TypewriterTextProps {
  text: string
  delay?: number
  speed?: number
  className?: string
}

export default function TypewriterText({
  text,
  delay = 600,
  speed = 55,
  className,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) return

    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, speed)

    return () => clearTimeout(timer)
  }, [started, displayed, text, speed])

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && (
        <span
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: '1px',
            height: '0.85em',
            background: 'var(--color-brass-gold)',
            marginLeft: '2px',
            verticalAlign: 'middle',
            animation: 'blink-cursor 0.8s step-end infinite',
          }}
        />
      )}
    </span>
  )
}
