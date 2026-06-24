'use client'

import { useMemo } from 'react'

interface Particle {
  id: number
  left: string
  bottom: string
  size: string
  opacity: number
  duration: string
  delay: string
  drift: string
}

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

export default function DustParticles() {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 28 }, (_, i) => {
      const r1 = seededRandom(i * 3)
      const r2 = seededRandom(i * 3 + 1)
      const r3 = seededRandom(i * 3 + 2)
      const r4 = seededRandom(i * 3 + 3)
      const r5 = seededRandom(i * 3 + 4)
      const r6 = seededRandom(i * 3 + 5)

      const r = (n: number, d = 1) => Math.round(n * 10 ** d) / 10 ** d
      return {
        id: i,
        left: `${r(r1 * 100)}%`,
        bottom: `-${r(r2 * 10 + 2)}%`,
        size: `${r(r3 * 1.4 + 0.8)}px`,
        opacity: r(r4 * 0.1 + 0.07, 3),
        duration: `${r(r5 * 25 + 18)}s`,
        delay: `${r(r6 * 18)}s`,
        drift: `${Math.round((seededRandom(i * 3 + 6) - 0.5) * 80)}px`,
      }
    })
  }, [])

  return (
    <div className="dust-particles" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="dust-particle"
          style={{
            left: p.left,
            bottom: p.bottom,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            ['--p-opacity' as string]: p.opacity,
            ['--p-drift' as string]: p.drift,
          }}
        />
      ))}
    </div>
  )
}
