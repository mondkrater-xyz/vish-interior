'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

/*
 * PORTFOLIO PROJECTS
 * Replace `src` with Viktoria's actual project photos.
 * Recommended: mix portrait (2:3) and landscape (3:2) for visual rhythm.
 * Update `title`, `location`, `category` with real project names.
 */
const PROJECTS = [
  {
    id: 1,
    src: '/images/hero-1.jpg',
    alt: 'Living room with statement mural and green sectional',
    title: 'Mokotów Residence',
    location: 'Warsaw',
    category: 'Residential',
    aspect: 'landscape',
  },
  {
    id: 2,
    src: '/images/hero-2.jpg',
    alt: 'Dining area with walnut table and globe pendants',
    title: 'Żoliborz Apartment',
    location: 'Warsaw',
    category: 'Residential',
    aspect: 'landscape',
  },
  {
    id: 3,
    src: '/images/hero-3.jpg',
    alt: 'Open living space with Picasso mural and checker rug',
    title: 'Wilanów Loft',
    location: 'Warsaw',
    category: 'Residential',
    aspect: 'landscape',
  },
  {
    id: 4,
    src: '/images/hero-4.jpg',
    alt: 'Bright salon with double windows and natural light',
    title: 'Śródmieście Interior',
    location: 'Warsaw',
    category: 'Residential',
    aspect: 'landscape',
  },
  {
    id: 5,
    src: '/images/project-5.jpg',
    alt: 'Coming soon',
    title: 'Praga Studio',
    location: 'Warsaw',
    category: 'Commercial',
    aspect: 'portrait',
  },
  {
    id: 6,
    src: '/images/project-6.jpg',
    alt: 'Coming soon',
    title: 'Ursynów Residence',
    location: 'Warsaw',
    category: 'Residential',
    aspect: 'portrait',
  },
]

function useRevealOnScroll(threshold = 0.1) {
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

function ProjectCard({ project, delay }: { project: typeof PROJECTS[0]; delay: number }) {
  const ref = useRevealOnScroll(0.08)

  return (
    <div
      ref={ref}
      className="reveal portfolio-item group"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Image container */}
      <div
        className="overflow-hidden bg-fog mb-4"
        style={{ aspectRatio: project.aspect === 'portrait' ? '2/3' : '3/2' }}
      >
        <Image
          src={project.src}
          alt={project.alt}
          width={project.aspect === 'portrait' ? 600 : 900}
          height={project.aspect === 'portrait' ? 900 : 600}
          className="portfolio-img w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Meta */}
      <div className="flex items-start justify-between">
        <div>
          <p
            className="text-charcoal text-sm font-light mb-0.5"
            style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.02em' }}
          >
            {project.title}
          </p>
          <p
            className="text-stone text-xs"
            style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.08em', fontWeight: 200 }}
          >
            {project.location}
          </p>
        </div>
        <span
          className="text-stone text-xs mt-0.5"
          style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.15em', fontWeight: 200 }}
        >
          {project.category}
        </span>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const headingRef = useRevealOnScroll()

  return (
    <section id="portfolio" className="py-32 md:py-44 px-8 md:px-16 lg:px-24">
      {/* Section heading */}
      <div ref={headingRef} className="reveal mb-20 md:mb-28">
        <p
          className="text-stone text-xs mb-4 tracking-widest uppercase"
          style={{ letterSpacing: '0.3em', fontFamily: 'var(--font-jost)', fontWeight: 200 }}
        >
          Selected Work
        </p>
        <h2
          className="font-display font-light text-charcoal"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontStyle: 'italic' }}
        >
          Projects
        </h2>
      </div>

      {/*
       * Masonry-style grid:
       * — mobile: 1 column
       * — tablet: 2 columns
       * — desktop: staggered 2-col with vertical offsets for the portrait/landscape mix
       */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-14 gap-y-16 md:gap-y-24">
        {PROJECTS.map((project, i) => (
          <div
            key={project.id}
            className={
              // Offset every other column on desktop for depth
              i % 2 === 1 ? 'md:mt-20' : ''
            }
          >
            <ProjectCard project={project} delay={i % 2 === 0 ? 0 : 120} />
          </div>
        ))}
      </div>
    </section>
  )
}
