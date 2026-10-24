'use client'

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/dhanush1-2' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/dhanush-chandra-shekar' },
  { label: 'Email', href: 'mailto:dcshekar8@gmail.com' },
  { label: 'Resume', href: 'https://drive.google.com/file/d/1XgYZIyry2xn8eFdSpX1H0AGen-IWaZ-q/view?usp=sharing' },
]

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden">
      {/* Gradient hairline instead of a hard border */}
      <div aria-hidden="true" className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Glow rising from the bottom edge, over a dot grid that fades out toward the top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_70%_at_50%_120%,rgba(255,255,255,0.10),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_top,black,transparent_85%)]"
      />

      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-6 pt-16 sm:px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-neutral-600">Built &amp; designed by</span>
            <span className="font-heading text-2xl font-light uppercase tracking-tight text-neutral-100">Dhanush Chandra Shekar</span>
            <span className="text-sm font-extralight text-neutral-500">AI / ML Engineer · MS Data Science, Indiana University</span>
          </div>

          <nav className="flex flex-wrap items-center gap-2">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group relative rounded-lg bg-black/60 px-3.5 py-2 text-[0.65rem] font-light uppercase tracking-[0.2em] text-neutral-400 transition-colors hover:text-white"
              >
                <span className="pointer-events-none absolute inset-0 rounded-lg border border-white/10 transition-colors duration-300 group-hover:border-transparent" />
                <span className="glow-border" />
                <span className="relative">{link.label} ↗</span>
              </a>
            ))}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-neutral-400 transition-colors hover:border-white/30 hover:text-white"
              aria-label="Back to top"
            >
              ↑
            </button>
          </nav>
        </div>

        <div className="flex flex-col justify-between gap-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-neutral-600 sm:flex-row">
          <span>© {new Date().getFullYear()} Dhanush Chandra Shekar</span>
          <span>Bloomington, IN · 39.1653° N, 86.5264° W</span>
        </div>
      </div>

      {/* Oversized wordmark sinking off the bottom edge */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <p className="-mb-[0.32em] text-center font-heading text-[19vw] font-light uppercase leading-none tracking-tighter text-transparent [background-clip:text] [-webkit-background-clip:text] bg-gradient-to-b from-white/[0.14] to-transparent">
          Dhanush
        </p>
      </div>
    </footer>
  )
}
