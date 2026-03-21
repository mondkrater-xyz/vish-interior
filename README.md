# VISH Interior Studio

Landing page for **VISH Interior Studio** by Viktoria Shtanoprud.  
Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
vish-interior/
├── app/
│   ├── layout.tsx        # Root layout — fonts, metadata
│   ├── page.tsx          # Main page
│   └── globals.css       # Design system, animations, global styles
├── components/
│   ├── Nav.tsx           # Sticky navigation + mobile menu
│   ├── Hero.tsx          # Full-screen crossfading hero
│   ├── Portfolio.tsx     # Project grid with hover effects
│   ├── About.tsx         # Studio / Viktoria introduction
│   ├── Contact.tsx       # Contact form
│   └── Footer.tsx        # Social links and copyright
├── lib/
│   └── useReveal.ts      # Scroll-based reveal hook
├── public/
│   ├── images/           # ← Put your own photos here
│   └── audio/            # ← Put ambient.mp3 here when ready
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

## Swapping in Real Photos

Every image slot is clearly marked with a comment. To replace placeholder images:

### Hero section (`components/Hero.tsx`)
```ts
const HERO_IMAGES = [
  {
    src: 'YOUR_IMAGE_URL_OR_PATH',   // e.g. '/images/hero-1.jpg'
    alt: 'Description of the photo',
  },
  // ...
]
```

### Portfolio section (`components/Portfolio.tsx`)
```ts
const PROJECTS = [
  {
    src: '/images/project-1.jpg',    // Replace with your photo
    alt: 'Alt text for accessibility',
    title: 'Project Name',
    location: 'Warsaw',
    category: 'Residential',
    aspect: 'portrait',              // 'portrait' (2:3) or 'landscape' (3:2)
  },
  // ...
]
```

### About section (`components/About.tsx`)
```ts
const ABOUT_IMAGE = {
  src: '/images/viktoria.jpg',       // Portrait or interior shot
  alt: 'Viktoria Shtanoprud — VISH Interior Studio',
}
```

### Using local images
Place files in `/public/images/` and reference as `/images/filename.jpg`.

### Using external images (e.g. from a CDN)
Add the domain to `next.config.ts`:
```ts
remotePatterns: [
  { protocol: 'https', hostname: 'your-cdn.com' },
],
```

---

## Updating Content

### Studio details
- **Contact email**: `components/Contact.tsx` → `CONTACT_EMAIL`
- **Location**: `components/Contact.tsx` → `CONTACT_LOCATION`
- **About text**: `components/About.tsx` → the `<p>` elements inside `<div className="space-y-5">`
- **Social links**: `components/Footer.tsx` → `SOCIALS` array

### SEO / Metadata
Edit `app/layout.tsx` → the `metadata` object.

---

## Wiring Up the Contact Form

Currently the form opens the user's email client as a fallback.  
For a production form, use one of these:

**Option A — Resend (recommended)**
```bash
npm install resend
```
Create `app/api/contact/route.ts` and post to it from Contact.tsx.

**Option B — Formspree (no backend needed)**
Replace the `handleSubmit` function with a `fetch` to your Formspree endpoint.

**Option C — EmailJS (client-side only)**
```bash
npm install @emailjs/browser
```

---

## Adding Ambient Music (future)

1. Place your `.mp3` file at `public/audio/ambient.mp3`
2. Create `components/AudioToggle.tsx` with an `<audio loop>` element
3. Add `<AudioToggle />` to `app/page.tsx`

---

## Deployment to Vercel

### Option A — GitHub (recommended)

1. Push the project to your GitHub repository:
```bash
git add .
git commit -m "initial: VISH interior studio landing page"
git push origin main
```

2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo
3. Vercel auto-detects Next.js — click **Deploy**
4. Done. Your site is live.

### Option B — Vercel CLI

```bash
npm install -g vercel
vercel
```

---

## Build for Production

```bash
npm run build
npm start
```

---

## Color Palette Reference

| Name | Hex |
|------|-----|
| Cream | `#F5F0E8` |
| Parchment | `#EDE6D6` |
| Warm | `#D4C5A9` |
| Stone | `#A89880` |
| Ash | `#6B6460` |
| Charcoal | `#2C2825` |
| Fog | `#E8E2D9` |

---

## Fonts

- **Display**: Cormorant Garamond (300, 400, 500 · italic) — headlines
- **Body**: Jost (200, 300, 400) — UI text, labels, navigation

Both loaded via `next/font/google` for zero layout shift and optimal performance.
