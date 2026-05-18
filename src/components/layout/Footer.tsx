import { motion } from 'framer-motion'
import { GithubIcon, TwitterIcon, LinkedinIcon } from '../ui/SocialIcons'
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
  { icon: LinkedinIcon, href: personalInfo.linkedin, label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden py-16"
      style={{ background: '#000', borderTop: '1px solid rgba(255,255,255,0.08)' }}
    >

      <div className="container-xl relative z-10">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Large logo */}
          <motion.a
            href="#"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <span
              style={{
                fontSize: 'clamp(2.5rem,6vw,4rem)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                background: 'linear-gradient(135deg, #a78bfa 0%, #38bdf8 60%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {personalInfo.name}
            </span>
            <span style={{ fontSize: 'clamp(2.5rem,6vw,4rem)', fontWeight: 900, color: 'rgba(255,255,255,0.2)', letterSpacing: '-0.04em' }}>.</span>
          </motion.a>

          {/* Nav links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/30 hover:text-white transition-colors font-mono"
              >
                {link.label}
              </a>
            ))}
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 flex items-center justify-center text-white/30 hover:text-white transition-all"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 8,
                }}
                aria-label={label}
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </motion.div>

          {/* Divider */}
          <div
            className="w-full h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }}
          />
        </div>
      </div>
    </footer>
  )
}
