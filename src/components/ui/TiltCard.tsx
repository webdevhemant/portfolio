import type { ReactNode } from 'react'
import { useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

interface TiltCardProps {
  children: ReactNode
  className?: string
  tiltStrength?: number
}

export default function TiltCard({
  children,
  className = '',
  tiltStrength = 12,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const rotateXSpring = useTransform(rotateX, (v) => v)
  const rotateYSpring = useTransform(rotateY, (v) => v)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const tiltXDeg = -(mouseY / (rect.height / 2)) * tiltStrength
    const tiltYDeg = (mouseX / (rect.width / 2)) * tiltStrength

    rotateX.set(tiltXDeg)
    rotateY.set(tiltYDeg)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
      className={className}
    >
      <motion.div
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  )
}
