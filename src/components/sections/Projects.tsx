import { useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from '../ui/SocialIcons'
import { projects } from '../../data/portfolio'

const ACCENT = ['#7c3aed', '#06b6d4']

function TiltCard({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotX = useTransform(y, [-0.5, 0.5], [6, -6])
  const rotY = useTransform(x, [-0.5, 0.5], [-6, 6])

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }

  function onLeave() { x.set(0); y.set(0) }

  const color = ACCENT[index % ACCENT.length]

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ perspective: 800 }}>
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        whileHover={{ boxShadow: `0 24px 60px rgba(0,0,0,0.6), 0 0 40px ${color}25` }}
      >
        {children}
      </motion.div>
    </div>
  )
}

function SpotCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const color = ACCENT[index % ACCENT.length]

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return
    const r = cardRef.current.getBoundingClientRect()
    const px = e.clientX - r.left, py = e.clientY - r.top
    cardRef.current.style.background = `radial-gradient(500px circle at ${px}px ${py}px, ${color}14, #0d0d0d 60%)`
  }

  return (
    <div ref={cardRef} onMouseMove={onMove} onMouseLeave={() => { if (cardRef.current) cardRef.current.style.background = '#0d0d0d' }}
      style={{ height: '100%', background: '#0d0d0d', border: `1px solid rgba(255,255,255,0.1)`, borderRadius: 16, overflow: 'hidden', position: 'relative', transition: 'border-color 0.25s', display: 'flex', flexDirection: 'column' }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${color}50` }}
    >
      {/* top accent line */}
      <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${color}, transparent)`, boxShadow: `0 0 12px ${color}` }} />

      {/* image */}
      <div style={{ height: 200, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
        <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55) saturate(0.7)', transition: 'transform 0.5s, filter 0.3s' }}
          onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = 'scale(1.04)'; (e.target as HTMLImageElement).style.filter = 'brightness(0.7) saturate(0.9)' }}
          onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = 'scale(1)'; (e.target as HTMLImageElement).style.filter = 'brightness(0.55) saturate(0.7)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, #0d0d0d)' }} />
        <div style={{ position: 'absolute', top: 14, left: 14 }}>
          <span style={{ padding: '4px 10px', fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color, background: `${color}15`, border: `1px solid ${color}35` }}>
            Featured
          </span>
        </div>
      </div>

      {/* content */}
      <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{project.title}</h3>
          <div style={{ display: 'flex', gap: 12, marginLeft: 12, flexShrink: 0 }}>
            <a href={project.github} style={{ color: 'rgba(255,255,255,0.3)' }} onMouseEnter={e => (e.currentTarget.style.color = '#fff')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}>
              <GithubIcon size={15} />
            </a>
            <a href={project.live} style={{ color: 'rgba(255,255,255,0.3)' }} onMouseEnter={e => (e.currentTarget.style.color = '#fff')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, marginBottom: '1rem', flex: 1 }}>{project.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.tags.map(tag => (
            <span key={tag} style={{ padding: '3px 10px', fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function SmallCard({ project }: { project: typeof projects[0] }) {
  return (
    <motion.div
      whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.2)', boxShadow: '0 12px 40px rgba(0,0,0,0.4)' }}
      style={{ padding: '1.25rem 1.5rem', background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, transition: 'all 0.25s' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>{project.title}</h3>
        <div style={{ display: 'flex', gap: 10 }}>
          <a href={project.github} style={{ color: 'rgba(255,255,255,0.3)' }}><GithubIcon size={14} /></a>
          <a href={project.live} style={{ color: 'rgba(255,255,255,0.3)' }}><ExternalLink size={14} /></a>
        </div>
      </div>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: '0.75rem' }}>{project.description}</p>
      <div style={{ display: 'flex', gap: 6 }}>
        {project.tags.slice(0, 3).map(t => <span key={t} style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)' }}>{t}</span>)}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const featured = projects.filter(p => p.featured)
  const rest = projects.filter(p => !p.featured)

  return (
    <section id="projects" style={{ background: '#000', padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)', backgroundSize: '50px 50px', pointerEvents: 'none' }} />

      <div className="container-xl" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <div style={{ width: 28, height: 1, background: 'rgba(167,139,250,0.4)' }} />
            <span style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: 'rgba(167,139,250,0.65)' }}>Projects</span>
            <div style={{ width: 28, height: 1, background: 'rgba(167,139,250,0.4)' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(2.25rem,5vw,3.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 12 }}>
            Work I'm <span className="gradient-text">proud of</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15, maxWidth: 440, margin: '0 auto' }}>
            Products, tools, and experiments built with care and shipped to production.
          </p>
        </motion.div>

        {/* Featured 2-col */}
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 16, marginBottom: 16 }}>
          {featured.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}>
              <TiltCard index={i}>
                <SpotCard project={p} index={i} />
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Smaller row */}
        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 12 }}>
          {rest.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
              <SmallCard project={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
