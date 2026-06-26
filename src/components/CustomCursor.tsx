'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    const onDown = () => {
      setPulse(true)
      setTimeout(() => setPulse(false), 400)
    }

    const loop = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onDown)
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 99997,
        pointerEvents: 'none',
        willChange: 'transform',
        filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.8))',
      }}
    >
      {/* Outer ring — burnt orange, always visible */}
      <div style={{
        position: 'absolute',
        width: '32px',
        height: '32px',
        border: '2px solid rgba(210,80,45,0.95)',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
      }} />

      {/* Crosshair — top */}
      <div style={{ position: 'absolute', width: '2px', height: '8px', background: 'rgba(210,80,45,0.95)', transform: 'translate(-50%, -50%) translateY(-13px)' }} />
      {/* Crosshair — bottom */}
      <div style={{ position: 'absolute', width: '2px', height: '8px', background: 'rgba(210,80,45,0.95)', transform: 'translate(-50%, -50%) translateY(5px)' }} />
      {/* Crosshair — left */}
      <div style={{ position: 'absolute', width: '8px', height: '2px', background: 'rgba(210,80,45,0.95)', transform: 'translate(-50%, -50%) translateX(-13px)' }} />
      {/* Crosshair — right */}
      <div style={{ position: 'absolute', width: '8px', height: '2px', background: 'rgba(210,80,45,0.95)', transform: 'translate(-50%, -50%) translateX(5px)' }} />

      {/* Center dot — white for contrast */}
      <div style={{
        position: 'absolute',
        width: '4px',
        height: '4px',
        background: '#ffffff',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
      }} />

      {/* Dead Eye pulse ring — on click */}
      {pulse && (
        <div style={{
          position: 'absolute',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '2px solid rgba(139,0,0,0.9)',
          transform: 'translate(-50%, -50%)',
          animation: 'dead-eye-pulse 0.4s ease-out forwards',
        }} />
      )}
    </div>
  )
}
