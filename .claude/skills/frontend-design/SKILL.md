# Frontend Design Skill

## Core Principle
Avoid the generic AI aesthetic. Every component should look like it was designed by a senior product designer, not generated from a template.

---

## Typography Scale
Use a consistent type system — never arbitrary font sizes.

```
xs:   12px / 0.75rem
sm:   14px / 0.875rem
base: 16px / 1rem
lg:   18px / 1.125rem
xl:   20px / 1.25rem
2xl:  24px / 1.5rem
3xl:  30px / 1.875rem
4xl:  36px / 2.25rem
5xl:  48px / 3rem
6xl:  64px / 4rem
7xl:  80px / 5rem
```

- Headlines: tight tracking (`letter-spacing: -0.02em` to `-0.04em`)
- Body: normal tracking, line-height 1.6–1.7
- Captions/labels: uppercase + wide tracking (`0.08em`)
- Max 2 font families per project — one display, one body

---

## Spacing System
8px base grid. All spacing must be multiples of 8 (or 4 for fine-tuning).

```
4px  — micro gaps (icon padding, tight labels)
8px  — xs
16px — sm
24px — md
32px — lg
48px — xl
64px — 2xl
96px — 3xl
128px — 4xl
```

Never use arbitrary values like `17px`, `23px`, `37px`.

---

## Color Tokens
Always define tokens — never raw hex codes in components.

```
--color-primary:     [brand color]
--color-primary-hover: [10% darker]
--color-neutral-50:  #fafafa
--color-neutral-100: #f5f5f5
--color-neutral-200: #e5e5e5
--color-neutral-400: #a3a3a3
--color-neutral-600: #525252
--color-neutral-800: #262626
--color-neutral-900: #171717
--color-accent:      [secondary brand color]
--color-surface:     [card/panel background]
--color-border:      [subtle divider]
```

Dark mode: invert neutral scale, keep primary/accent consistent.

---

## Layout Principles

- **Max content width:** 1280px (use `max-w-screen-xl` or `max-w-7xl`)
- **Section padding:** 96px–128px vertical, 24px–48px horizontal
- **Grid:** 12-column base; use 4-col for cards, 3-col for features
- **Gutters:** 24px minimum between columns
- **Asymmetry over symmetry:** offset layouts feel premium (e.g., 7/5 column split instead of 6/6)

---

## Component Patterns

### Buttons
- Primary: solid background, subtle shadow, hover lifts (`translateY(-1px)`) + shadow deepens
- Secondary: outline or ghost — 1.5px border, transparent background
- States: default → hover → active → disabled (never skip disabled styling)
- Min height: 44px (accessibility tap target)
- Padding: 12px 24px (sm), 16px 32px (md), 20px 40px (lg)

### Cards
- Subtle border (`1px solid var(--color-border)`)
- Soft shadow — not harsh drop shadows
- Hover: lift (`translateY(-2px)`) + shadow grows
- Border radius: 12px–16px (never 4px — that's Bootstrap 2012)
- Internal padding: 24px–32px

### Forms
- Label above field, never placeholder-only
- Focus ring: 2px solid primary, 2px offset
- Error state: red border + error text below (not tooltip)
- Field height: 44px minimum

### Sections
- Alternate backgrounds subtly (white → neutral-50 → white)
- Use large decorative elements sparingly (blobs, gradients) — always blurred, low opacity
- Dividers: prefer whitespace over horizontal rules

---

## Animation Rules (Framer Motion)

Use `framer-motion` for ALL animations. No CSS transitions on interactive elements.

### Scroll-triggered reveals
```tsx
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
}
// Use with whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
```

### Staggered children
```tsx
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}
```

### Hover transitions
- Buttons: `whileHover={{ y: -1, boxShadow: "..." }}` + `whileTap={{ scale: 0.98 }}`
- Cards: `whileHover={{ y: -4 }}` with `transition={{ duration: 0.2 }}`
- Links: underline slides in from left (use CSS clip-path or scaleX transform)

### Hero sections
- Headline words stagger in (split by word, delay 0.05s each)
- Subtext fades up after headline completes
- CTA buttons fade in last

### Easing
- Default: `[0.25, 0.1, 0.25, 1]` (smooth ease-in-out)
- Snappy UI: `[0.4, 0, 0.2, 1]`
- Bouncy: spring with `stiffness: 300, damping: 25`

### Rules
- Never animate layout-affecting properties (width, height) on hover — only transform and opacity
- `viewport={{ once: true }}` on all scroll animations (don't re-animate on scroll up)
- Duration: 0.3s–0.6s for reveals, 0.15s–0.25s for hover micro-interactions

---

## 21st.dev Component Integration

When integrating components from 21st.dev:
1. Replace all placeholder text with actual copy
2. Map component colors to our design tokens (no hardcoded hex)
3. Add Framer Motion entrance animation if the component doesn't have one
4. Ensure responsive breakpoints match our grid system
5. Strip any styles that conflict with our typography scale

---

## Anti-patterns to Avoid

- Random border radii (`rounded-sm`, `rounded-full` on cards)
- Shadows that are too dark or harsh (`shadow-lg` on everything)
- Gradients with more than 2 stops
- Purple + blue + teal all in one palette
- Hero text smaller than 48px on desktop
- Center-aligning body text longer than 2 lines
- Fake loading skeletons on static content
- Excessive micro-animations that slow down perception
- Modals for things that should be inline
- Generic placeholder icons (no "icon goes here" boxes)
