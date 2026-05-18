# Project Instructions

## Animations
Use **Framer Motion** for all animations — no raw CSS transitions on interactive elements.

- Apply scroll-triggered fades using `whileInView` with `viewport={{ once: true }}`
- Stagger card/list reveals with `staggerChildren: 0.08`
- Add smooth hover transitions on all interactive elements (buttons, cards, links)
- Hero sections: stagger headline words in, then subtext, then CTAs

## Design System
Follow the frontend design skill at `.claude/skills/frontend-design/SKILL.md`.

Key rules:
- 8px base spacing grid — no arbitrary pixel values
- Consistent type scale — no random font sizes
- Color tokens only — no raw hex codes in components
- Cards: 12–16px border radius, subtle border, lift-on-hover
- Avoid the generic AI aesthetic

## Component Library
Use [21st.dev](https://21st.dev) for production-ready components (heroes, navbars, pricing tables, testimonials, footers).

When integrating a 21st.dev component:
1. Replace all placeholder content with real copy
2. Map colors to our design tokens
3. Add Framer Motion entrance animation
4. Match our spacing and typography scale

## Tech Stack
- React 19 + TypeScript
- Vite
- Framer Motion (installed)
