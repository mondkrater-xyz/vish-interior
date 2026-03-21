import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VISH Interior Studio — Viktoria Shtanoprud',
  description:
    'A Warsaw-based interior design studio creating calm, considered spaces that feel deeply personal. By Viktoria Shtanoprud.',
  keywords: ['interior design', 'Warsaw', 'luxury interiors', 'VISH', 'Viktoria Shtanoprud'],
  openGraph: {
    title: 'VISH Interior Studio',
    description: 'Calm, considered spaces. Warsaw-based interior design by Viktoria Shtanoprud.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  )
}
