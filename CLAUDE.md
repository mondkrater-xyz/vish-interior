# CLAUDE.md — VISH Interior Studio

This file tells Claude how to work with this project. Read it at the start of every session before making any changes.

---

## What this project is

A premium single-page portfolio website for **VISH Interior Studio by Viktoria Shtanoprud**, an interior designer based in Kraków, Poland. The site is fully in Polish.

- **Live URL:** vishdsgn.com (deployed on Vercel)
- **GitHub:** github.com/mondkrater-xyz/vish-interior
- **Contact email:** contact@vishdsgn.com
- **Social:** @vishdsgn on Instagram, TikTok, Facebook

---

## Tech stack

- **Next.js 14** (App Router) — do not upgrade without testing
- **TypeScript** — strict mode
- **Tailwind CSS** — custom tokens in `tailwind.config.ts`
- **next/image** — always use for images, never raw `<img>` tags
- **Google Fonts** — Cormorant Garamond (display) + Jost (body), both with `latin-ext` subset
- **EmailJS REST API** — contact form, credentials in `components/Contact.tsx`

---

## Non-negotiable rules

### Config file
`next.config.mjs` — **never rename to `.ts`**. Next.js 14 does not support TypeScript config files and the build will fail on Vercel.

### Images
- All images live in `public/images/`
- Always use `<Image>` from `next/image`, never `<img>`
- Portfolio images: if you delete a file from `public/images/`, remove its entry from the `PROJECTS` array in `components/Portfolio.tsx` — a missing file causes a blank white card
- All portfolio images use `aspect: 'landscape'` — do not change to portrait, it causes bad cropping on the renders

### Language
The entire site is in Polish. Keep all UI text, labels, placeholders, confirmation messages, and headings in Polish. Do not switch to English.

### Fonts
Both fonts must include `subsets: ['latin', 'latin-ext']` or Polish characters (ę, ó, ś, ź, ą, etc.) will render incorrectly.

### Hero crossfade
The crossfade works by switching `current` index directly — this makes outgoing and incoming images transition simultaneously. Do **not** add a two-phase fade (fade out → switch → fade in) — it causes a white flash between images.

---

## How to run locally

```bash
npm install       # do this first — always
npm run dev       # starts on localhost:3000
```

Use a separate terminal tab for git commands. Never type git commands into the running dev server terminal.

---

## How to deploy

```bash
git add -A
git commit -m "describe what you changed"
git push
```

Vercel auto-deploys within ~2 minutes. Check the Vercel dashboard if the deployment seems stuck.

If git commit fails with `index.lock` error:
```bash
rm /path/to/vish-interior/.git/index.lock
```

---

## Component overview

| File | What it does |
|---|---|
| `app/layout.tsx` | Root layout: sets `lang="pl"`, loads fonts, defines metadata |
| `app/page.tsx` | Composes all section components in order |
| `components/Nav.tsx` | Fixed top navigation, mobile hamburger |
| `components/Hero.tsx` | Full-screen crossfade slideshow (hero-1 to hero-4) |
| `components/Portfolio.tsx` | 8-image grid (p1, p3–p9) with expandable descriptions |
| `components/About.tsx` | Designer photo + bio |
| `components/Contact.tsx` | EmailJS contact form + studio info |
| `components/Footer.tsx` | Social links with icons and labels |

---

## Design system

### Colors (defined in tailwind.config.ts)
- `charcoal` (#1a1a18) — primary text
- `stone` (#8a8075) — secondary/muted
- `linen` (#f5f0e8) — background
- `blush` (#d4b8a0) — accent
- `mist` (#e8e4de) — borders

### Typography
- Display: Cormorant Garamond, often italic, font-light
- Body/labels: Jost, fontWeight 200–300

### Animation
- Scroll-reveal: `.reveal` class → IntersectionObserver adds `.visible` → CSS transitions opacity and translateY
- Hero: CSS `transition-opacity` with `transitionDuration: '2500ms'`

---

## EmailJS setup

Service ID: `service_ri5yi1l`
Template ID: `template_j9nw4km`
Public Key: `i9RZ43LPcTMUk00en`

Template variables used: `{{from_name}}`, `{{from_email}}`, `{{message}}`
Reply-To is set to `{{from_email}}` so Viktoria can reply directly to visitors.
Free plan: 200 emails/month.

---

## What to check before every deploy

1. No unused imports in any component (`import X from '...'` where X is never used → build error)
2. Every image file referenced in code actually exists in `public/images/`
3. `next.config.mjs` is still `.mjs` (not `.ts`)
4. All new text is in Polish
