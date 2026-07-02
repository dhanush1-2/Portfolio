'use client'

import { useEffect, useRef, useState } from 'react'

export default function FullPagePhysicsBall() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isHoveringBall, setIsHoveringBall] = useState(false)
  const [cursorState, setCursorState] = useState<'grab' | 'grabbing' | 'default'>('default')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Dynamic resize handler
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Ball parameters
    const radius = 30
    let x = window.innerWidth / 2
    let y = 80
    let vx = 0
    let vy = 0
    const gravity = 0.45
    const bounce = 0.74 // elasticity / bounciness
    const friction = 0.992 // air resistance
    const groundFriction = 0.96 // sliding friction

    let isDragging = false
    let lastMouseX = 0
    let lastMouseY = 0
    let clientX = 0
    let clientY = 0

    const getDistance = (mx: number, my: number) => {
      const dx = mx - x
      const dy = my - y
      return Math.sqrt(dx * dx + dy * dy)
    }

    // Capture mouse moves globally to verify hover thresholds
    const handleGlobalMouseMove = (e: MouseEvent) => {
      clientX = e.clientX
      clientY = e.clientY

      if (!isDragging) {
        const dist = getDistance(clientX, clientY)
        const hovering = dist < radius
        setIsHoveringBall(hovering)
        setCursorState(hovering ? 'grab' : 'default')
      } else {
        vx = clientX - lastMouseX
        vy = clientY - lastMouseY
        x = clientX
        y = clientY
        lastMouseX = clientX
        lastMouseY = clientY
      }
    }

    const onMouseDown = (e: MouseEvent) => {
      const dist = getDistance(e.clientX, e.clientY)
      if (dist < radius) {
        isDragging = true
        setCursorState('grabbing')
        setIsHoveringBall(true)
        vx = 0
        vy = 0
        lastMouseX = e.clientX
        lastMouseY = e.clientY
      }
    }

    const onMouseUp = () => {
      if (isDragging) {
        isDragging = false
        const dist = getDistance(clientX, clientY)
        const hovering = dist < radius
        setIsHoveringBall(hovering)
        setCursorState(hovering ? 'grab' : 'default')
      }
    }

    // Attach listeners
    window.addEventListener('mousemove', handleGlobalMouseMove)
    canvas.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    let animationId: number

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const w = window.innerWidth
      const h = window.innerHeight

      // Make sure canvas coordinates match window sizes dynamically
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }

      if (!isDragging) {
        // Gravity, inertia
        vy += gravity
        vx *= friction
        vy *= friction

        x += vx
        y += vy

        // Viewport boundaries logic
        if (y > h - radius) {
          y = h - radius
          vy = -vy * bounce
          vx *= groundFriction
        }
        if (y < radius) {
          y = radius
          vy = -vy * bounce
        }
        if (x > w - radius) {
          x = w - radius
          vx = -vx * bounce
        }
        if (x < radius) {
          x = radius
          vx = -vx * bounce
        }
      }

      // Draw the premium solid black ball
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fillStyle = '#111111'
      ctx.fill()
      ctx.lineWidth = 2.5
      ctx.strokeStyle = 'var(--color-border)'
      ctx.stroke()
      ctx.closePath()

      // Gloss shadow element
      ctx.beginPath()
      ctx.arc(x - radius * 0.25, y - radius * 0.25, radius * 0.5, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)'
      ctx.fill()
      ctx.closePath()

      animationId = requestAnimationFrame(update)
    }

    update()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleGlobalMouseMove)
      canvas.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      data-cursor={cursorState}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: isHoveringBall ? 'auto' : 'none',
        zIndex: 99990,
        background: 'transparent',
      }}
    />
  )
}
