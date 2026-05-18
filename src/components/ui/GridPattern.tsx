import { motion } from 'framer-motion'

interface GridPatternProps {
  width?: number
  height?: number
  className?: string
  numHighlights?: number
}

// Deterministic "random" positions to avoid hydration mismatch
const HIGHLIGHT_POSITIONS = [
  { x: 2, y: 3 }, { x: 7, y: 1 }, { x: 12, y: 5 }, { x: 4, y: 8 },
  { x: 9, y: 6 }, { x: 15, y: 2 }, { x: 6, y: 11 }, { x: 11, y: 9 },
  { x: 3, y: 13 }, { x: 14, y: 7 }, { x: 8, y: 4 }, { x: 1, y: 10 },
]

const DELAYS = [0, 1.2, 0.8, 2.1, 1.5, 0.3, 1.8, 0.6, 2.4, 1.1, 0.4, 1.9]

export default function GridPattern({
  width = 40,
  height = 40,
  className = '',
  numHighlights = 8,
}: GridPatternProps) {
  const highlights = HIGHLIGHT_POSITIONS.slice(0, numHighlights)

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${width} 0 L 0 0 0 ${height}`}
              fill="none"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Highlighted squares */}
        {highlights.map((pos, i) => (
          <motion.rect
            key={i}
            x={pos.x * width}
            y={pos.y * height}
            width={width}
            height={height}
            fill="rgba(124,58,237,0.06)"
            initial={{ opacity: 0.1 }}
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: DELAYS[i] ?? 0,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>
    </div>
  )
}
