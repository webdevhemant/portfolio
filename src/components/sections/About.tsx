import { motion } from 'framer-motion'
import { MapPin, Mail, ArrowUpRight } from 'lucide-react'
import { personalInfo, stats } from '../../data/portfolio'

const topStack = [
  { name: 'React',          color: '#61DAFB' },
  { name: 'Next.js',        color: '#ffffff' },
  { name: 'TypeScript',     color: '#3178C6' },
  { name: 'Tailwind CSS',   color: '#38BDF8' },
  { name: 'Framer Motion',  color: '#BB4DE8' },
  { name: 'OpenAI / Claude',color: '#f472b6' },
]

const principles = [
  { num: '01', title: 'Ship fast, iterate faster',  body: "I'd rather put something real in front of users than perfect something no one's seen." },
  { num: '02', title: 'Design is in the details',   body: 'The 5px that nobody notices is the reason the whole thing feels right.' },
  { num: '03', title: 'Code that explains itself',  body: 'If you need a comment to understand it, the function name is probably wrong.' },
]

const card: React.CSSProperties = {
  background: '#0d0d0d',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 16,
  transition: 'border-color 0.25s',
}

const hover = {
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)' },
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' },
}

function fade(delay = 0) {
  return {
    initial:     { opacity: 0, y: 20 } as const,
    whileInView: { opacity: 1, y: 0  } as const,
    viewport:    { once: true },
    transition:  { duration: 0.5, delay, ease: 'easeOut' as const },
  }
}

