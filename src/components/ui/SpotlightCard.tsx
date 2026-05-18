import type { ReactNode, CSSProperties } from 'react'
import { useRef } from 'react'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  spotlightColor?: string
  style?: CSSProperties
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(124,58,237,0.15)',
  style,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    cardRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, ${spotlightColor}, transparent 40%), #0a0a0a`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.background = '#0a0a0a'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-all duration-200 ${className}`}
      style={{ background: '#0a0a0a', ...style }}
    >
      {children}
    </div>
  )
}
