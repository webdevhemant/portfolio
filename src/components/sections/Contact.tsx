import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowRight, ArrowUpRight, CheckCircle } from 'lucide-react'
import { GithubIcon, TwitterIcon, UpworkIcon } from '../ui/SocialIcons'
import SectionBackdrop from '../ui/SectionBackdrop'
import RevealText from '../ui/RevealText'
import { personalInfo } from '../../data/portfolio'

const connect = [
  { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, accent: '#a78bfa', ext: false },
  { icon: UpworkIcon, label: 'Upwork', value: 'Hire me on Upwork', href: personalInfo.upwork, accent: '#34d399', ext: true },
  { icon: GithubIcon, label: 'GitHub', value: 'webdevhemant', href: personalInfo.github, accent: '#e5e7eb', ext: true },
  { icon: TwitterIcon, label: 'Twitter', value: '@hemant', href: personalInfo.twitter, accent: '#38bdf8', ext: true },
]

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px 14px', fontSize: 13, fontFamily: 'monospace',
  color: '#fff', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 8, outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
}
function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.target.style.borderColor = 'rgba(167,139,250,0.7)'
  e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.16)'
}
function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.target.style.borderColor = 'rgba(255,255,255,0.12)'
  e.target.style.boxShadow = 'none'
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent'>('idle')
  const sectionRef = useRef<HTMLDivElement>(null)
  const spotRef = useRef<HTMLDivElement>(null)

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!sectionRef.current || !spotRef.current) return
    const r = sectionRef.current.getBoundingClientRect()
    spotRef.current.style.background = `radial-gradient(600px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(124,58,237,0.14), transparent 60%)`
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
    <section id="contact" ref={sectionRef} onMouseMove={onMove} onMouseLeave={() => { if (spotRef.current) spotRef.current.style.background = 'transparent' }}
      style={{ background: '#000', padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>
      <SectionBackdrop colors={['#7c3aed', '#38bdf8', '#a78bfa']} intensity={0.8} />
      <div ref={spotRef} style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', transition: 'background 0.15s' }} />

      <div className="container-xl" style={{ position: 'relative', zIndex: 2, maxWidth: 920 }}>
        {/* Header */}
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <div style={{ width: 28, height: 1, background: 'rgba(167,139,250,0.4)' }} />
            <span style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.7)' }}>Get in touch</span>
            <div style={{ width: 28, height: 1, background: 'rgba(167,139,250,0.4)' }} />
          </motion.div>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(2.25rem,5.5vw,4rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.035em', lineHeight: 1.02, marginBottom: 16 }}>
            <RevealText parts={[{ text: "Let's work" }, { text: 'together.', gradient: true }]} />
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 460, margin: '0 auto 22px' }}>
            Open to freelance work and collaborations. Reach me directly, or send a message below — I reply within 24 hours.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <span style={{ position: 'relative', display: 'flex', width: 8, height: 8 }}>
              <motion.span aria-hidden animate={{ scale: [1, 2], opacity: [0.5, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#34d399' }} />
              <span style={{ position: 'relative', width: 8, height: 8, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399' }} />
            </span>
            <span style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>Available for new projects</span>
          </motion.div>
        </motion.div>

        {/* Connect cards */}
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: 12, marginBottom: 16 }}>
          {connect.map(({ icon: Icon, label, value, href, accent, ext }) => (
            <motion.a key={label} variants={fadeUp} href={href} target={ext ? '_blank' : undefined} rel={ext ? 'noreferrer' : undefined}
              whileHover={{ y: -4 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '18px', borderRadius: 14, background: 'rgba(13,13,20,0.6)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.09)', textDecoration: 'none', transition: 'border-color 0.25s, box-shadow 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${accent}55`; e.currentTarget.style.boxShadow = `0 18px 50px rgba(0,0,0,0.4), 0 0 30px ${accent}22` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.boxShadow = 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, background: `${accent}14`, border: `1px solid ${accent}33`, color: accent }}>
                  <Icon size={18} />
                </div>
                <ArrowUpRight size={15} style={{ color: 'rgba(255,255,255,0.3)' }} />
              </div>
              <div>
                <div style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 13, fontFamily: 'monospace', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="animate-border-pan"
          style={{ borderRadius: 20, padding: 1.5, background: 'linear-gradient(120deg, rgba(167,139,250,0.6), rgba(56,189,248,0.4), rgba(244,114,182,0.35), rgba(167,139,250,0.6))', boxShadow: '0 40px 90px rgba(0,0,0,0.5)' }}>
          <div style={{ borderRadius: 19, background: 'rgba(8,8,12,0.9)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 14 }}>
                {[{ key: 'name', label: 'Name', type: 'text', placeholder: 'Your name' }, { key: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' }].map(f => (
                  <div key={f.key}>
                    <label style={{ display: 'block', fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 7 }}>{f.label}</label>
                    <input type={f.type} required value={form[f.key as keyof typeof form]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder}
                      style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 7 }}>Message</label>
                <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell me about your project..."
                  style={{ ...inputStyle, resize: 'none' }} onFocus={onFocus} onBlur={onBlur} />
              </div>
              <motion.button type="submit" disabled={status !== 'idle'}
                whileHover={status === 'idle' ? { y: -2, boxShadow: '0 12px 40px rgba(255,255,255,0.22)' } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                style={{ width: '100%', padding: '14px', fontSize: 12, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', borderRadius: 10, cursor: status === 'idle' ? 'pointer' : 'not-allowed', transition: 'background 0.3s, color 0.3s, border-color 0.3s', border: '1px solid',
                  background: status === 'sent' ? 'rgba(16,185,129,0.15)' : '#fff',
                  color: status === 'sent' ? '#34d399' : '#000',
                  borderColor: status === 'sent' ? 'rgba(16,185,129,0.35)' : '#fff',
                }}>
                <AnimatePresence mode="wait">
                  {status === 'sent' ? (
                    <motion.span key="sent" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      <CheckCircle size={14} /> Message Sent!
                    </motion.span>
                  ) : status === 'loading' ? (
                    <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid rgba(0,0,0,0.25)', borderTop: '2px solid #000', borderRadius: '50%' }} />
                      Sending...
                    </motion.span>
                  ) : (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                      Send Message
                      <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ArrowRight size={14} /></motion.span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
