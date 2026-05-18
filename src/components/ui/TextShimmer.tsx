import type { ReactNode } from 'react'

interface TextShimmerProps {
  children: ReactNode
  className?: string
  duration?: number
}

export default function TextShimmer({
  children,
  className = '',
  duration = 2.5,
}: TextShimmerProps) {
  return (
    <span
      className={className}
      style={{
        background: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.5) 35%, white 50%, rgba(255,255,255,0.5) 65%, rgba(255,255,255,0.5) 100%)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: `text-shimmer ${duration}s linear infinite`,
      }}
    >
      {children}
    </span>
  )
}
