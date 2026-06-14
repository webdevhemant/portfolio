import { motion } from 'framer-motion'
import { MapPin, Mail, ArrowUpRight } from 'lucide-react'
import SectionBackdrop from '../ui/SectionBackdrop'
import RevealText from '../ui/RevealText'
import { personalInfo, focusAreas } from '../../data/portfolio'

const principles = [
  { num: '01', title: 'Ship fast, iterate faster', body: "I'd rather put something real in front of users than perfect something no one's seen." },
  { num: '02', title: 'Design is in the details', body: 'The 5px that nobody notices is the reason the whole thing feels right.' },
  { num: '03', title: 'Code that explains itself', body: 'If you need a comment to understand it, the function name is probably wrong.' },
]

const ACCENTS = ['#a78bfa', '#38bdf8', '#34d399']

function fade(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 } as const,
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once: true },
    transition: { duration: 0.5, delay, ease: 'easeOut' as const },
  }
}

export default function About() {
  return (
    <section id="about" style={{ background: '#000', padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>
      <SectionBackdrop colors={['#7c3aed', '#38bdf8', '#a78bfa']} intensity={0.8} />

      <div className="container-xl" style={{ position: 'relative', zIndex: 2 }}>

        {/* Header */}
        <motion.div {...fade()} style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <div style={{ width: 28, height: 1, background: 'rgba(167,139,250,0.4)' }} />
            <span style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: 'rgba(167,139,250,0.65)' }}>About</span>
            <div style={{ width: 28, height: 1, background: 'rgba(167,139,250,0.4)' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(2rem,4.5vw,3.25rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0 }}>
            <RevealText parts={[{ text: 'I turn designs into fast,' }, { text: 'living interfaces.', gradient: true }]} />
          </h2>
        </motion.div>

        {/* Main — intro (left) + focus list (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr]" style={{ gap: 28, alignItems: 'stretch' }}>

          {/* Intro */}
          <motion.div {...fade(0.06)}>
            <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.35rem)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, letterSpacing: '-0.01em', marginBottom: '1.5rem' }}>
                {personalInfo.bio}
              </p>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.42)', lineHeight: 1.8, marginBottom: '2rem', maxWidth: 560 }}>
                I've spent <span style={{ color: '#a78bfa', fontWeight: 600 }}>3+ years</span> turning Figma files and rough ideas into fast, responsive React apps — from marketing sites to data-dense dashboards. I obsess over the small stuff: spacing, easing curves, and the moment an interaction just feels right.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}>
                  <MapPin size={11} /> {personalInfo.location}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 14px', fontSize: 12, fontFamily: 'monospace', color: '#34d399', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 6px #34d399', animation: 'pulse 2s ease-in-out infinite' }} />
                  Open to freelance
                </span>
                <a href={`mailto:${personalInfo.email}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 14px', fontSize: 12, fontFamily: 'monospace', color: '#a78bfa', background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 8, textDecoration: 'none' }}>
                  <Mail size={11} /> {personalInfo.email}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Focus areas */}
          <motion.div {...fade(0.12)} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {focusAreas.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                whileHover={{ x: 4 }}
                style={{ position: 'relative', flex: 1, padding: '1.25rem 1.4rem', borderRadius: 14, background: 'rgba(13,13,25,0.55)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.09)', overflow: 'hidden' }}
              >
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: ACCENTS[i % ACCENTS.length], boxShadow: `0 0 12px ${ACCENTS[i % ACCENTS.length]}` }} />
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontFamily: 'monospace', color: ACCENTS[i % ACCENTS.length] }}>{`0${i + 1}`}</span>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>{f.title}</h3>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.42)', lineHeight: 1.6, paddingLeft: 22 }}>{f.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Principles */}
        <div style={{ marginTop: 48, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.08)' }} className="grid grid-cols-1 sm:grid-cols-3" >
          {principles.map((p, i) => (
            <motion.div key={p.num}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ padding: '0 1.5rem', borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.07)' }}
            >
              <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(124,58,237,0.7)' }}>{p.num}</span>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em', margin: '8px 0 8px' }}>{p.title}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.65 }}>{p.body}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div {...fade(0.1)} style={{ marginTop: 40, textAlign: 'center' }}>
          <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.05em', color: '#a78bfa', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#c4b5fd')} onMouseLeave={e => (e.currentTarget.style.color = '#a78bfa')}>
            Let's build something great <ArrowUpRight size={14} />
          </a>
        </motion.div>

      </div>
    </section>
  )
}
