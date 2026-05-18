import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface BentoGridProps {
  children: ReactNode
  className?: string
}

export function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <div
      className={`grid grid-cols-12 gap-4 auto-rows-auto ${className}`}
    >
      {children}
    </div>
  )
}

interface BentoCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
  index?: number
}

export function BentoCard({
  children,
  className = '',
  glowColor = 'rgba(124,58,237,0.15)',
  index = 0,
}: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -4, boxShadow: `0 8px 40px ${glowColor}` }}
      className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${className}`}
      style={{
        background: '#0a0a0a',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {children}
    </motion.div>
  )
}
