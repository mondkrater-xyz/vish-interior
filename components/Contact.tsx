'use client'

import { useEffect, useRef, useState } from 'react'

const CONTACT_EMAIL = 'hello@vishstudio.com'
const CONTACT_LOCATION = 'Kraków, Polska'

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return ref
}

export default function Contact() {
  const headingRef = useReveal()
  const formRef = useReveal()

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Zapytanie od ${form.name}`)
    const body = encodeURIComponent(`Imię i nazwisko: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="py-32 md:py-44 px-8 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <div ref={headingRef} className="reveal mb-20">
          <p
            className="text-stone text-xs mb-4 tracking-widest uppercase"
            style={{ letterSpacing: '0.3em', fontFamily: 'var(--font-jost)', fontWeight: 200 }}
          >
            Porozmawiajmy
          </p>
          <h2
            className="font-display font-light text-charcoal mb-6 leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontStyle: 'italic' }}
          >
            Stwórzmy coś wyjątkowego
            <br />
            <span style={{ fontStyle: 'normal' }}>razem.</span>
          </h2>
          <div className="hairline" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-16 md:gap-24">

          {/* Left: info */}
          <div
            className="md:col-span-2 space-y-10"
            style={{ fontFamily: 'var(--font-jost)', fontWeight: 300 }}
          >
            <div>
              <p className="text-stone text-xs mb-2 tracking-widest uppercase" style={{ letterSpacing: '0.2em', fontWeight: 200 }}>
                Email
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-charcoal text-sm hover:text-stone transition-colors duration-400"
                style={{ letterSpacing: '0.02em' }}
              >
                {CONTACT_EMAIL}
              </a>
            </div>
            <div>
              <p className="text-stone text-xs mb-2 tracking-widest uppercase" style={{ letterSpacing: '0.2em', fontWeight: 200 }}>
                Lokalizacja
              </p>
              <p className="text-charcoal text-sm" style={{ letterSpacing: '0.02em' }}>
                {CONTACT_LOCATION}
              </p>
            </div>
            <div>
              <p className="text-stone text-xs mb-2 tracking-widest uppercase" style={{ letterSpacing: '0.2em', fontWeight: 200 }}>
                Usługi
              </p>
              <ul className="text-charcoal text-sm space-y-1" style={{ letterSpacing: '0.02em' }}>
                <li>Kompleksowe projektowanie wnętrz</li>
                <li>Planowanie przestrzeni</li>
                <li>Konsultacje projektowe</li>
                <li>Stylizacja i dobór elementów</li>
              </ul>
            </div>
          </div>

          {/* Right: form */}
          <div ref={formRef} className="reveal md:col-span-3" style={{ transitionDelay: '100ms' }}>
            {sent ? (
              <div className="flex flex-col items-start justify-center h-full py-12">
                <p className="font-display text-2xl text-charcoal italic font-light">
                  Dziękuję.
                </p>
                <p
                  className="text-stone text-sm mt-3"
                  style={{ fontFamily: 'var(--font-jost)', fontWeight: 300 }}
                >
                  Odezwę się wkrótce.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-stone text-xs mb-2 tracking-widest uppercase"
                    style={{ letterSpacing: '0.2em', fontFamily: 'var(--font-jost)', fontWeight: 200 }}
                  >
                    Imię i nazwisko
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="vish-input"
                    placeholder="Twoje imię"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-stone text-xs mb-2 tracking-widest uppercase"
                    style={{ letterSpacing: '0.2em', fontFamily: 'var(--font-jost)', fontWeight: 200 }}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="vish-input"
                    placeholder="twoj@email.com"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-stone text-xs mb-2 tracking-widest uppercase"
                    style={{ letterSpacing: '0.2em', fontFamily: 'var(--font-jost)', fontWeight: 200 }}
                  >
                    Wiadomość
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="vish-input resize-none"
                    placeholder="Opowiedz mi o swoim projekcie…"
                  />
                </div>
                <button type="submit" className="vish-btn">
                  Wyślij wiadomość
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
