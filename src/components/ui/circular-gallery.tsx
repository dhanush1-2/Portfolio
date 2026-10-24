'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useTransform, type MotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

export type GalleryItem = {
  id: string
  image: string
  title: string
  caption: string
  meta: string
  href: string
}

interface CircularGalleryProps {
  items: GalleryItem[]
  /** Ring rotation in degrees; item i faces the viewer at i * (360 / items.length) */
  rotation: MotionValue<number>
  activeIndex: number
  onSelect: (index: number) => void
  className?: string
}

type RingSize = { cardW: number; cardH: number; radius: number }

function measure(width: number, count: number): RingSize {
  const cardW = Math.round(Math.min(340, Math.max(210, width * 0.4)))
  const cardH = Math.round(cardW * 1.32)
  // Radius at which neighbouring cards just touch, plus a small gap
  const radius = Math.round(cardW / 2 / Math.tan(Math.PI / count) + 28)
  return { cardW, cardH, radius }
}

// Signed angle between a card and the front of the ring, in [-180, 180]
function facing(cardAngle: number, rotation: number) {
  return ((((cardAngle - rotation) % 360) + 540) % 360) - 180
}

function RingCard({
  item,
  index,
  step,
  size,
  rotation,
  active,
  onSelect,
}: {
  item: GalleryItem
  index: number
  step: number
  size: RingSize
  rotation: MotionValue<number>
  active: boolean
  onSelect: (index: number) => void
}) {
  const angle = index * step
  // Cards dim and blur as they turn away; the back of the ring stays faintly visible through the front
  const opacity = useTransform(rotation, (r) => {
    const d = Math.abs(facing(angle, r))
    return d < 90 ? 1 - (d / 90) * 0.55 : 0.45 - ((d - 90) / 90) * 0.3
  })
  const filter = useTransform(rotation, (r) => {
    const d = Math.abs(facing(angle, r))
    return `brightness(${(1 - Math.min(d, 150) / 220).toFixed(3)})`
  })

  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={active ? `${item.title}, open on GitHub` : `Show ${item.title}`}
      onClick={(e) => {
        if (!active) {
          e.preventDefault()
          onSelect(index)
        }
      }}
      className={cn(
        'group absolute left-1/2 top-1/2 block overflow-hidden rounded-2xl border bg-black [backface-visibility:visible]',
        active ? 'is-active border-white/20 shadow-[0_0_60px_rgba(255,255,255,0.08)]' : 'border-white/[0.07]',
      )}
      style={{
        width: size.cardW,
        height: size.cardH,
        marginLeft: -size.cardW / 2,
        marginTop: -size.cardH / 2,
        transform: `rotateY(${angle}deg) translateZ(${size.radius}px)`,
        opacity,
        filter,
      }}
    >
      <Image
        src={item.image}
        alt=""
        fill
        sizes="320px"
        className="project-art object-cover"
        priority={index < 3}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
      <div className="glow-border" />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-neutral-400">
        <span>{String(index + 1).padStart(2, '0')}</span>
        <span>{item.meta}</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5">
        <h3 className="font-heading text-lg font-normal leading-tight text-white">{item.title}</h3>
        <p className="line-clamp-2 text-xs font-extralight leading-relaxed text-neutral-400">{item.caption}</p>
      </div>
    </motion.a>
  )
}

export function CircularGallery({ items, rotation, activeIndex, onSelect, className }: CircularGalleryProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<RingSize>(() => measure(1024, items.length))
  const step = 360 / items.length
  const ringTransform = useTransform(rotation, (r) => `translateZ(${-size.radius}px) rotateY(${-r}deg)`)

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const update = () => setSize(measure(el.clientWidth, items.length))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [items.length])

  return (
    <div
      ref={stageRef}
      className={cn('relative w-full [perspective:1800px]', className)}
      style={{ height: size.cardH + 40 }}
    >
      <motion.div className="absolute inset-0 [transform-style:preserve-3d]" style={{ transform: ringTransform }}>
        {items.map((item, i) => (
          <RingCard
            key={item.id}
            item={item}
            index={i}
            step={step}
            size={size}
            rotation={rotation}
            active={i === activeIndex}
            onSelect={onSelect}
          />
        ))}
      </motion.div>
    </div>
  )
}
