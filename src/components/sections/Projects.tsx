import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '../ui/SocialIcons'
import SectionBackdrop from '../ui/SectionBackdrop'
import RevealText from '../ui/RevealText'
import { projects } from '../../data/portfolio'

type Project = (typeof projects)[number]

const PREVIEW_WIDTH = 1280 // virtual desktop width the iframe renders at

/** Live, scaled-down preview of the deployed site. Loads only after first hover. */
function LivePreview({ project, height }: { project: Project; height: number }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.3)
  const [loaded, setLoaded] = useState(false)
  const [active, setActive] = useState(false) // becomes true on first hover -> mounts iframe

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setScale(el.clientWidth / PREVIEW_WIDTH))
    ro.observe(el)
    setScale(el.clientWidth / PREVIEW_WIDTH)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => setActive(true)}
      style={{
        height,
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
        background: `radial-gradient(120% 120% at 30% 0%, ${project.accent}26, #07070c 60%)`,
      }}
    >
      {/* Branded poster — title watermark, always present behind the frame */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: loaded ? 0 : 1,
          transition: 'opacity 0.5s ease',
        }}
      >
        <span
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.75rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            color: '#fff',
            opacity: 0.07,
            whiteSpace: 'nowrap',
          }}
        >
          {project.title}
        </span>
      </div>

      {active && (
        <iframe
          src={project.live}
          title={project.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          tabIndex={-1}
          onLoad={() => setLoaded(true)}
          style={{
            width: PREVIEW_WIDTH,
            height: PREVIEW_WIDTH * 0.72,
            border: 0,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            pointerEvents: 'none',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        />
      )}

      {/* readability + accent overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 45%, rgba(7,7,12,0.85) 92%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`, boxShadow: `0 0 16px ${project.accent}`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 14, left: 16, display: 'flex', gap: 6 }}>
        {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
          <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.85 }} />
        ))}
      </div>
    </div>
  )
}

/** 3D-tilt glass card following the pointer. */
function ProjectCard({ project, previewHeight, large }: { project: Project; previewHeight: number; large?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 250, damping: 22 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 250, damping: 22 })
  const [hover, setHover] = useState(false)

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  function onLeave() { mx.set(0); my.set(0); setHover(false) }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseEnter={() => setHover(true)} onMouseLeave={onLeave} style={{ perspective: 1000, height: '100%' }}>
      <motion.div
        style={{
          rotateX: rx,
          rotateY: ry,
          transformStyle: 'preserve-3d',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 16,
          overflow: 'hidden',
          background: 'rgba(13,13,25,0.55)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: `1px solid ${hover ? project.accent + '55' : 'rgba(255,255,255,0.09)'}`,
          boxShadow: hover ? `0 30px 70px rgba(0,0,0,0.55), 0 0 50px ${project.accent}22` : '0 12px 40px rgba(0,0,0,0.35)',
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}
      >
        <LivePreview project={project} height={previewHeight} />

        <div style={{ padding: large ? '1.5rem 1.6rem' : '1.25rem 1.4rem', display: 'flex', flexDirection: 'column', flex: 1, transform: 'translateZ(40px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <h3 style={{ fontSize: large ? 21 : 17, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>{project.title}</h3>
            <div style={{ display: 'flex', gap: 12 }}>
              <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} source`} style={{ color: 'rgba(255,255,255,0.4)', display: 'flex' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
                <GithubIcon size={16} />
              </a>
              <a href={project.live} target="_blank" rel="noreferrer" aria-label={`${project.title} live`} style={{ color: 'rgba(255,255,255,0.4)', display: 'flex' }} onMouseEnter={(e) => (e.currentTarget.style.color = project.accent)} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <p style={{ fontSize: large ? 14 : 13, color: 'rgba(255,255,255,0.46)', lineHeight: 1.65, marginBottom: '1.1rem', flex: 1 }}>{project.description}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {project.tags.map((tag) => (
              <span key={tag} style={{ padding: '3px 10px', fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', background: `${project.accent}10`, border: `1px solid ${project.accent}22`, borderRadius: 6 }}>{tag}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="projects" style={{ background: '#000', padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>
      <SectionBackdrop />

      <div className="container-xl" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <div style={{ width: 28, height: 1, background: 'rgba(167,139,250,0.4)' }} />
            <span style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.7)' }}>Selected Work</span>
            <div style={{ width: 28, height: 1, background: 'rgba(167,139,250,0.4)' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(2.25rem,5vw,3.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 12 }}>
            <RevealText parts={[{ text: 'The' }, { text: 'Haxon', gradient: true }, { text: 'suite' }]} />
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, maxWidth: 460, margin: '0 auto' }}>
            A family of products I designed and shipped to production — hover any card to load the live site.
          </p>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 18, marginBottom: 18 }}>
          {featured.map((p) => (
            <motion.div key={p.id} variants={item}>
              <ProjectCard project={p} previewHeight={260} large />
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 18 }}>
          {rest.map((p) => (
            <motion.div key={p.id} variants={item} style={{ height: '100%' }}>
              <ProjectCard project={p} previewHeight={190} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
