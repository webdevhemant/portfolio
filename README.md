# Hemant — Frontend Developer Portfolio

> Crafting fast, refined web interfaces with React, Next.js, and TypeScript.

A modern, animation-rich personal portfolio built as a showcase of frontend craft — buttery-smooth motion, a cinematic scroll-expand hero, and a design system that avoids the generic template look.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-BB4DE8?logo=framer&logoColor=white)

---

## Highlights

- **Cinematic scroll-expand hero** — an animated aurora panel expands as you scroll while the "HEMANT BUILDS" title splits apart, then the intro fades in, all synced to scroll progress.
- **Pure-CSS animated aurora backdrops** — drifting gradient fields rendered on the compositor (no WebGL), so the whole site stays GPU-light and smooth.
- **Advanced Framer Motion** — scroll progress bar, word-by-word heading reveals, magnetic CTA buttons, and a sliding active-tab indicator (shared `layoutId`).
- **Responsive, content-hugging navbar** — a centered pill on desktop that collapses to a hamburger menu below `sm`, with smooth section highlighting.
- **Polished contact section** — connect cards (Email, Upwork, GitHub), an animated gradient-border form, and live availability status.
- **Design system** — 8px spacing grid, color tokens, consistent type scale, and tasteful glass/lift card interactions.

## Featured Work — the Haxon suite

| Project | Live | Stack |
|---------|------|-------|
| **Haxon Recruit** — AI-assisted recruitment UI | [haxon-recruit.vercel.app](https://haxon-recruit.vercel.app) | React · TS · Tailwind · Framer Motion |
| **Haxon Workspace** — unified team workspace | [haxonworkspace.vercel.app](https://haxonworkspace.vercel.app) | React · TS · Tailwind · Vite |
| **Haxon Flow** — visual automation builder | [haxonflow.vercel.app](https://haxonflow.vercel.app) | React · TS · Drag & Drop |
| **Haxon Chat** — streaming chat interface | [haxonchat.vercel.app](https://haxonchat.vercel.app) | React · Streaming UI · TS |
| **Haxon Admin** — control-center dashboard | [haxon.vercel.app](https://haxon.vercel.app) | React · TS · Charts |

## Tech Stack

| Layer | Library / Tool |
|-------|----------------|
| Framework | React 19 |
| Language | TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Icons | Lucide React + custom SVGs |

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:5173)
npm run dev

# Type-check and build for production
npm run build

# Preview the production build
npm run preview

# Lint
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── layout/        # Navbar, Footer
│   ├── sections/      # Hero, About, TechStack, Projects, Experience, Testimonials, Contact
│   └── ui/            # AuroraGradient, SectionBackdrop, ScrollProgress, RevealText,
│                      # Button, ScrollExpandMedia, Marquee, SocialIcons, …
├── data/portfolio.ts  # Single source of truth: profile, projects, stack, experience
├── App.tsx
├── main.tsx
└── index.css          # Tailwind import, tokens, keyframes
```

## Design & Animation Principles

- All motion runs through **Framer Motion** — no raw CSS transitions on interactive elements.
- Scroll-triggered reveals use `whileInView` with `viewport={{ once: true }}`.
- Lists and cards stagger in (`staggerChildren`); headings reveal word by word.
- Backgrounds are compositor-only (transform/opacity) to keep frame times low.
- 8px spacing grid, a consistent type scale, and color tokens — no arbitrary values.

## Contact

- **Email** — [hemant.dev.upwork@gmail.com](mailto:hemant.dev.upwork@gmail.com)
- **Upwork** — [Hire me on Upwork](https://www.upwork.com/freelancers/~01ccdad8415e1e720a)
- **GitHub** — [@webdevhemant](https://github.com/webdevhemant)

---

Built and designed by **Hemant** · Frontend Developer · Available for freelance work.
