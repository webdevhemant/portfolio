import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { experiences } from '../../data/portfolio'

function Beam({ count }: { count: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const H = count * 200

  return (
    <div ref={ref} style={{ width: 24, flexShrink: 0, position: 'relative', paddingTop: 6 }}>
      <svg width={24} height={H} viewBox={`0 0 24 ${H}`} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="bgrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
          </linearGradient>
          <filter id="bglow">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Track */}
        <line x1="12" y1="0" x2="12" y2={H} stroke="rgba(255,255,255,0.07)" strokeWidth="2" />

        {/* Animated fill */}
        <motion.line x1="12" y1="0" x2="12" y2={H}
          stroke="url(#bgrad)" strokeWidth="2" strokeLinecap="round" filter="url(#bglow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 2.2, ease: 'easeInOut', delay: 0.2 }}
        />

        {/* Nodes */}
        {Array.from({ length: count }).map((_, i) => (
          <g key={i}>
            <motion.circle cx="12" cy={i * 200 + 20} r="7" fill="#000" stroke="#7c3aed" strokeWidth="2" filter="url(#bglow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.35, type: 'spring', stiffness: 280 }}
            />
            <motion.circle cx="12" cy={i * 200 + 20} r="3" fill="#7c3aed"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.55 + i * 0.35 }}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" style={{ background: '#050505', padding: '7rem 0', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(124,58,237,0.04) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div className="container-xl" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <div style={{ width: 28, height: 1, background: 'rgba(167,139,250,0.4)' }} />
            <span style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: 'rgba(167,139,250,0.65)' }}>Experience</span>
            <div style={{ width: 28, height: 1, background: 'rgba(167,139,250,0.4)' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(2.25rem,5vw,3.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 12 }}>
            The <span className="gradient-text">journey</span> so far
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15, maxWidth: 440, margin: '0 auto' }}>
            4+ years of building, shipping, and iterating on products that matter.
          </p>
        </motion.div>

        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', gap: 28 }}>
          {/* Beam — hidden on mobile */}
          <div className="hidden sm:block">
            <Beam count={experiences.length} />
          </div>

          {/* Cards */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {experiences.map((exp, i) => (
              <motion.div key={exp.company}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15, ease: 'easeOut' }}
                whileHover={{ borderColor: 'rgba(255,255,255,0.2)' }}
                style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '1.5rem', transition: 'border-color 0.25s' }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontSize: 17, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>{exp.role}</h3>
                    <span style={{ fontSize: 13, fontWeight: 600, background: 'linear-gradient(90deg,#a78bfa,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{exp.company}</span>
                  </div>
                  <span style={{ padding: '4px 12px', fontSize: 11, fontFamily: 'monospace', color: 'rgba(167,139,250,0.8)', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.22)', flexShrink: 0 }}>
                    {exp.period}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: '1rem' }}>{exp.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {exp.highlights.map(h => (
                    <span key={h} style={{ padding: '4px 10px', fontSize: 11, fontFamily: 'monospace', color: '#67e8f9', background: 'rgba(6,182,212,0.07)', border: '1px solid rgba(6,182,212,0.18)' }}>
                      {h}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Open to work */}
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '1rem 1.25rem', borderLeft: '2px solid rgba(52,211,153,0.4)' }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 10px #34d399' }} />
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#34d399', animation: 'pulse 2s ease-in-out infinite', opacity: 0.4 }} />
              </div>
              <span style={{ fontSize: 14, color: '#34d399', fontWeight: 600 }}>Open to new opportunities</span>
              <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.25)' }}>· Remote friendly</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
