'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const ABOUT_IMAGES = [
  { src: '/images/about.jpg',   alt: 'Wiktoria Shtanoprud — VISH Interior Studio' },
  { src: '/images/about-2.jpg', alt: 'Wiktoria Shtanoprud — projektantka wnętrz' },
]

const FADE_MS = 1800
const INTERVAL_MS = 5000

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

export default function About() {
  const imageRef = useReveal(0.1)
  const textRef = useReveal(0.1)
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % ABOUT_IMAGES.length)
        setFading(false)
      }, FADE_MS)
    }, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      id="about"
      className="py-32 md:py-44 px-8 md:px-16 lg:px-24"
      style={{ background: 'var(--parchment)' }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

        {/* Image — crossfading */}
        <div
          ref={imageRef}
          className="reveal"
          style={{ transitionDelay: '0ms' }}
        >
          <div
            className="overflow-hidden bg-fog relative"
            style={{ aspectRatio: '3/4' }}
          >
            {ABOUT_IMAGES.map((img, i) => (
              <div
                key={img.src}
                className="absolute inset-0 transition-opacity"
                style={{
                  opacity: i === current ? (fading ? 0 : 1) : 0,
                  transitionDuration: `${FADE_MS}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  zIndex: i === current ? 1 : 0,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover object-center portfolio-img"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Text */}
        <div ref={textRef} className="reveal" style={{ transitionDelay: '150ms' }}>
          <p
            className="text-stone text-xs mb-8 tracking-widest uppercase"
            style={{ letterSpacing: '0.3em', fontFamily: 'var(--font-jost)', fontWeight: 200 }}
          >
            Studio
          </p>

          <h2
            className="font-display font-light text-charcoal mb-8 leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontStyle: 'italic' }}
          >
            Spokojne przestrzenie,
            <br />
            <span style={{ fontStyle: 'normal' }}>stworzone z troską.</span>
          </h2>

          <div className="hairline mb-8" />

          <div
            className="space-y-5 text-ash leading-relaxed"
            style={{ fontFamily: 'var(--font-jost)', fontSize: '0.9rem', fontWeight: 300, letterSpacing: '0.02em' }}
          >
            <p>
              Jestem Wiktoria — projektantka wnętrz z Krakowa, która wierzy, że przestrzenie,
              w których żyjemy, kształtują nasze codzienne samopoczucie.
            </p>
            <p>
              W VISH każdy projekt zaczynam od głębokiego zrozumienia rytmu życia klienta.
              Efekt jest zawsze osobisty — dom, który czuje się jak własny.
            </p>
            <p>
              Moje podejście łączy skandynawski minimalizm z ciepłem środkowoeuropejskiego
              rzemiosła — naturalne materiały, świadome światło i detale, które odkrywają
              się powoli z czasem.
            </p>
          </div>

          <div className="mt-12">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="vish-btn"
            >
              Współpracuj ze mną
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
