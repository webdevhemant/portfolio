import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { GithubIcon, TwitterIcon, UpworkIcon } from '../ui/SocialIcons'
import { personalInfo } from '../../data/portfolio'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { icon: GithubIcon, href: personalInfo.github, label: 'GitHub' },
  { icon: TwitterIcon, href: personalInfo.twitter, label: 'Twitter' },
  { icon: UpworkIcon, href: personalInfo.upwork, label: 'Upwork' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

/* Link with a Framer Motion underline that wipes in on hover */
function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <motion.a href={href} initial="rest" whileHover="hover" animate="rest"
      style={{ position: 'relative', fontSize: 13, fontFamily: 'monospace', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', display: 'inline-block' }}>
      <motion.span variants={{ rest: { color: 'rgba(255,255,255,0.45)' }, hover: { color: '#fff' } }}>{label}</motion.span>
      <motion.span
        variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'absolute', left: 0, bottom: -4, height: 1, width: '100%', transformOrigin: 'left', background: 'linear-gradient(90deg,#a78bfa,#38bdf8)' }}
      />
    </motion.a>
  )
}

/* Social icon that magnetically follows the cursor */
function MagneticSocial({ icon: Icon, href, label }: { icon: typeof GithubIcon; href: string; label: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 18 })
  const sy = useSpring(y, { stiffness: 300, damping: 18 })

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.4)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4)
  }
  function onLeave() { x.set(0); y.set(0) }

  return (
    <motion.a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ x: sx, y: sy, width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, textDecoration: 'none' }}
      whileHover={{ scale: 1.15, color: '#fff', borderColor: 'rgba(167,139,250,0.5)', boxShadow: '0 0 24px rgba(124,58,237,0.35)' }}
      whileTap={{ scale: 0.92 }}>
      <Icon size={16} />
    </motion.a>
  )
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: '#000', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '5rem', paddingBottom: '2.5rem' }}>
      {/* Animated ambient glow */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.5, 0.85, 0.5], x: ['-6%', '6%', '-6%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: -160, left: '50%', width: 700, height: 360, transform: 'translateX(-50%)', background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.22), transparent 70%)', pointerEvents: 'none' }}
      />

      <div className="container-xl relative z-10">
        {/* Brand + links + socials */}
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between" style={{ gap: 28, marginBottom: '2.5rem' }}>
          <motion.div variants={item}>
            <a href="#" style={{ textDecoration: 'none', fontSize: 'clamp(1.75rem,4vw,2.5rem)', fontWeight: 900, letterSpacing: '-0.04em' }}>
              <span style={{ background: 'linear-gradient(135deg,#a78bfa,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{personalInfo.name}</span>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>.</span>
            </a>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 8, maxWidth: 320, lineHeight: 1.6 }}>
              Frontend developer crafting fast, polished web interfaces.
            </p>
          </motion.div>

          <motion.nav variants={item} className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {links.map((l) => <FooterLink key={l.href} {...l} />)}
          </motion.nav>

          <motion.div variants={item} className="flex items-center gap-3">
            {socials.map((s) => <MagneticSocial key={s.label} {...s} />)}
          </motion.div>
        </motion.div>

        {/* Animated divider */}
        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{ height: 1, width: '100%', transformOrigin: 'center', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }} />
      </div>

      <BackToTop />
    </footer>
  )
}

/* Fixed, bottom-right back-to-top button that appears after scrolling down */
function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          whileHover={{ y: -3, boxShadow: '0 0 28px rgba(124,58,237,0.55)' }}
          whileTap={{ scale: 0.92 }}
          style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 90, width: 46, height: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: '#fff', background: 'rgba(124,58,237,0.9)', border: '1px solid rgba(167,139,250,0.5)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', cursor: 'pointer' }}
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
