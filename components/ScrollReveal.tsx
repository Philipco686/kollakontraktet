'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Lägger till klassen "is-visible" på alla element med klassen "reveal"
 * när de scrollas in i vy (mjuk fade-up). Respekterar prefers-reduced-motion.
 * Körs om vid varje sidbyte så nya sidors element också fångas.
 */
export default function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal:not(.is-visible)'))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  return null
}
