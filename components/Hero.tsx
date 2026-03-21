'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

/*
 * HERO IMAGES
 * Replace these Unsplash URLs with Viktoria's own photos.
 * Ideal dimensions: 1920×1080 or larger, landscape orientation.
 * Each photo should be a different interior — living room, bedroom, kitchen, etc.
 */
const HERO_IMAGES = [
  {
    src: '/images/hero-1.jpg',
    alt: 'Living room with Picasso mural and green sectional',
  },
  {
    src: '/images/hero-2.jpg',
    alt: 'Dining area with walnut table and globe pendants',
  },
  {
    src: '/images/hero-3.jpg',
    alt: 'Living room wide view with mural and checker rug',
  },
  {
    src: '/images/hero-4.jpg',
    alt: 'Bright room with double windows and natural light',
  },
]

const INTERVAL_MS = 5500
const FADE_MS = 1800

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % HERO_IMAGES.length)
        setFading(false)
      }, FADE_MS)
    }, INTERVAL_MS)

    return () => clearInterval(timer)
  }, [])

  const scrollToWork = () => {
    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative w-full h-screen overflow-hidden"
      aria-label="VISH Interior Studio hero"
    >
      {/* Background images — crossfade */}
      {HERO_IMAGES.map((img, i) => (
        <div
          key={img.src}
          className="absolute inset-0 transition-opacity"
          style={{
            opacity: i === current ? (fading ? 0 : 1) : 0,
            transitionDuration: `${FADE_MS}ms`,
            transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            zIndex: i === current ? 1 : 0,
          }}
          aria-hidden={i !== current}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Dark overlay — subtle */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: 'linear-gradient(to bottom, rgba(44,40,37,0.18) 0%, rgba(44,40,37,0.42) 100%)' }}
      />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-end pb-20 px-8 md:px-16 lg:px-24">
        <div>
          {/* Studio label */}
          <p
            className="text-fog/70 text-xs mb-6 tracking-widest uppercase"
            style={{ letterSpacing: '0.3em', fontFamily: 'var(--font-jost)', fontWeight: 200 }}
          >
            Warsaw · Interior Design
          </p>

          {/* Main headline */}
          <h1
            className="font-display text-fog font-light leading-none mb-8"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontStyle: 'italic',
              letterSpacing: '-0.01em',
            }}
          >
            Spaces that feel
            <br />
            <span style={{ fontStyle: 'normal', fontWeight: 300 }}>like coming home.</span>
          </h1>

          {/* CTA */}
          <button
            onClick={scrollToWork}
            className="vish-btn text-fog border-fog/60 hover:border-fog"
            style={{ color: 'rgba(232,226,217,0.85)' }}
          >
            View Work
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute right-8 md:right-16 bottom-20 flex flex-col items-center gap-3">
          <div
            className="w-px bg-fog/40"
            style={{
              height: '60px',
              animation: 'grow-line 2s ease-in-out infinite',
            }}
          />
        </div>

        {/* Image counter */}
        <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="w-px transition-all duration-700"
              style={{
                height: i === current ? '28px' : '12px',
                background: i === current ? 'rgba(232,226,217,0.9)' : 'rgba(232,226,217,0.35)',
              }}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes grow-line {
          0%, 100% { transform: scaleY(0); transform-origin: top; opacity: 0; }
          30% { opacity: 1; }
          60% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          61% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
      `}</style>
    </section>
  )
}