export default function About() {
  return (
    <section id="about" style={{ background: '#000', padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>

      {/* Grid texture overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />

      {/* Ambient violet glow — top left */}
      <div style={{ position: 'absolute', top: -80, left: -80, width: 480, height: 480, background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

      {/* Ambient cyan glow — bottom right */}
      <div style={{ position: 'absolute', bottom: -60, right: -60, width: 400, height: 400, background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />

      {/* Top fade */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 100, background: 'linear-gradient(to bottom, #000, transparent)', pointerEvents: 'none', zIndex: 1 }} />

      {/* Bottom fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, background: 'linear-gradient(to top, #000, transparent)', pointerEvents: 'none', zIndex: 1 }} />

      <div className="container-xl" style={{ position: 'relative', zIndex: 2 }}>

        {/* Header — centered, matches all other sections */}
        <motion.div {...fade()} style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <div style={{ width: 28, height: 1, background: 'rgba(167,139,250,0.4)' }} />
            <span style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: 'rgba(167,139,250,0.65)' }}>About</span>
            <div style={{ width: 28, height: 1, background: 'rgba(167,139,250,0.4)' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(2rem,4.5vw,3.25rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0 }}>
            I build things that feel good<br />to use — not just look good.
          </h2>
        </motion.div>

        {/* Row 1 — Bio (wide) + Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 12, marginBottom: 12 }}>

          {/* Bio card — takes 2/3 on desktop */}
          <motion.div {...fade(0.06)} className="md:col-span-2">
            <div style={{ ...card, padding: '2.5rem', height: '100%', position: 'relative', overflow: 'hidden' }} {...hover}>
              {/* Top accent line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.6), transparent)' }} />
              {/* Corner violet glow */}
              <div style={{ position: 'absolute', top: -40, right: -40, width: 220, height: 220, background: 'radial-gradient(circle, rgba(124,58,237,0.1), transparent 70%)', pointerEvents: 'none' }} />

              <div style={{ position: 'relative' }}>
                {/* Label */}
                <p style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.22)', marginBottom: '1rem' }}>Bio</p>

                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', lineHeight: 1.85, marginBottom: '1.25rem', maxWidth: 560 }}>
                  {personalInfo.bio}
                </p>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.38)', lineHeight: 1.85, marginBottom: '2rem', maxWidth: 560 }}>
                  Started freelancing four years ago because agency timelines didn't match my pace. Since then I've shipped 40+ products — mostly SaaS, some AI tools — and learned that the best code is the kind clients never think about.
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.42)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8 }}>
                    <MapPin size={11} /> {personalInfo.location}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '6px 14px', fontSize: 12, fontFamily: 'monospace', color: '#34d399', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.18)', borderRadius: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 6px #34d399', animation: 'pulse 2s ease-in-out infinite' }} />
                    Open to freelance
                  </span>
                  <a href={`mailto:${personalInfo.email}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '6px 14px', fontSize: 12, fontFamily: 'monospace', color: '#a78bfa', background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.18)', borderRadius: 8, textDecoration: 'none' }}>
                    <Mail size={11} /> {personalInfo.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats — 2×2 grid */}
          <motion.div {...fade(0.1)}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(255,255,255,0.06)', height: '100%', borderRadius: 16, overflow: 'hidden', position: 'relative' }}>
              {/* Top accent line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.5), transparent)', zIndex: 1 }} />
              {stats.map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.12 + i * 0.07, duration: 0.45 }}
                  style={{ background: '#0d0d0d', padding: '2rem 1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                  <div style={{ fontSize: 38, fontWeight: 900, color: '#fff', fontFamily: 'monospace', lineHeight: 1, letterSpacing: '-0.03em' }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)', marginTop: 8, fontFamily: 'monospace', letterSpacing: '0.09em', textTransform: 'uppercase' as const, lineHeight: 1.4 }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Row 2 — Stack · Principles · CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 12 }}>

          {/* Daily tools */}
          <motion.div {...fade(0.14)}>
            <div style={{ ...card, padding: '1.75rem', height: '100%', position: 'relative', overflow: 'hidden' }} {...hover}>
              {/* Top accent */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.4), transparent)' }} />
              <p style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.22)', marginBottom: '1.25rem' }}>Daily tools</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {topStack.map((t, i) => (
                  <motion.div key={t.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.06 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: t.color, boxShadow: `0 0 8px ${t.color}80`, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, fontFamily: 'monospace', color: 'rgba(255,255,255,0.55)' }}>{t.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* How I work */}
          <motion.div {...fade(0.18)}>
            <div style={{ ...card, padding: '1.75rem', height: '100%', position: 'relative', overflow: 'hidden' }} {...hover}>
              {/* Top accent */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.4), transparent)' }} />
              <p style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.22)', marginBottom: '1.5rem' }}>How I work</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                {principles.map(p => (
                  <div key={p.num}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 5 }}>
                      <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(124,58,237,0.55)', flexShrink: 0 }}>{p.num}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.82)', letterSpacing: '-0.01em' }}>{p.title}</span>
                    </div>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 1.65, paddingLeft: 22, margin: 0 }}>{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Let's work together */}
          <motion.div {...fade(0.22)} className="sm:col-span-2 lg:col-span-1">
            <div style={{ ...card, padding: '1.75rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }} {...hover}>
              {/* Top accent */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.5), transparent)' }} />
              {/* Bottom-right glow */}
              <div style={{ position: 'absolute', bottom: -20, right: -20, width: 200, height: 200, background: 'radial-gradient(circle, rgba(124,58,237,0.14), transparent 70%)', pointerEvents: 'none' }} />

              <div style={{ position: 'relative' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 10px #34d399', marginBottom: 18, animation: 'pulse 2s ease-in-out infinite' }} />
                <p style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.22)', marginBottom: 12 }}>Open for work</p>
                <p style={{ fontSize: 19, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: 14 }}>
                  Let's build something great.
                </p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.65, margin: 0 }}>
                  Open to freelance projects, product collabs, and full-time opportunities.
                </p>
              </div>

              <a href="#contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: '2rem', fontSize: 12, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.06em', color: '#a78bfa', textDecoration: 'none', position: 'relative' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#c4b5fd')}
                onMouseLeave={e => (e.currentTarget.style.color = '#a78bfa')}>
                Get in touch <ArrowUpRight size={13} />
              </a>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
