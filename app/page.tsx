'use client'

import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Portfolio from '@/components/Portfolio'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
