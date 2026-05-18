import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { GithubIcon, TwitterIcon, LinkedinIcon } from '../ui/SocialIcons'
import ScrollExpandMedia from '../ui/ScrollExpandMedia'
import { personalInfo, stats } from '../../data/portfolio'

const socials = [
  { icon: GithubIcon, href: personalInfo.github, label: 'GitHub' },
  { icon: TwitterIcon, href: personalInfo.twitter, label: 'Twitter' },
  { icon: LinkedinIcon, href: personalInfo.linkedin, label: 'LinkedIn' },
]

/* Floating dev-identity panels that live inside the cinematic hero */
const heroOverlay = (
  <>
    {/* Left: git status */}
    <motion.div
      initial={{ opacity: 0, x: -28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7, duration: 0.7 }}
      className="hidden lg:block"
      style={{ position: 'absolute', left: '2.5rem', top: '50%', transform: 'translateY(-50%)', zIndex: 5, pointerEvents: 'none' }}
    >
      <div style={{ background: 'rgba(0,0,0,0.62)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', padding: '16px 18px', borderRadius: 12, minWidth: 192 }}>
        <p style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase' as const, marginBottom: 12 }}>git status</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 15, color: '#a78bfa', lineHeight: 1 }}>⎇</span>
          <span style={{ fontFamily: 'monospace', fontSize: 13, color: '#fff', letterSpacing: '0.04em', fontWeight: 600 }}>main</span>
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#34d399', marginBottom: 6, letterSpacing: '0.04em' }}>✓ 3 files staged</div>
        <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.02em' }}>"feat: portfolio v3"</div>
        <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: 8 }}>
          {['React', 'Next.js', 'AI'].map(t => (
            <span key={t} style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(167,139,250,0.7)', background: 'rgba(124,58,237,0.12)', padding: '2px 7px', borderRadius: 4 }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>

    {/* Right: remote / online status */}
    <motion.div
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.9, duration: 0.7 }}
      className="hidden lg:block"
      style={{ position: 'absolute', right: '2.5rem', top: '50%', transform: 'translateY(-50%)', zIndex: 5, pointerEvents: 'none' }}
    >
      <div style={{ background: 'rgba(0,0,0,0.62)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', padding: '16px 18px', borderRadius: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399', animation: 'pulse 2s ease-in-out infinite' }} />
          <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#34d399', letterSpacing: '0.04em' }}>online · IST +5:30</span>
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 6 }}>remote-first developer</div>
        <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(167,139,250,0.65)' }}>open to freelance</div>
        <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.22)', marginBottom: 6 }}>SHIPPED</div>
          <div style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 900, color: '#fff', lineHeight: 1 }}>40+</div>
          <div style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>products</div>
        </div>
      </div>
    </motion.div>

    {/* Bottom bar: stack strip */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.6 }}
      style={{ position: 'absolute', bottom: '5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 5, pointerEvents: 'none', whiteSpace: 'nowrap' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 999, padding: '7px 18px' }}>
        {['React', 'Next.js', 'TypeScript', 'OpenAI', 'Tailwind'].map((t, i) => (
          <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em' }}>{t}</span>
            {i < 4 && <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 10 }}>·</span>}
          </span>
        ))}
      </div>
    </motion.div>
  </>
)

function HeroContent() {
  return (
    <div style={{ width: '100%', background: '#000', position: 'relative', overflow: 'hidden' }}>
      {/* Top glow connecting from hero */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '70%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(124,58,237,0.5),rgba(6,182,212,0.5),transparent)' }} />
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 300, background: 'radial-gradient(ellipse at top, rgba(124,58,237,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '5rem 1.5rem 4.5rem', position: 'relative', zIndex: 1 }}>

        {/* Main grid: identity left, stats right */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto]" style={{ alignItems: 'flex-start', gap: '4rem' }}>

          {/* Left */}
          <div>
            <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}
              style={{ fontSize: 'clamp(2.5rem,6vw,4.75rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.0, color: '#fff', marginBottom: '1.25rem' }}>
              {personalInfo.name},<br />
              <span style={{ background: 'linear-gradient(135deg,#a78bfa,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {personalInfo.role}
              </span>
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }}
              style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, maxWidth: 480, marginBottom: '2.25rem' }}>
              {personalInfo.tagline}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.28 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <a href="#projects" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', fontSize: 12, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#000', background: '#fff', textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                View Work <ArrowRight size={13} />
              </a>
              <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', fontSize: 12, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#fff', border: '1px solid rgba(255,255,255,0.2)', textDecoration: 'none', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')} onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}>
                Hire Me
              </a>
            </motion.div>

            {/* Socials */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: '2.5rem' }}>
              <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>find me</span>
              <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.1)' }} />
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" whileHover={{ y: -2 }} whileTap={{ scale: 0.9 }}
                  style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
                  aria-label={label}>
                  <Icon size={15} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right — stats */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.15 }}
            style={{ flexShrink: 0, width: '100%', maxWidth: 300 }} className="lg:max-w-[300px]">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(255,255,255,0.07)' }}>
              {stats.map(s => (
                <div key={s.label} style={{ padding: '20px 22px', background: '#000', textAlign: 'center' }}>
                  <div style={{ fontSize: 30, fontWeight: 900, color: '#fff', fontFamily: 'monospace', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginTop: 6 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Quick links */}
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 1, background: 'rgba(255,255,255,0.05)' }}>
              {[
                { label: 'See all projects', href: '#projects' },
                { label: 'Read about me', href: '#about' },
              ].map(({ label, href }) => (
                <a key={href} href={href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#000', fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }} onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.4)' }}>
                  {label} <ArrowUpRight size={12} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient divider */}
      <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(124,58,237,0.4),rgba(6,182,212,0.4),transparent)' }} />
    </div>
  )
}

export default function Hero() {
  return (
    <ScrollExpandMedia
      mediaType="image"
      bgImageSrc="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
      mediaSrc="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1280&q=80"
      title={`${personalInfo.name} BUILDS`}
      date={new Date().getFullYear().toString()}
      scrollToExpand="↓ scroll to explore"
      textBlend={true}
      overlayContent={heroOverlay}
    >
      <HeroContent />
    </ScrollExpandMedia>
  )
}
