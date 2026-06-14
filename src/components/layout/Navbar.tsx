import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { personalInfo } from '../../data/portfolio'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const SM = 640 // below this -> mobile hamburger menu

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const check = () => {
      const isMobile = window.innerWidth < SM
      setMobile(isMobile)
      if (!isMobile) setOpen(false)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(`#${e.target.id}`) }),
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    links.forEach(({ href }) => { const el = document.querySelector(href); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const pillStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', width: '100%',
    gap: mobile ? 0 : 18,
    justifyContent: mobile ? 'space-between' : 'flex-start',
    padding: mobile ? '10px 16px' : '8px 12px 8px 18px',
    background: scrolled ? 'rgba(0,0,0,0.92)' : 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 9999,
    boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
    transition: 'background 0.3s, box-shadow 0.3s',
  }

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      style={{ position: 'fixed', top: 20, left: 0, right: 0, zIndex: 100, display: 'flex', justifyContent: 'center', padding: '0 12px', pointerEvents: 'none' }}
    >
      <div style={{ pointerEvents: 'auto', width: mobile ? '100%' : 'auto', maxWidth: '100%' }}>
        <div style={pillStyle}>
          {/* Logo */}
          <a href="#" style={{ fontWeight: 900, fontSize: 18, letterSpacing: '-0.03em', textDecoration: 'none', flexShrink: 0 }}>
            <span style={{ background: 'linear-gradient(135deg,#a78bfa,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {personalInfo.name.charAt(0)}
            </span>
            <span style={{ color: '#a78bfa' }}>.</span>
          </a>

          {/* Desktop links + CTA (>= sm) */}
          {!mobile && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {links.map((link) => {
                  const isActive = active === link.href
                  return (
                    <a key={link.href} href={link.href} style={{
                      position: 'relative', padding: '6px 11px', fontSize: 12, fontFamily: 'monospace', letterSpacing: '0.03em',
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
                      textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.25s',
                    }}>
                      {isActive && (
                        <motion.span layoutId="nav-active" transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          style={{ position: 'absolute', inset: 0, background: 'rgba(124,58,237,0.22)', border: '1px solid rgba(124,58,237,0.35)', borderRadius: 9999, zIndex: 0 }} />
                      )}
                      <span style={{ position: 'relative', zIndex: 1 }}>{link.label}</span>
                    </a>
                  )
                })}
              </div>
              <a href="#contact" style={{
                flexShrink: 0, padding: '7px 16px', fontSize: 12, fontFamily: 'monospace',
                fontWeight: 700, letterSpacing: '0.05em', color: '#000', background: '#fff',
                borderRadius: 9999, textDecoration: 'none', transition: 'opacity 0.2s', whiteSpace: 'nowrap',
              }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                Hire Me
              </a>
            </>
          )}

          {/* Mobile hamburger (< sm) */}
          {mobile && (
            <button onClick={() => setOpen(!open)} aria-label="Menu"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: 'rgba(255,255,255,0.75)', cursor: 'pointer', padding: 4, flexShrink: 0 }}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobile && open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              style={{ marginTop: 8, padding: '12px 16px', background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16 }}
            >
              {links.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setOpen(false)} style={{
                  display: 'block', padding: '10px 4px', fontSize: 14, fontFamily: 'monospace',
                  color: active === link.href ? '#fff' : 'rgba(255,255,255,0.6)',
                  textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}>
                  {link.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} style={{
                display: 'block', marginTop: 10, padding: '10px 16px', textAlign: 'center',
                fontSize: 13, fontFamily: 'monospace', fontWeight: 700, color: '#000', background: '#fff', borderRadius: 9999, textDecoration: 'none',
              }}>
                Hire Me
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
