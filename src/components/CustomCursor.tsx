'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)
  const [pulse, setPulse] = useState(false)
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'grab' | 'grabbing'>('default')

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    const onDown = () => {
      setPulse(true)
      setTimeout(() => setPulse(false), 200)
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target) {
        const cursorAttr = target.getAttribute('data-cursor') || target.closest('[data-cursor]')?.getAttribute('data-cursor')
        if (cursorAttr === 'grab' || cursorAttr === 'grabbing') {
          setCursorType(cursorAttr as any)
        } else if (
          target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.closest('a') || 
          target.closest('button') ||
          target.classList.contains('keycap') ||
          target.closest('.keycap')
        ) {
          setCursorType('pointer')
        } else {
          setCursorType('default')
        }
      }
    }

    const loop = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseover', onMouseOver)
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseover', onMouseOver)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Dynamic cursor scale and background styles based on cursorType state
  const getOuterStyles = () => {
    switch (cursorType) {
      case 'pointer':
        return {
          width: '26px',
          height: '26px',
          border: '1.5px solid var(--color-border)',
          borderRadius: '50%',
          scale: pulse ? 0.7 : 1,
          background: 'rgba(17, 17, 17, 0.05)',
        }
      case 'grab':
        return {
          width: '32px',
          height: '32px',
          border: '2px dashed var(--color-border)',
          borderRadius: '50%',
          scale: 1,
          background: 'transparent',
        }
      case 'grabbing':
        return {
          width: '14px',
          height: '14px',
          border: '2px solid var(--color-border)',
          borderRadius: '50%',
          scale: 0.85,
          background: 'var(--color-border)', // solid fill on grab
        }
      default:
        return {
          width: '18px',
          height: '18px',
          border: '1.5px solid var(--color-border)',
          borderRadius: '50%',
          scale: pulse ? 0.7 : 1,
          background: 'transparent',
        }
    }
  }

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
      }}
    >
      {/* Outer ring */}
      <div
        style={{
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.15s ease, height 0.15s ease, background-color 0.15s ease, border 0.15s ease',
          transformOrigin: 'center',
          ...getOuterStyles(),
        }}
      />

      {/* Center dot — hidden during grabbing for clean grab indicator */}
      {cursorType !== 'grabbing' && (
        <div
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            background: 'var(--color-border)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
    </div>
  )
}
