import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MapPin, ArrowRight, CheckCircle } from 'lucide-react'
import { GithubIcon, TwitterIcon, LinkedinIcon } from '../ui/SocialIcons'
import { personalInfo } from '../../data/portfolio'

const socials = [
  { icon: GithubIcon, href: personalInfo.github, label: 'GitHub' },
  { icon: TwitterIcon, href: personalInfo.twitter, label: 'Twitter' },
  { icon: LinkedinIcon, href: personalInfo.linkedin, label: 'LinkedIn' },
]

const INPUT = {
  width: '100%', padding: '11px 14px', fontSize: 13, fontFamily: 'monospace',
  color: '#fff', background: '#000', border: '1px solid rgba(255,255,255,0.12)',
  outline: 'none', transition: 'border-color 0.2s',
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent'>('idle')
  const sectionRef = useRef<HTMLDivElement>(null)

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!sectionRef.current) return
    const r = sectionRef.current.getBoundingClientRect()
    const x = e.clientX - r.left, y = e.clientY - r.top
    sectionRef.current.style.background = `radial-gradient(700px circle at ${x}px ${y}px, rgba(124,58,237,0.07), #000 55%)`
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => {
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    }, 1200)
  }

  return (
    <section id="contact" ref={sectionRef} onMouseMove={onMove} onMouseLeave={() => { if (sectionRef.current) sectionRef.current.style.background = '#000' }}
      style={{ background: '#000', padding: '7rem 0', position: 'relative', transition: 'background 0.1s' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, rgba(124,58,237,0.07) 0%, transparent 55%)', pointerEvents: 'none' }} />

      <div className="container-xl" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <div style={{ width: 28, height: 1, background: 'rgba(167,139,250,0.4)' }} />
            <span style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: 'rgba(167,139,250,0.65)' }}>Contact</span>
            <div style={{ width: 28, height: 1, background: 'rgba(167,139,250,0.4)' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(2.25rem,5vw,3.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 12 }}>
            Let's <span className="gradient-text">build together</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15, maxWidth: 440, margin: '0 auto' }}>
            Open to freelance work, collabs, and interesting opportunities.
          </p>
        </motion.div>

        <div style={{ maxWidth: 900, margin: '0 auto', border: '1px solid rgba(255,255,255,0.1)', background: '#0a0a0a', gap: 0 }} className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr]">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="border-b md:border-b-0 md:border-r" style={{ padding: '2.5rem', borderColor: 'rgba(255,255,255,0.08)' }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 8 }}>Get in touch</h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: '2rem', lineHeight: 1.6 }}>Drop me a message and I'll get back within 24h.</p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', fontSize: 12, fontFamily: 'monospace', color: '#34d399', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.22)', marginBottom: '2rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', animation: 'pulse 2s ease-in-out infinite' }} />
              Available for new projects
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: '2rem' }}>
              {[{ icon: Mail, text: personalInfo.email }, { icon: MapPin, text: `${personalInfo.location} · Open to remote` }].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.22)', flexShrink: 0 }}>
                    <Icon size={15} style={{ color: '#a78bfa' }} />
                  </div>
                  <span style={{ fontSize: 13, fontFamily: 'monospace', color: 'rgba(255,255,255,0.55)' }}>{text}</span>
                </div>
              ))}
            </div>

            <div>
              <p style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 10 }}>Find me on</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {socials.map(({ icon: Icon, href, label }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" whileHover={{ y: -3, scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.35)', background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', transition: 'color 0.2s' }}
                    aria-label={label}>
                    <Icon size={15} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ padding: '2.5rem' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 12 }}>
                {[{ key: 'name', label: 'Name', type: 'text', placeholder: 'Your name' }, { key: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' }].map(f => (
                  <div key={f.key}>
                    <label style={{ display: 'block', fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 6 }}>{f.label}</label>
                    <input type={f.type} required value={form[f.key as keyof typeof form]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder}
                      style={INPUT}
                      onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.6)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 6 }}>Message</label>
                <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell me about your project..."
                  style={{ ...INPUT, resize: 'none' } as React.CSSProperties}
                  onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.6)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                />
              </div>

              <motion.button type="submit" disabled={status !== 'idle'}
                whileHover={status === 'idle' ? { boxShadow: '0 0 30px rgba(124,58,237,0.4)' } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                style={{ width: '100%', padding: '13px', fontSize: 13, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.06em', cursor: status === 'idle' ? 'pointer' : 'not-allowed', border: 'none', transition: 'all 0.3s',
                  background: status === 'sent' ? 'rgba(16,185,129,0.15)' : 'rgba(124,58,237,0.85)',
                  color: status === 'sent' ? '#34d399' : '#fff',
                  outline: status === 'sent' ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(124,58,237,0.4)',
                }}
              >
                <AnimatePresence mode="wait">
                  {status === 'sent' ? (
                    <motion.span key="sent" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      <CheckCircle size={14} /> Message Sent!
                    </motion.span>
                  ) : status === 'loading' ? (
                    <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%' }} />
                      Sending...
                    </motion.span>
                  ) : (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                      SEND MESSAGE
                      <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ArrowRight size={14} /></motion.span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
