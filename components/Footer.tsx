'use client'

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/vishdsgn/',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@vishdsgn',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.87a8.18 8.18 0 0 0 4.78 1.52V7a4.85 4.85 0 0 1-1.01-.31z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/vishdsgn',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="border-t py-16 px-8 md:px-16 lg:px-24"
      style={{ borderColor: 'var(--warm)', background: 'var(--cream)' }}
    >
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12">

        {/* Brand */}
        <div>
          <p
            className="text-charcoal tracking-ultra text-xs mb-1"
            style={{ letterSpacing: '0.35em', fontFamily: 'var(--font-jost)', fontWeight: 200 }}
          >
            VISH
          </p>
          <p
            className="text-stone text-xs"
            style={{ letterSpacing: '0.1em', fontFamily: 'var(--font-jost)', fontWeight: 200 }}
          >
            Interior Studio by Viktoria Shtanoprud
          </p>
        </div>

        {/* Social links — prominent */}
        <div className="flex flex-col items-center gap-6">
          <p
            className="text-stone text-xs tracking-widest uppercase"
            style={{ letterSpacing: '0.3em', fontFamily: 'var(--font-jost)', fontWeight: 200 }}
          >
            Obserwuj
          </p>
          <nav className="flex items-center gap-10" aria-label="Social media links">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-stone hover:text-charcoal transition-colors duration-500 group"
                aria-label={`VISH on ${s.label}`}
              >
                <span className="transition-transform duration-500 group-hover:scale-110">
                  {s.icon}
                </span>
                <span
                  className="text-xs tracking-widest uppercase"
                  style={{ letterSpacing: '0.2em', fontFamily: 'var(--font-jost)', fontWeight: 200, fontSize: '0.65rem' }}
                >
                  {s.label}
                </span>
              </a>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <p
          className="text-stone text-xs"
          style={{ fontFamily: 'var(--font-jost)', fontWeight: 200, letterSpacing: '0.05em' }}
        >
          © {year} VISH Interior Studio
        </p>
      </div>
    </footer>
  )
}
