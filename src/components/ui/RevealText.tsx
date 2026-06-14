import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'

export interface RevealPart {
  text: string
  gradient?: boolean
}

interface Props {
  parts: RevealPart[]
  style?: CSSProperties
  className?: string
  stagger?: number
  delay?: number
}

/**
 * Word-by-word heading reveal — each word fades and rises into place, staggered.
 * Words flagged `gradient` get the .gradient-text treatment.
 */
export default function RevealText({ parts, style, className, stagger = 0.05, delay = 0 }: Props) {
  const words: { w: string; gradient?: boolean }[] = []
  parts.forEach((p) => p.text.split(' ').forEach((w) => words.push({ w, gradient: p.gradient })))

  return (
    <span className={className} style={style}>
      {words.map((it, i) => (
        <motion.span
          key={i}
          className={it.gradient ? 'gradient-text' : undefined}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
        >
          {it.w}{i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </span>
  )
}
