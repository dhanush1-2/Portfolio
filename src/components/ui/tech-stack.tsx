'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export type TechItem = {
  name: string
  /** 24×24 SVG path, e.g. from simple-icons */
  path?: string
  /** Short text shown instead of a logo when no icon exists */
  mark?: string
}

interface TechStackProps {
  items: TechItem[]
  className?: string
}

// Fixed tilts so server and client render the same pile
const TILTS = [-8, 5, -3, 9, -6, 2, -10, 6, -2, 8, -7, 4, -5, 10, -4, 7, -9, 3]

const spring = { type: 'spring', stiffness: 320, damping: 26, mass: 0.7 } as const

/**
 * A messy pile of overlapping, tilted tool tiles. Hovering the pile fans it out; the tile under
 * the cursor straightens, lifts and shows its name. On touch screens a tap does the same.
 */
export function TechStack({ items, className }: TechStackProps) {
  const ref = useRef<HTMLUListElement>(null)
  const [spread, setSpread] = useState(false)
  const [active, setActive] = useState<number | null>(null)
  const [compact, setCompact] = useState(false)

  // Phones get smaller tiles and a tighter overlap so the resting pile stays on one row
  useEffect(() => {
    const media = window.matchMedia('(max-width: 639px)')
    const update = () => setCompact(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  // Collapse again when a touch user taps somewhere else
  useEffect(() => {
    if (!spread) return
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && !ref.current?.contains(e.target as Node)) {
        setSpread(false)
        setActive(null)
      }
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [spread])

  return (
    <ul
      ref={ref}
      aria-label="Tech stack"
      className={cn('flex flex-wrap items-center justify-center gap-y-5 py-8', className)}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setSpread(true)}
      onPointerLeave={(e) => {
        if (e.pointerType !== 'mouse') return
        setSpread(false)
        setActive(null)
      }}
    >
      {items.map((item, i) => {
        const isActive = active === i
        const tilt = TILTS[i % TILTS.length]
        return (
          <motion.li
            key={item.name}
            className="relative"
            style={{ zIndex: isActive ? 50 : i }}
            initial={false}
            animate={{
              marginLeft: i === 0 ? 0 : spread ? (compact ? 6 : 10) : compact ? -20 : -18,
              rotate: isActive ? 0 : spread ? tilt * 0.25 : tilt,
              y: isActive ? -10 : 0,
              scale: isActive ? 1.15 : 1,
            }}
            transition={spring}
          >
            <AnimatePresence>
              {isActive && (
                <motion.span
                  role="tooltip"
                  className="pointer-events-none absolute bottom-full left-1/2 mb-3 whitespace-nowrap rounded-md border border-white/10 bg-neutral-900 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-neutral-200 shadow-lg"
                  initial={{ opacity: 0, y: 4, x: '-50%' }}
                  animate={{ opacity: 1, y: 0, x: '-50%' }}
                  exit={{ opacity: 0, y: 4, x: '-50%' }}
                  transition={{ duration: 0.15 }}
                >
                  {item.name}
                </motion.span>
              )}
            </AnimatePresence>

            <button
              type="button"
              aria-label={item.name}
              onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
              onFocus={() => {
                setSpread(true)
                setActive(i)
              }}
              onBlur={() => {
                setSpread(false)
                setActive(null)
              }}
              onClick={() => {
                setSpread(true)
                setActive(i)
              }}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-lg sm:rounded-xl border bg-gradient-to-b from-neutral-900 to-black shadow-[0_8px_24px_rgba(0,0,0,0.6)] transition-colors duration-200 sm:h-14 sm:w-14 lg:h-16 lg:w-16 lg:rounded-2xl',
                isActive ? 'border-white/30' : 'border-white/10',
              )}
            >
              {item.path ? (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className={cn(
                    'h-4 w-4 transition-colors duration-200 sm:h-6 sm:w-6 lg:h-7 lg:w-7',
                    isActive ? 'fill-white' : 'fill-neutral-400',
                  )}
                >
                  <path d={item.path} />
                </svg>
              ) : (
                <span
                  aria-hidden="true"
                  className={cn(
                    'font-mono text-[0.5rem] font-medium uppercase tracking-tight transition-colors duration-200 sm:text-[0.6rem] lg:text-[0.68rem]',
                    isActive ? 'text-white' : 'text-neutral-400',
                  )}
                >
                  {item.mark ?? item.name.slice(0, 3)}
                </span>
              )}
            </button>
          </motion.li>
        )
      })}
    </ul>
  )
}
