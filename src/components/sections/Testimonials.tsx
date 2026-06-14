import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import Marquee from '../ui/Marquee'
import SectionBackdrop from '../ui/SectionBackdrop'
import RevealText from '../ui/RevealText'
import { testimonials } from '../../data/portfolio'

const GRAD = [
  'linear-gradient(135deg,#7c3aed,#06b6d4)',
  'linear-gradient(135deg,#ec4899,#7c3aed)',
  'linear-gradient(135deg,#06b6d4,#10b981)',
]

function TestCard({ t, i }: { t: typeof testimonials[0]; i: number }) {
  return (
    <div style={{ width: 320, flexShrink: 0, background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '1.25rem', userSelect: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Quote size={16} style={{ color: '#7c3aed', flexShrink: 0 }} />
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, flex: 1 }}>"{t.content}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: GRAD[i % GRAD.length], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#fff', flexShrink: 0 }}>
          {t.avatar}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{t.name}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 1 }}>{t.role}</div>
        </div>
      </div>
    </div>
  )
}

const row1 = [
  <TestCard key="t0" t={testimonials[0]} i={0} />,
  <TestCard key="t1" t={testimonials[1]} i={1} />,
  <TestCard key="t2" t={testimonials[2]} i={2} />,
]
const row2 = [
  <TestCard key="t2b" t={testimonials[2]} i={2} />,
  <TestCard key="t0b" t={testimonials[0]} i={0} />,
  <TestCard key="t1b" t={testimonials[1]} i={1} />,
]

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ background: '#000', padding: '7rem 0', overflow: 'hidden', position: 'relative' }}>
      <SectionBackdrop colors={['#ec4899', '#7c3aed', '#22d3ee']} intensity={0.8} />
      <div className="container-xl" style={{ marginBottom: '3.5rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <div style={{ width: 28, height: 1, background: 'rgba(167,139,250,0.4)' }} />
            <span style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: 'rgba(167,139,250,0.65)' }}>Testimonials</span>
            <div style={{ width: 28, height: 1, background: 'rgba(167,139,250,0.4)' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(2.25rem,5vw,3.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 12 }}>
            <RevealText parts={[{ text: 'What clients' }, { text: 'say', gradient: true }]} />
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15, maxWidth: 440, margin: '0 auto' }}>
            Real words from real people who trusted me with their products.
          </p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'relative', zIndex: 1 }}>
        <Marquee items={row1} direction="left" speed={38} gap={14} />
        <Marquee items={row2} direction="right" speed={32} gap={14} />
      </motion.div>
    </section>
  )
}
