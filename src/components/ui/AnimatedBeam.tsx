import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface AnimatedBeamProps {
  height?: number
  color?: string
  glowColor?: string
  strokeWidth?: number
  className?: string
}

export default function AnimatedBeam({
  height = 400,
  color = '#7c3aed',
  glowColor = 'rgba(124,58,237,0.6)',
  strokeWidth = 2,
  className = '',
}: AnimatedBeamProps) {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [pathLength, setPathLength] = useState(0)
  const pathRef = useRef<SVGLineElement>(null)

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength())
    }
  }, [height])

  return (
    <svg
      ref={ref}
      width="24"
      height={height}
      viewBox={`0 0 24 ${height}`}
      className={className}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="beam-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Track line */}
      <line
        x1="12" y1="0"
        x2="12" y2={height}
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={strokeWidth}
      />

      {/* Animated beam */}
      {pathLength > 0 && (
        <motion.line
          ref={pathRef}
          x1="12" y1="0"
          x2="12" y2={height}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          filter="url(#beam-glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.2 }}
          style={{ stroke: color }}
        />
      )}

      {/* Fallback for initial render before pathLength is set */}
      {pathLength === 0 && (
        <line
          ref={pathRef}
          x1="12" y1="0"
          x2="12" y2={height}
          stroke="transparent"
          strokeWidth={strokeWidth}
        />
      )}

      {/* Glow dot travelling down */}
      <motion.circle
        cx="12"
        cy="0"
        r="4"
        fill={glowColor}
        filter="url(#beam-glow)"
        initial={{ cy: 0, opacity: 0 }}
        animate={isInView ? { cy: height, opacity: [0, 1, 1, 0] } : { cy: 0, opacity: 0 }}
        transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.2 }}
      />
    </svg>
  )
}
