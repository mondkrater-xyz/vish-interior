# VISH Interior Studio — Project Overview

**Client:** Viktoria Shtanoprud — interior designer based in Kraków, Poland
**Studio name:** VISH Interior Studio
**Website:** vishdsgn.com
**Contact email:** contact@vishdsgn.com
**Social handles:** @vishdsgn (Instagram, TikTok, Facebook)

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | SEO-friendly, image optimization, fast static export |
| Language | TypeScript | Type safety, better DX |
| Styling | Tailwind CSS + custom tokens | Utility-first, consistent design system |
| Images | next/image | Automatic WebP conversion, lazy loading, optimization |
| Fonts | Google Fonts via next/font | Cormorant Garamond (display) + Jost (body) |
| Contact form | EmailJS REST API | No backend required, sends directly from browser |
| Deployment | Vercel | Auto-deploy from GitHub, free SSL, CDN |
| Version control | GitHub | Repo: mondkrater-xyz/vish-interior |

---

## Architecture

### File structure
```
vish-interior/
├── app/
│   ├── layout.tsx          # Root layout: fonts, metadata (Polish), lang="pl"
│   └── page.tsx            # Single-page app: stacks all section components
├── components/
│   ├── Nav.tsx             # Fixed top nav, mobile hamburger menu
│   ├── Hero.tsx            # Full-screen crossfade image slideshow
│   ├── Portfolio.tsx       # Masonry-style grid with expandable descriptions
│   ├── About.tsx           # Designer portrait + bio
│   ├── Contact.tsx         # EmailJS contact form + studio info sidebar
│   └── Footer.tsx          # Social links (Instagram, TikTok, Facebook)
├── public/
│   └── images/
│       ├── hero-1.jpg … hero-4.jpg   # Hero slideshow (4 images)
│       ├── p1.jpg, p3.jpg … p9.jpg   # Portfolio renders (8 images, p2 removed)
│       └── about.jpg                  # Viktoria's portrait
├── next.config.mjs         # IMPORTANT: must be .mjs not .ts (Next.js 14 limitation)
├── tailwind.config.ts      # Custom color palette and font variables
├── CLAUDE.md               # Instructions for Claude when working on this project
└── PROJECT_OVERVIEW.md     # This file
```

### Single-page layout
The site is a single scrolling page divided into sections: Hero → Portfolio → About → Contact. Each section is a standalone React component with its own scroll-reveal animation.

---

## Design System

### Color palette
| Token | Hex | Usage |
|---|---|---|
| `charcoal` | `#1a1a18` | Primary text, headings |
| `stone` | `#8a8075` | Secondary text, labels, muted copy |
| `linen` | `#f5f0e8` | Background (warm white) |
| `blush` | `#d4b8a0` | Accent color |
| `mist` | `#e8e4de` | Borders, hairline dividers |

### Typography
- **Display / headings:** Cormorant Garamond (serif, italic for elegance)
- **Body / labels:** Jost (geometric sans-serif, weight 200–400)
- Both fonts use `subsets: ['latin', 'latin-ext']` to support Polish characters (ę, ó, ś, etc.)

### Motion
- **Hero crossfade:** opacity transition on `current` index. IMPORTANT — switch `current` directly (not two-phase fade-out/fade-in). Two-phase causes a white flash between images.
- **Scroll-reveal:** `IntersectionObserver` adds `.visible` class when element enters viewport. CSS handles `opacity: 0 → 1` and `translateY(24px → 0)`.

---

## Key Components

### Hero.tsx
- 4 images cycle every 7 seconds with a 2.5-second crossfade
- All images absolutely positioned, opacity toggled — simultaneous transition avoids white flash
- Polish tagline: *"Przestrzenie, które brzmią jak dom."*

### Portfolio.tsx
- 8 portfolio images (p1, p3–p9; p2 was deleted)
- Two description variants: `DESC_LIVING` (main living space / Guernica wall) and `DESC_BEDROOM` (fabric niche / canopy)
- All images forced to `landscape` aspect ratio — mixing portrait renders into portrait containers causes bad cropping
- Expandable descriptions: "Czytaj więcej +" / "Zwiń —" toggle

### About.tsx
- Single static photo (`about.jpg`) of Viktoria
- Polish bio text
- No crossfade (was tried and reverted — too complex with portrait photos)

### Contact.tsx
- EmailJS REST API (no npm package — uses `fetch` directly to `api.emailjs.com`)
- Three states: `idle` → `sending` (button dimmed, text "Wysyłanie…") → `sent` (thank you message) or `error` (fallback email shown)
- Reply-To in EmailJS template set to `{{from_email}}` so Viktoria can reply directly to the visitor

### EmailJS Credentials
```
Service ID:  service_ri5yi1l    (Gmail — Viktoria's personal account)
Template ID: template_j9nw4km
Public Key:  i9RZ43LPcTMUk00en
```
EmailJS free tier: 200 emails/month.

---

## Deployment

### GitHub
- Remote: `https://github.com/mondkrater-xyz/vish-interior`
- Authentication: Personal Access Token (PAT) stored in remote URL

### Vercel
- Auto-deploys on every push to `main`
- Preview URL: `vish-interior-[hash].vercel.app`

### Custom domain (pending)
- Domain: `vishdsgn.com` (registered with CyberFolks, panel.cyberfolks.pl)
- To activate: Vercel → Settings → Domains → add `vishdsgn.com` + `www.vishdsgn.com` → copy A record and CNAME → add in CyberFolks DNS panel → wait 15–60 min

---

## Known Issues & Decisions

| Issue | Decision |
|---|---|
| `next.config.ts` not supported | Renamed to `next.config.mjs` — do not revert |
| p2.jpg deleted by user | Removed from Portfolio.tsx PROJECTS array — do not re-add |
| Portrait images in portfolio | All set to `landscape` aspect — avoids cropping artifacts on renders |
| Contact form mailto fallback | Replaced with EmailJS REST API — no mail client needed |
| Hero white flash | Fixed by removing two-phase fade state, switching `current` directly |

---

## Handover Notes

If passing this project to another developer or Claude session:

1. Read `CLAUDE.md` for instructions on how to work with this codebase
2. The project is a standard Next.js 14 app — `npm install` then `npm run dev` to start locally
3. All design decisions are deliberate — check this document before changing anything structural
4. Images live in `public/images/` — if adding new portfolio photos, add them to the `PROJECTS` array in `components/Portfolio.tsx`
5. Translations are in Polish throughout — maintain this
6. EmailJS credentials are hardcoded in `components/Contact.tsx` — consider moving to environment variables for better security in future
