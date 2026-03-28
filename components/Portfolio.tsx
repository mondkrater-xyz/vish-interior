'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const DESC_LIVING = [
  'Mój pierwszy projekt w zabytkowej kamienicy w samym centrum Krakowa. Każda decyzja wymagała uzgodnienia z konserwatorem zabytków, a wszelkie zmiany układu mogły być wprowadzone wyłącznie na podstawie projektu architekta z uprawnieniami.',
  'Inwestor uzyskał zgodę jedynie na remont łazienki oraz wyprowadzenie instalacji pod kuchnię. Cała reszta pozostała bez zmian. Zamiast więc przebudowywać przestrzeń, kluczowe było wykorzystanie tego, co już istniało, i szukanie rozwiązań w ramach tych ograniczeń.',
  'Mieszkanie zaprojektowano jako inwestycję pod wynajem krótkoterminowy, ale bez typowego, neutralnego podejścia do wnętrza. Wnętrze ma swoją logikę i zapada w pamięć dzięki detalom.',
  'Strefa kuchni z częścią jadalnianą opiera się na kontraście. Na ścianie tapeta z „Guernicą" Picassa, która nadaje rytm całemu wnętrzu. Poniżej tekstylna draperia ukrywająca duży grzejnik. Rozwiązanie wynikające z ograniczeń stało się elementem spinającym całość, a miękka tkanina pojawia się również w innych częściach mieszkania. Ściana nad blatem wykonana jest z lustra, które odbija światło z okien i optycznie powiększa przestrzeń.',
  'Strefa wypoczynkowa zbudowana jest wokół jednego wyraźnego akcentu. Sofa w kolorze ciemnej zieleni, inspirowanej igliwiem. Niska, masywna, o miękkiej formie, stanowi centrum kompozycji i jednocześnie pełni funkcję spania.',
  'To projekt, w którym ograniczenia wyznaczyły kierunek. Wszystkie rozwiązania pojawiły się właśnie dzięki nim.',
]

const DESC_BEDROOM = [
  'Wnęka z łóżkiem to osobna historia w tym projekcie. Znajdowały się tu elementy, których nie można było przenieść: rozdzielnia elektryczna oraz skrzynka z instalacją internetową.',
  'Ich przeniesienie wymagałyby dodatkowych zgód, których nie było. Zamiast maskować je punktowo, zdecydowano się otulić całą wnękę tkaniną, od podłogi aż po sufit, wraz z miękkim zadaszeniem w formie baldachimu.',
  'To, co wynikało z konieczności technicznej, stało się świadomym zabiegiem projektowym. Tkanina ukryła wszystkie problematyczne elementy i jednocześnie stworzyła bardziej zamkniętą, kameralną przestrzeń, wyraźnie oddzieloną od reszty mieszkania.',
  'To rozwiązanie nawiązuje do części kuchennej, gdzie duży grzejnik został ukryty za tekstylną draperią. W tym projekcie tkanina działa jak narzędzie — pojawia się tam, gdzie są ograniczenia, i staje się częścią całej koncepcji.',
]

