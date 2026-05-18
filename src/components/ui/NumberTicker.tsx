import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface NumberTickerProps {
  value: string
  duration?: number
  className?: string
}

function parseValue(val: string): { num: number; suffix: string } {
  const match = val.match(/^([\d.]+)(.*)$/)
  if (!match) return { num: 0, suffix: val }
  return { num: parseFloat(match[1]), suffix: match[2] ?? '' }
}

export default function NumberTicker({
  value,
  duration = 2000,
  className = '',
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState('0')
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!isInView) return

    const { num, suffix } = parseValue(value)
    const steps = 60
    const stepDuration = duration / steps
    let current = 0

    animRef.current = setInterval(() => {
      current += 1
      const progress = current / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      const currentVal = num * eased

      // Format: if integer, show integer; if has decimal, show 1 decimal
      const formatted = Number.isInteger(num)
        ? Math.round(currentVal).toString()
        : currentVal.toFixed(1)

      setDisplay(formatted + suffix)

      if (current >= steps) {
        setDisplay(value)
        if (animRef.current) clearInterval(animRef.current)
      }
    }, stepDuration)

    return () => {
      if (animRef.current) clearInterval(animRef.current)
    }
  }, [isInView, value, duration])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
