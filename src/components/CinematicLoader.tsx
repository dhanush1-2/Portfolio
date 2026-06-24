'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function CinematicLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (typeof sessionStorage === 'undefined') return
    if (sessionStorage.getItem('cinematic-seen')) {
      setVisible(false)
      return
    }
    const timer = setTimeout(() => {
      setVisible(false)
      sessionStorage.setItem('cinematic-seen', '1')
    }, 900)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="cinematic-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
    </AnimatePresence>
  )
}