const PROJECTS = [
  { id: 1, src: '/images/p1.jpg', alt: 'Salon z sofą i muralem Picassa',              title: 'Kamienica Florianówka', location: 'Kraków', category: 'Mieszkalne', aspect: 'landscape', desc: DESC_LIVING },
  { id: 2, src: '/images/p2.jpg', alt: 'Wnęka sypialniana z baldachimem z tkaniny',   title: 'Kamienica Florianówka', location: 'Kraków', category: 'Mieszkalne', aspect: 'landscape', desc: DESC_BEDROOM },
  { id: 3, src: '/images/p3.jpg', alt: 'Widok z wnęki sypialnianej na salon',          title: 'Kamienica Florianówka', location: 'Kraków', category: 'Mieszkalne', aspect: 'landscape', desc: DESC_LIVING },
  { id: 4, src: '/images/p4.jpg', alt: 'Przestrzeń dzienna z muralem i dywanem',       title: 'Kamienica Florianówka', location: 'Kraków', category: 'Mieszkalne', aspect: 'landscape', desc: DESC_LIVING },
  { id: 5, src: '/images/p5.jpg', alt: 'Jasny salon z podwójnymi oknami',              title: 'Kamienica Florianówka', location: 'Kraków', category: 'Mieszkalne', aspect: 'landscape', desc: DESC_LIVING },
  { id: 6, src: '/images/p6.jpg', alt: 'Detal wnętrza z sofą i lampami kulowymi',      title: 'Kamienica Florianówka', location: 'Kraków', category: 'Mieszkalne', aspect: 'landscape', desc: DESC_LIVING },
  { id: 7, src: '/images/p7.jpg', alt: 'Panorama salonu w świetle dziennym',           title: 'Kamienica Florianówka', location: 'Kraków', category: 'Mieszkalne', aspect: 'landscape', desc: DESC_LIVING },
  { id: 8, src: '/images/p8.jpg', alt: 'Detal łóżka z lampą przyścienną i draperią',  title: 'Kamienica Florianówka', location: 'Kraków', category: 'Mieszkalne', aspect: 'landscape', desc: DESC_BEDROOM },
  { id: 9, src: '/images/p9.jpg', alt: 'Wnętrze z oknami i zieloną sofą',             title: 'Kamienica Florianówka', location: 'Kraków', category: 'Mieszkalne', aspect: 'landscape', desc: DESC_LIVING },
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
  const [expanded, setExpanded] = useState(false)

  return (
    <div ref={ref} className="reveal portfolio-item group" style={{ transitionDelay: `${delay}ms` }}>
      {/* Image */}
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
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-charcoal text-sm font-light mb-0.5" style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.02em' }}>
            {project.title}
          </p>
          <p className="text-stone text-xs" style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.08em', fontWeight: 200 }}>
            {project.location}
          </p>
        </div>
        <span className="text-stone text-xs mt-0.5" style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.15em', fontWeight: 200 }}>
          {project.category}
        </span>
      </div>

      {/* Description */}
      <div style={{ fontFamily: 'var(--font-jost)' }}>
        <p className="text-ash text-xs leading-relaxed" style={{ fontWeight: 300, letterSpacing: '0.02em' }}>
          {project.desc[0]}
        </p>
        <div style={{
          overflow: 'hidden',
          maxHeight: expanded ? '800px' : '0px',
          transition: 'max-height 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}>
          {project.desc.slice(1).map((para, i) => (
            <p key={i} className="text-ash text-xs leading-relaxed mt-3" style={{ fontWeight: 300, letterSpacing: '0.02em' }}>
              {para}
            </p>
          ))}
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-stone text-xs tracking-widest uppercase transition-colors duration-500 hover:text-charcoal"
          style={{ letterSpacing: '0.2em', fontWeight: 200 }}
        >
          {expanded ? 'Zwiń —' : 'Czytaj więcej +'}
        </button>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const headingRef = useRevealOnScroll()

  return (
    <section id="portfolio" className="py-32 md:py-44 px-8 md:px-16 lg:px-24">
      <div ref={headingRef} className="reveal mb-20 md:mb-28">
        <p className="text-stone text-xs mb-4 tracking-widest uppercase" style={{ letterSpacing: '0.3em', fontFamily: 'var(--font-jost)', fontWeight: 200 }}>
          Wybrane realizacje
        </p>
        <h2 className="font-display font-light text-charcoal" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontStyle: 'italic' }}>
          Realizacje
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-14 gap-y-16 md:gap-y-24">
        {PROJECTS.map((project, i) => (
          <div key={project.id} className={i % 2 === 1 ? 'md:mt-20' : ''}>
            <ProjectCard project={project} delay={i % 2 === 0 ? 0 : 120} />
          </div>
        ))}
      </div>
    </section>
  )
}
