import { motion } from 'framer-motion'
import Marquee from '../ui/Marquee'
import { techStack } from '../../data/portfolio'

const tagStyle: Record<string, { color: string; bg: string; border: string }> = {
  frontend: { color: '#a78bfa', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.2)' },
  backend:  { color: '#22d3ee', bg: 'rgba(6,182,212,0.1)',  border: 'rgba(6,182,212,0.2)'  },
  ai:       { color: '#f472b6', bg: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.2)' },
  devops:   { color: '#fbbf24', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)' },
  design:   { color: '#34d399', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)' },
}

function Badge({ name, category }: { name: string; category: string }) {
  const s = tagStyle[category] ?? tagStyle.frontend
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 9999, background: s.bg, border: `1px solid ${s.border}`, whiteSpace: 'nowrap', userSelect: 'none' }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, boxShadow: `0 0 6px ${s.color}` }} />
      <span style={{ fontSize: 13, fontWeight: 500, color: s.color }}>{name}</span>
    </div>
  )
}

const row1 = techStack.filter(t => ['frontend', 'ai'].includes(t.category))
const row2 = techStack.filter(t => ['backend', 'devops', 'design'].includes(t.category))

export default function TechStack() {
  return (
    <section id="stack" style={{ background: '#060606', padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>
      {/* grid overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '50px 50px', pointerEvents: 'none' }} />
      {/* top fade */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to bottom, #060606, transparent)', pointerEvents: 'none', zIndex: 1 }} />
      {/* bottom fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to top, #060606, transparent)', pointerEvents: 'none', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div className="container-xl" style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <div style={{ width: 28, height: 1, background: 'rgba(167,139,250,0.4)' }} />
              <span style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: 'rgba(167,139,250,0.65)' }}>Tech Stack</span>
              <div style={{ width: 28, height: 1, background: 'rgba(167,139,250,0.4)' }} />
            </div>
            <h2 style={{ fontSize: 'clamp(2.25rem,5vw,3.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 12 }}>
              Tools I <span className="gradient-text">master</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15, maxWidth: 480, margin: '0 auto' }}>
              My go-to toolkit for building modern, scalable products from idea to production.
            </p>
          </motion.div>
        </div>

        {/* Marquees */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Marquee items={row1.map(t => <Badge key={t.name} name={t.name} category={t.category} />)} direction="left" speed={30} gap={14} />
          <Marquee items={row2.map(t => <Badge key={t.name} name={t.name} category={t.category} />)} direction="right" speed={36} gap={14} />
        </motion.div>

        {/* Divider + caption */}
        <div className="container-xl" style={{ marginTop: '4rem' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(255,255,255,0.08)' }}>
            {[
              { label: 'Frontend Mastery', desc: 'React, Next.js, TypeScript — pixel-perfect UIs at any scale.', color: '#a78bfa' },
              { label: 'AI Integration', desc: 'OpenAI, Claude, LangChain — LLMs wired into real products.', color: '#f472b6' },
              { label: 'Performance First', desc: '95+ Lighthouse scores. Sub-100ms interactions. Real metrics.', color: '#fbbf24' },
            ].map(({ label, desc, color }) => (
              <div key={label} style={{ padding: '1.75rem', background: '#060606' }}>
                <div style={{ width: 32, height: 3, background: color, marginBottom: '1rem', boxShadow: `0 0 8px ${color}` }} />
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{label}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
