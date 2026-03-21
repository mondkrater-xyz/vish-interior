'use client'

import { useEffect, useState } from 'react'

const links = [
  { label: 'Work', href: '#portfolio' },
  { label: 'Studio', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'bg-cream/90 backdrop-blur-sm' : 'bg-transparent'
        }`}
        style={{ fontFamily: 'var(--font-jost)' }}
      >
        <div className="flex items-center justify-between px-8 md:px-16 py-6">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-charcoal tracking-ultra text-xs font-light uppercase"
            style={{ letterSpacing: '0.35em', fontFamily: 'var(--font-jost)' }}
            aria-label="Back to top"
          >
            VISH
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="nav-link"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-px bg-charcoal transition-all duration-500 origin-center ${
                menuOpen ? 'rotate-45 translate-y-[6px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-charcoal transition-all duration-500 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-charcoal transition-all duration-500 origin-center ${
                menuOpen ? '-rotate-45 -translate-y-[6px]' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-cream flex flex-col items-center justify-center transition-all duration-700 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-10">
          {links.map((l, i) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="font-display text-4xl font-light text-charcoal italic"
              style={{
                transitionDelay: menuOpen ? `${i * 80}ms` : '0ms',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
              }}
            >
              {l.label}
            </button>
          ))}
        </nav>
        <p
          className="absolute bottom-12 text-stone text-xs tracking-widest uppercase"
          style={{ letterSpacing: '0.25em', fontFamily: 'var(--font-jost)' }}
        >
          VISH Interior Studio
        </p>
      </div>
    </>
  )
}
