'use client'

import { useEffect, useRef, useState } from 'react'

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const audio = new Audio('/assets/rdr2_theme.mp3')
    audio.loop = true
    audio.volume = 0.12
    audioRef.current = audio

    // Browsers block autoplay until first user gesture
    const start = () => {
      audio.play().catch(() => {})
    }

    document.addEventListener('click', start, { once: true })
    document.addEventListener('keydown', start, { once: true })
    document.addEventListener('wheel', start, { once: true })

    return () => {
      audio.pause()
      audio.src = ''
      document.removeEventListener('click', start)
      document.removeEventListener('keydown', start)
      document.removeEventListener('wheel', start)
    }
  }, [])

  const toggle = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !audioRef.current.muted
    setMuted(m => !m)
  }

  return (
    <button
      onClick={toggle}
      title={muted ? 'Unmute background music' : 'Mute background music'}
      style={{
        position: 'fixed',
        top: '18px',
        right: '20px',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        gap: '7px',
        background: 'rgba(8, 5, 2, 0.78)',
        border: `1px solid ${muted ? 'rgba(158,143,112,0.3)' : 'rgba(212,175,55,0.45)'}`,
        color: muted ? 'rgba(158,143,112,0.55)' : 'rgba(212,175,55,0.9)',
        padding: '7px 14px',
        cursor: 'pointer',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.58rem',
        letterSpacing: '0.16em',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        transition: 'all 0.25s ease',
        textTransform: 'uppercase',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.background = 'rgba(20,12,4,0.9)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.background = 'rgba(8,5,2,0.78)'
      }}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
        {muted ? (
          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
        ) : (
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        )}
      </svg>
      {muted ? 'Music Off' : 'Music On'}
    </button>
  )
}
