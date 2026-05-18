# Hemant — Personal Portfolio

A modern, animated personal portfolio website built with React 19, TypeScript, Tailwind CSS v4, and Framer Motion.

## Sections

- **Navbar** — sticky navigation with smooth scroll links
- **Hero** — animated headline with staggered word entrance
- **About** — personal bio and background
- **Tech Stack** — technologies and tools
- **Projects** — showcase of work with hover interactions
- **Experience** — professional timeline
- **Testimonials** — social proof carousel
- **Contact** — contact form / links
- **Footer** — links and credits

## Tech Stack

| Layer | Library / Tool |
|-------|---------------|
| Framework | React 19 |
| Language | TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Type-check and build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── layout/       # Navbar, Footer
│   └── sections/     # Hero, About, TechStack, Projects, Experience, Testimonials, Contact
├── App.tsx
├── main.tsx
├── App.css
└── index.css
```

## Animation Guidelines

All animations use Framer Motion:

- Scroll-triggered fades via `whileInView` with `viewport={{ once: true }}`
- Card/list reveals staggered at `staggerChildren: 0.08`
- Hover transitions on all interactive elements
- Hero headline words stagger in, followed by subtext and CTAs
