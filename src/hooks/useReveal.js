import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** One entrance: a steel or red rule draws in, and the photo settles. */
export function useReveal() {
  const location = useLocation()

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.reveal'))
    if (!nodes.length) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || typeof IntersectionObserver !== 'function') {
      nodes.forEach((node) => node.classList.add('is-in'))
      return undefined
    }

    const seen = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-in')
          seen.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    nodes.forEach((node) => {
      if (!node.classList.contains('is-in')) seen.observe(node)
    })

    return () => seen.disconnect()
  }, [location.pathname])
}
