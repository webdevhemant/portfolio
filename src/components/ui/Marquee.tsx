import { useState } from 'react'
import type { ReactNode } from 'react'

interface Props {
  items: ReactNode[]
  speed?: number
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
  gap?: number
}

export default function Marquee({ items, speed = 35, direction = 'left', pauseOnHover = true, gap = 12 }: Props) {
  const [paused, setPaused] = useState(false)
  const doubled = [...items, ...items]

  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
      }}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div
        style={{
          display: 'flex',
          gap,
          width: 'max-content',
          animation: `${direction === 'left' ? 'marquee' : 'marquee-reverse'} ${speed}s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {doubled.map((item, i) => (
          <div key={i} style={{ flexShrink: 0 }}>{item}</div>
        ))}
      </div>
    </div>
  )
}
