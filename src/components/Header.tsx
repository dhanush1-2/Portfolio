'use client'

import { useCallback } from 'react'
import { cn } from '@/lib/utils'

interface TabItem {
  label: string
  id: string
}

interface HeaderProps {
  tabs: TabItem[]
  activeTab: number
}

export default function Header({ tabs, activeTab }: HeaderProps) {
  const handleNav = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.05] bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-3 sm:flex-row sm:justify-between sm:px-6 sm:py-4">
        <a href="#about" onClick={(e) => handleNav(e, 'about')} className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] font-mono text-[0.7rem] text-neutral-200">
            DC
          </span>
          <span className="font-heading text-sm font-light uppercase tracking-[0.2em] text-neutral-200">
            <span className="hidden md:inline">Dhanush Chandra Shekar</span>
            <span className="md:hidden">Dhanush C.</span>
          </span>
        </a>

        <nav className="no-scrollbar w-full overflow-x-auto sm:w-auto">
          <ul className="mx-auto flex w-max items-center gap-1">
            {tabs.map((tab, index) => {
              const isActive = activeTab === index
              return (
                <li key={tab.id}>
                  <a
                    href={`#${tab.id}`}
                    onClick={(e) => handleNav(e, tab.id)}
                    className={cn(
                      'relative block whitespace-nowrap rounded-md px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.18em] transition-colors',
                      isActive ? 'bg-white/[0.06] text-white' : 'text-neutral-500 hover:text-neutral-200',
                    )}
                  >
                    {tab.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
