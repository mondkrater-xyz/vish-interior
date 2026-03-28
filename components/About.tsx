'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const ABOUT_IMAGE = {
  src: '/images/about.jpg',
  alt: 'Wiktoria Shtanoprud — VISH Interior Studio',
}

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

  return (
    <section
      id="about"
      className="py-32 md:py-44 px-8 md:px-16 lg:px-24"
      style={{ background: 'var(--parchment)' }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

        {/* Image */}
        <div ref={imageRef} className="reveal" style={{ transitionDelay: '0ms' }}>
          <div className="overflow-hidden bg-fog" style={{ aspectRatio: '3/4' }}>
            <Image
              src={ABOUT_IMAGE.src}
              alt={ABOUT_IMAGE.alt}
              width={600}
              height={800}
              className="w-full h-full object-cover object-center portfolio-img"
              loading="lazy"
            />
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
