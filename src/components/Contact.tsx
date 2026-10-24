'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Spotlight } from '@/components/ui/spotlight'
import GatewayFlow from '@/components/ui/gateway-flow'
import SectionHeader from '@/components/SectionHeader'

const CHANNELS = [
  { label: 'Direct channel', value: 'dcshekar8@gmail.com', href: 'mailto:dcshekar8@gmail.com' },
  { label: 'LinkedIn', value: 'in/dhanush-chandra-shekar', href: 'https://linkedin.com/in/dhanush-chandra-shekar' },
  { label: 'GitHub', value: 'dhanush1-2', href: 'https://github.com/dhanush1-2' },
]

// Input wrapper with the gateway hover / focus gradient border
function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.65rem] font-light uppercase tracking-[0.22em] text-neutral-400">
        {label}
      </label>
      <div className="group/field relative rounded-lg bg-black/80">
        <div className="pointer-events-none absolute inset-0 rounded-lg border border-white/[0.08] transition-colors duration-300 group-focus-within/field:border-transparent group-hover/field:border-transparent" />
        <div className="glow-border" />
        {children}
      </div>
    </div>
  )
}

const inputClass =
  'relative z-20 w-full bg-transparent px-3 py-2.5 text-sm font-extralight text-neutral-200 placeholder-neutral-700 focus:outline-none'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) return

    // Construct pre-filled mailto redirect link
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`)
    const body = encodeURIComponent(`Hello Dhanush,\n\n${message}\n\nBest regards,\n${name}\nEmail: ${email}`)
    window.location.href = `mailto:dcshekar8@gmail.com?subject=${subject}&body=${body}`

    setSent(true)
    setTimeout(() => {
      setName('')
      setEmail('')
      setMessage('')
      setSent(false)
    }, 4000)
  }

  return (
    <div>
      <SectionHeader
        index="04"
        label="get in touch"
        title="Let's Connect"
        description="Available for full time roles, research collaborations, and intelligent systems consulting. Let's build together."
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative">
          {/* Flow lines converging between the channels and the form; masked so they melt into the page */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_70%)]"
          >
            <GatewayFlow mode="dark" density={0.6} speed={0.8} className="h-full w-full" />
          </div>
          <Spotlight size={420} className="from-white/[0.06] via-white/[0.03] to-transparent" />

          <div className="relative z-10 grid gap-10 py-6 md:grid-cols-[1fr_minmax(0,440px)] md:items-center md:py-14">
            {/* Channels */}
            <div className="flex flex-col gap-8">
              <ul className="flex flex-col gap-5">
                {CHANNELS.map((c) => (
                  <li key={c.label}>
                    <span className="block font-mono text-[0.6rem] uppercase tracking-[0.25em] text-neutral-600">{c.label}</span>
                    <a
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="mt-1 inline-block break-all font-heading text-lg font-light text-neutral-200 underline decoration-white/15 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60 md:text-xl"
                    >
                      {c.value} ↗
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-x-10 gap-y-4 border-t border-white/[0.06] pt-6 font-mono text-[0.62rem] uppercase tracking-[0.2em]">
                <div>
                  <span className="block text-neutral-600">Location</span>
                  <span className="mt-1 block text-neutral-300">Bloomington, IN · USA</span>
                </div>
                <div>
                  <span className="block text-neutral-600">Status</span>
                  <span className="mt-1 flex items-center gap-2 text-emerald-300/90">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Open to full time
                  </span>
                </div>
              </div>
            </div>

            {/* Composer, styled after the gateway card */}
            <div className="group/composer relative rounded-2xl bg-black/95 p-6 shadow-2xl backdrop-blur-xl md:p-8">
              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/[0.06] transition-colors duration-500 group-hover/composer:border-transparent" />
              <div className="glow-border" />

              <form onSubmit={handleSubmit} className="relative z-20 flex flex-col gap-5">
                <div className="mb-1 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/50 font-mono text-xs text-neutral-300 shadow-inner">
                    &gt;_
                  </span>
                  <div>
                    <p className="font-heading text-lg font-light uppercase tracking-tight text-white">Send a message</p>
                    <p className="text-xs font-extralight text-neutral-500">Opens in your mail client</p>
                  </div>
                </div>

                <Field id="form-name" label="Name">
                  <input id="form-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required className={inputClass} />
                </Field>
                <Field id="form-email" label="Email">
                  <input id="form-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required className={inputClass} />
                </Field>
                <Field id="form-msg" label="Message">
                  <textarea id="form-msg" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What are we building?" required rows={4} className={`${inputClass} resize-none`} />
                </Field>

                <button
                  type="submit"
                  disabled={sent}
                  className="group/btn relative mt-1 w-full rounded-lg bg-[#0a0a0a] py-3 text-xs font-light uppercase tracking-[0.25em] text-white shadow-[0_0_20px_rgba(255,255,255,0.03)] transition-all hover:bg-[#111] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] disabled:opacity-80"
                >
                  <span className="pointer-events-none absolute inset-0 rounded-lg border border-white/10 transition-colors duration-300 group-hover/btn:border-transparent" />
                  <span className="glow-border" />
                  <span className="relative z-20">{sent ? 'Opening your mail app ✓' : 'Send message ↗'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
