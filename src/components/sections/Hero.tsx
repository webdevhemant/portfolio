import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import { GithubIcon, TwitterIcon, UpworkIcon } from '../ui/SocialIcons'
import ScrollExpandMedia from '../ui/ScrollExpandMedia'
import AuroraGradient from '../ui/AuroraGradient'
import { personalInfo } from '../../data/portfolio'

const socials = [
  { icon: GithubIcon, href: personalInfo.github, label: 'GitHub' },
  { icon: TwitterIcon, href: personalInfo.twitter, label: 'Twitter' },
  { icon: UpworkIcon, href: personalInfo.upwork, label: 'Upwork' },
]

// Mounts only after the media fully expands, so these entrance animations play on reveal.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
}

const shadow = '0 2px 28px rgba(0,0,0,0.85)'

/* Intro — fades in over the expanded image once the scroll finishes */
function HeroIntro() {
  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
      {/* Soft cinematic scrim so the text always reads over the image */}
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '130vw', height: '110vh', background: 'radial-gradient(ellipse 38% 42% at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.35) 50%, transparent 75%)', pointerEvents: 'none' }} />

      <motion.div variants={container} initial="hidden" animate="show"
        style={{ position: 'relative', maxWidth: 800, textAlign: 'center', padding: '0 0.5rem' }}>

        <motion.h2 variants={fadeUp}
          style={{ fontSize: 'clamp(2.75rem,7.5vw,5.5rem)', fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 0.97, color: '#fff', marginBottom: '1.5rem', textShadow: shadow }}>
          Hi, I'm {personalInfo.name}.<br />
          <span style={{ background: 'linear-gradient(135deg,#c4b5fd,#7dd3fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', filter: 'drop-shadow(0 6px 36px rgba(124,58,237,0.5))' }}>
            I craft refined web interfaces.
          </span>
        </motion.h2>

        <motion.p variants={fadeUp}
          style={{ fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 2.5rem', textShadow: shadow }}>
          {personalInfo.tagline}
        </motion.p>

        <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          <Button href="#projects" variant="primary">
            View Work <ArrowRight size={13} />
          </Button>
          <Button href="#contact" variant="secondary">
            Hire Me
          </Button>
        </motion.div>

        <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: '2.75rem' }}>
          <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>find me</span>
          <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.3)' }} />
          {socials.map(({ icon: Icon, href, label }) => (
            <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" whileHover={{ y: -3, scale: 1.1 }} whileTap={{ scale: 0.9 }}
              style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: 8, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
              aria-label={label}>
              <Icon size={16} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function Hero() {
  return (
    <ScrollExpandMedia
      mediaContent={<AuroraGradient />}
      title={`${personalInfo.name} BUILDS`}
      date={new Date().getFullYear().toString()}
      scrollToExpand="↓ scroll to explore"
      textBlend={true}
    >
      <HeroIntro />
    </ScrollExpandMedia>
  )
}
