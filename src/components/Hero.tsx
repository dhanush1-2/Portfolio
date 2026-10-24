'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { SplineScene } from '@/components/ui/splite'
import { Spotlight } from '@/components/ui/spotlight'
import GatewayFlow from '@/components/ui/gateway-flow'
import { cn } from '@/lib/utils'

const ROLES = ['AI / ML Engineer', 'LLM Systems Builder', 'Data Scientist', 'MLOps Engineer']

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/dhanush1-2' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/dhanush-chandra-shekar' },
  { label: 'Email', href: 'mailto:dcshekar8@gmail.com' },
]

const STATS = [
  { value: '9', label: 'open source systems' },
  { value: '12', label: 'agent LangGraph engine' },
  { value: '98%', label: 'p95 latency cut' },
]

function useTypedRoles(words: string[]) {
  const [text, setText] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIdx]
    let delay = deleting ? 35 : 70
    if (!deleting && text === word) delay = 1800

    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true)
      } else if (deleting && text === '') {
        setDeleting(false)
        setWordIdx((wordIdx + 1) % words.length)
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)))
      }
    }, delay)
    return () => clearTimeout(timer)
  }, [text, deleting, wordIdx, words])

  return text
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
})

export default function Hero() {
  const role = useTypedRoles(ROLES)
  const robotRef = useRef<HTMLDivElement>(null)
  const [robotReady, setRobotReady] = useState(false)

  return (
    <div className="relative isolate flex w-full flex-col overflow-hidden md:h-svh md:min-h-[640px]">
      {/* LLM connections converging on the robot, edge to edge */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <GatewayFlow mode="dark" density={0.8} opacity={0.6} focusRef={robotRef} />
      </div>

      {/* Readability fades: behind the text column, under the header, and into the next section */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black/70 to-transparent md:bg-gradient-to-r md:from-black md:via-black/70 md:via-30% md:to-transparent md:to-55%" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

      <Spotlight size={520} className="from-white/[0.06] via-white/[0.03] to-transparent" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pt-32 sm:px-6 md:pt-20">
        {/* Robot: a wide canvas so the raised arms never hit the edge; its left edge fades under the text */}
        <div
          ref={robotRef}
          className="relative order-last -mx-4 h-[420px] sm:-mx-6 md:absolute md:inset-y-0 md:right-0 md:order-none md:mx-0 md:h-auto md:w-[68%] lg:w-[60%] md:[mask-image:linear-gradient(to_right,transparent,black_22%)]"
        >
          <div className={cn('h-full w-full transition-opacity duration-1000', robotReady ? 'opacity-100' : 'opacity-0')}>
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="h-full w-full"
              onLoad={() => setRobotReady(true)}
            />
          </div>
          {!robotReady && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="loader" />
            </div>
          )}
        </div>

        {/* Left content */}
        <div className="relative z-10 flex flex-1 flex-col justify-center gap-7 pb-6 md:w-[52%] md:py-10 lg:w-[48%]">
          <motion.span
            {...fadeUp(0.1)}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-neutral-400"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Open to full time roles · 2026
          </motion.span>

          <div className="flex flex-col gap-4">
            <h1 className="font-heading text-[2.6rem] font-light uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              {['Dhanush', 'Chandra', 'Shekar'].map((word, i) => (
                <span key={word} className="block overflow-hidden pb-1">
                  <motion.span
                    className="inline-block bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent"
                    initial={{ y: '120%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p {...fadeUp(0.7)} className="h-6 font-mono text-sm uppercase tracking-[0.18em] text-neutral-300 md:text-base">
              <span className="text-neutral-600">&gt; </span>
              {role}
              <span className="blink ml-1 inline-block h-4 w-[2px] translate-y-[2px] bg-neutral-300" />
            </motion.p>
          </div>

          <motion.p {...fadeUp(0.85)} className="max-w-md text-[0.95rem] font-extralight leading-relaxed text-neutral-400">
            MS Data Science at Indiana University. I build end to end intelligent systems, from Transformers trained
            from scratch in PyTorch to production MLOps pipelines and multi agent LLM architectures.
          </motion.p>

          <motion.div {...fadeUp(1)} className="flex flex-wrap items-center gap-3">
            <a
              href="https://drive.google.com/file/d/1XgYZIyry2xn8eFdSpX1H0AGen-IWaZ-q/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-neutral-100 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-black transition-colors hover:bg-white"
            >
              Resume ↗
            </a>
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group relative rounded-lg bg-black/60 px-4 py-2.5 text-xs font-light uppercase tracking-[0.2em] text-neutral-400 transition-colors hover:text-white"
              >
                <span className="pointer-events-none absolute inset-0 rounded-lg border border-white/10 transition-colors duration-300 group-hover:border-transparent" />
                <span className="glow-border" />
                <span className="relative">{link.label}</span>
              </a>
            ))}
          </motion.div>

          <motion.dl {...fadeUp(1.15)} className="mt-2 grid max-w-md grid-cols-3 gap-4 border-t border-white/[0.06] pt-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="font-heading text-2xl font-light text-white">{stat.value}</dt>
                <dd className="text-[0.65rem] uppercase leading-snug tracking-[0.15em] text-neutral-600">{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

      </div>
    </div>
  )
}
