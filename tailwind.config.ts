import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        parchment: '#EDE6D6',
        warm: '#D4C5A9',
        stone: '#A89880',
        charcoal: '#2C2825',
        ash: '#6B6460',
        fog: '#E8E2D9',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-jost)', 'Helvetica', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.3em',
        ultra: '0.45em',
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
      },
    },
  },
  plugins: [],
}

export default config
