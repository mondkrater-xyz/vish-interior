import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin', 'latin-ext'],
  weight: ['200', '300', '400'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VISH Interior Studio — Wiktoria Shtanoprud',
  description:
    'Krakowskie studio projektowania wnętrz tworzące spokojne, przemyślane przestrzenie. Projektuje Wiktoria Shtanoprud.',
  keywords: ['projektowanie wnętrz', 'Kraków', 'wnętrza', 'VISH', 'Wiktoria Shtanoprud'],
  openGraph: {
    title: 'VISH Interior Studio',
    description: 'Spokojne przestrzenie, stworzone z troską. Projektowanie wnętrz w Krakowie.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={`${cormorant.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  )
}
