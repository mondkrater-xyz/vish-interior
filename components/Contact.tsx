'use client'

import { useEffect, useRef, useState } from 'react'

/*
 * CONTACT DETAILS
 * Replace with Viktoria's actual email and location.
 */
const CONTACT_EMAIL = 'hello@vishstudio.com'
const CONTACT_LOCATION = 'Warsaw, Poland'

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
    /*
     * TODO: Wire up to your email service.
     * Options: Resend, Formspree, EmailJS, or a Next.js API route.
     * For now, opens the user's mail client as a fallback.
     */
    const subject = encodeURIComponent(`Inquiry from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
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
            Get in Touch
          </p>
          <h2
            className="font-display font-light text-charcoal mb-6 leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontStyle: 'italic' }}
          >
            Let's create something
            <br />
            <span style={{ fontStyle: 'normal' }}>together.</span>
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
                Based in
              </p>
              <p className="text-charcoal text-sm" style={{ letterSpacing: '0.02em' }}>
                {CONTACT_LOCATION}
              </p>
            </div>
            <div>
              <p className="text-stone text-xs mb-2 tracking-widest uppercase" style={{ letterSpacing: '0.2em', fontWeight: 200 }}>
                Services
              </p>
              <ul className="text-charcoal text-sm space-y-1" style={{ letterSpacing: '0.02em' }}>
                <li>Full Interior Design</li>
                <li>Space Planning</li>
                <li>Design Consultation</li>
                <li>Styling & Curation</li>
              </ul>
            </div>
          </div>

          {/* Right: form */}
          <div ref={formRef} className="reveal md:col-span-3" style={{ transitionDelay: '100ms' }}>
            {sent ? (
              <div className="flex flex-col items-start justify-center h-full py-12">
                <p
                  className="font-display text-2xl text-charcoal italic font-light"
                >
                  Thank you.
                </p>
                <p
                  className="text-stone text-sm mt-3"
                  style={{ fontFamily: 'var(--font-jost)', fontWeight: 300 }}
                >
                  I'll be in touch shortly.
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
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="vish-input"
                    placeholder="Your name"
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
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-stone text-xs mb-2 tracking-widest uppercase"
                    style={{ letterSpacing: '0.2em', fontFamily: 'var(--font-jost)', fontWeight: 200 }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="vish-input resize-none"
                    placeholder="Tell me about your project…"
                  />
                </div>
                <button type="submit" className="vish-btn">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
