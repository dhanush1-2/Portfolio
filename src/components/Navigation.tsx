'use client'

import { motion } from 'framer-motion'

const NAV_ITEMS = [
  { index: '01', label: 'HOME', href: '#overview' },
  { index: '02', label: 'PROJECTS', href: '#ledger' },
  { index: '03', label: 'SKILLS', href: '#arsenal' },
  { index: '04', label: 'EXPERIENCE', href: '#chronicle' },
  { index: '05', label: 'CONTACT', href: '#dispatch' },
]

export default function Navigation() {
  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <nav className="compass-nav">
        <div className="nav-emblem">
          D.C.S<span className="dot">.</span>
        </div>
        <ul className="nav-coordinates">
          {NAV_ITEMS.map((item) => (
            <li key={item.index}>
              <a href={item.href}>
                <span className="nav-index">{item.index} //</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  )
}
