'use client'

import { useCallback } from 'react'

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
    <header className="header-nav">
      {/* Brand logo details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <a href="#about" onClick={(e) => handleNav(e, 'about')} style={{ display: 'block' }}>
          <h1 className="mono-text" style={{ fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
            Dhanush Chandra Shekar
          </h1>
        </a>
      </div>

      {/* Centered links */}
      <nav>
        <ul style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {tabs.map((tab, index) => {
            const isActive = activeTab === index
            return (
              <li key={tab.id} style={{ listStyle: 'none' }}>
                <a
                  href={`#${tab.id}`}
                  onClick={(e) => handleNav(e, tab.id)}
                  className="nav-text"
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: isActive ? 'bold' : '500',
                    color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                    borderBottom: isActive ? '1.5px solid var(--color-border)' : '1.5px solid transparent',
                    paddingBottom: '2px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {tab.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
