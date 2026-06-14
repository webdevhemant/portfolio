import { motion } from 'framer-motion'

// Lightweight animated aurora made of soft radial-gradient blobs.
// Pure CSS transforms (no WebGL) — runs on the compositor, so it stays smooth and cheap.

const blobs = [
  { c: 'rgba(124,58,237,0.62)', top: '6%', left: '4%', size: '66%', x: ['0%', '14%', '0%'], y: ['0%', '12%', '0%'], dur: 16 },
  { c: 'rgba(56,189,248,0.52)', top: '34%', left: '46%', size: '62%', x: ['0%', '-14%', '0%'], y: ['0%', '-10%', '0%'], dur: 21 },
  { c: 'rgba(244,114,182,0.46)', top: '46%', left: '10%', size: '56%', x: ['0%', '12%', '0%'], y: ['0%', '-12%', '0%'], dur: 18 },
  { c: 'rgba(52,211,153,0.4)', top: '16%', left: '58%', size: '54%', x: ['0%', '-10%', '0%'], y: ['0%', '12%', '0%'], dur: 24 },
]

interface Props {
  /** Transparent (no dark base / vignette) for use as a section band over an existing dark bg. */
  transparent?: boolean
}

export default function AuroraGradient({ transparent = false }: Props) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: transparent ? 'transparent' : 'radial-gradient(ellipse at 50% 30%, #160f26 0%, #08070f 72%)' }}>
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          animate={{ x: b.x, y: b.y, scale: [1, 1.12, 1] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: b.top,
            left: b.left,
            width: b.size,
            aspectRatio: '1 / 1',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${b.c} 0%, transparent 65%)`,
            mixBlendMode: 'screen',
            willChange: 'transform',
          }}
        />
      ))}
      {/* subtle vignette to seat the text */}
      {!transparent && <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,12,0.55) 100%)' }} />}
    </div>
  )
}
