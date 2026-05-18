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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && setActive(`#${e.target.id}`)),
      { threshold: 0.5 }
    )
    links.forEach(({ href }) => { const el = document.querySelector(href); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 100, width: 'calc(100% - 2rem)', maxWidth: 620 }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 20px',
        background: scrolled ? 'rgba(0,0,0,0.92)' : 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 9999,
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
        transition: 'all 0.3s',
      }}>
        {/* Logo */}
        <a href="#" style={{ fontWeight: 900, fontSize: 18, letterSpacing: '-0.03em', textDecoration: 'none' }}>
          <span style={{ background: 'linear-gradient(135deg,#a78bfa,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {personalInfo.name.charAt(0)}
          </span>
          <span style={{ color: '#a78bfa' }}>.</span>
        </a>

        {/* Desktop links */}
        <div style={{ alignItems: 'center', gap: 4 }} className="hidden md:flex">
          {links.map(link => (
            <a key={link.href} href={link.href} style={{
              position: 'relative', padding: '6px 14px', fontSize: 12,
              fontFamily: 'monospace', letterSpacing: '0.05em',
              color: active === link.href ? '#fff' : 'rgba(255,255,255,0.45)',
              textDecoration: 'none', borderRadius: 9999,
              background: active === link.href ? 'rgba(124,58,237,0.2)' : 'transparent',
              transition: 'all 0.2s',
            }}>
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a href="#contact" className="hidden md:block" style={{
            padding: '7px 16px', fontSize: 12, fontFamily: 'monospace',
            fontWeight: 700, letterSpacing: '0.05em', color: '#000',
            background: '#fff', borderRadius: 6, textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}>
            Hire Me
          </a>
          <button onClick={() => setOpen(!open)} className="md:hidden" style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            style={{
              marginTop: 8, padding: '12px 16px',
              background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16,
            }}
          >
            {links.map(link => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} style={{
                display: 'block', padding: '10px 4px', fontSize: 14,
                fontFamily: 'monospace', color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}>
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} style={{
              display: 'block', marginTop: 10, padding: '10px 16px', textAlign: 'center',
              fontSize: 13, fontFamily: 'monospace', fontWeight: 700,
              color: '#000', background: '#fff', borderRadius: 8, textDecoration: 'none',
            }}>
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
