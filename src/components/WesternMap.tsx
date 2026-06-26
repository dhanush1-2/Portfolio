'use client'

import { useState } from 'react'

type PinId = 'bangalore' | 'indiana'

const PINS: Array<{ id: PinId; cx: number; cy: number; label: string; sub: string; coords: string }> = [
  { id: 'bangalore', cx: 118, cy: 138, label: 'Bangalore', sub: 'Origin · India', coords: '12°58\'N 77°35\'E' },
  { id: 'indiana', cx: 372, cy: 96, label: 'Indiana University', sub: 'Bloomington, IN · USA', coords: '39°10\'N 86°31\'W' },
]

export default function WesternMap() {
  const [hovered, setHovered] = useState<PinId | null>(null)

  return (
    <div style={{ position: 'relative', width: '100%', marginTop: '20px' }}>
      <svg
        viewBox="0 0 500 200"
        style={{ width: '100%', display: 'block', borderRadius: '1px' }}
        aria-label="Journey map from Bangalore to Indiana University"
      >
        {/* Parchment background */}
        <rect x="0" y="0" width="500" height="200" fill="#e8dfc4" />

        {/* Subtle aged texture lines */}
        {[30, 60, 90, 120, 150, 170].map(y => (
          <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="rgba(26,0,0,0.04)" strokeWidth="0.5" />
        ))}

        {/* Far mountain range */}
        <path
          d="M 0,160 L 40,110 L 80,130 L 120,90 L 160,118 L 200,105 L 240,122 L 280,98 L 320,115 L 360,88 L 400,108 L 440,95 L 480,112 L 500,100 L 500,200 L 0,200 Z"
          fill="rgba(26,0,0,0.06)"
        />

        {/* Near mountain range */}
        <path
          d="M 0,175 L 50,148 L 90,162 L 140,140 L 180,155 L 220,145 L 260,158 L 300,142 L 340,150 L 390,138 L 430,152 L 470,144 L 500,150 L 500,200 L 0,200 Z"
          fill="rgba(26,0,0,0.08)"
        />

        {/* Dotted trail connecting the two cities */}
        <path
          d={`M ${PINS[0].cx},${PINS[0].cy - 16} C 200,40 280,60 ${PINS[1].cx},${PINS[1].cy - 16}`}
          fill="none"
          stroke="rgba(26,0,0,0.28)"
          strokeWidth="1"
          strokeDasharray="5 4"
        />

        {/* Arrowhead at Indiana end */}
        <polygon
          points={`${PINS[1].cx - 4},${PINS[1].cy - 22} ${PINS[1].cx + 4},${PINS[1].cy - 22} ${PINS[1].cx},${PINS[1].cy - 16}`}
          fill="rgba(26,0,0,0.3)"
        />

        {/* Map pins */}
        {PINS.map(pin => {
          const isHov = hovered === pin.id
          const pinColor = isHov ? 'rgba(212,175,55,0.95)' : 'rgba(122,12,12,0.75)'
          return (
            <g
              key={pin.id}
              onMouseEnter={() => setHovered(pin.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Pin stem */}
              <line x1={pin.cx} y1={pin.cy} x2={pin.cx} y2={pin.cy - 18} stroke={pinColor} strokeWidth="1.5" />
              {/* Pin head */}
              <circle cx={pin.cx} cy={pin.cy - 22} r="5" fill={pinColor} />
              <circle cx={pin.cx} cy={pin.cy - 22} r="2.5" fill="rgba(255,252,245,0.7)" />
              {/* Label */}
              <text
                x={pin.cx}
                y={pin.cy + 12}
                textAnchor="middle"
                fontSize="8"
                fontFamily="var(--font-mono)"
                fill="rgba(26,0,0,0.6)"
                letterSpacing="0.5"
              >
                {pin.label.toUpperCase()}
              </text>
            </g>
          )
        })}

        {/* Map title */}
        <text x="250" y="18" textAnchor="middle" fontSize="9" fontFamily="var(--font-rdr2)" fill="rgba(26,0,0,0.4)" letterSpacing="2">
          JOURNEY LOG
        </text>

        {/* Corner tick marks (frame) */}
        <rect x="3" y="3" width="494" height="194" fill="none" stroke="rgba(26,0,0,0.25)" strokeWidth="1" />
        {[
          [3,3,14,3,3,14], [497,3,486,3,497,14],
          [3,197,14,197,3,186], [497,197,486,197,497,186],
        ].map(([x1,y1,x2,y2,x3,y3], i) => (
          <polyline key={i} points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} fill="none" stroke="rgba(26,0,0,0.35)" strokeWidth="1.5" />
        ))}
      </svg>

      {/* Hover tooltip */}
      {hovered && (() => {
        const pin = PINS.find(p => p.id === hovered)!
        const isRight = pin.id === 'indiana'
        return (
          <div style={{
            position: 'absolute',
            top: `${(pin.cy / 200) * 100 - 30}%`,
            ...(isRight ? { right: '2%' } : { left: '2%' }),
            background: 'rgba(241,235,217,0.96)',
            border: '1px solid rgba(26,0,0,0.3)',
            padding: '8px 12px',
            pointerEvents: 'none',
            zIndex: 10,
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#1a0000', fontWeight: 'bold', letterSpacing: '0.1em' }}>
              {pin.label.toUpperCase()}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: '#7a5a3a', marginTop: '2px' }}>{pin.sub}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'rgba(26,0,0,0.4)', marginTop: '3px', letterSpacing: '0.05em' }}>{pin.coords}</div>
          </div>
        )
      })()}
    </div>
  )
}
