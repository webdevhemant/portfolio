import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { ReactNode, CSSProperties } from 'react'

type Variant = 'primary' | 'secondary'
type Size = 'sm' | 'md'

interface CommonProps {
  variant?: Variant
  size?: Size
  children: ReactNode
  style?: CSSProperties
}

type Props =
  | (CommonProps & { href: string; onClick?: never; type?: never; disabled?: never; target?: string; rel?: string })
  | (CommonProps & { href?: never; onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean; target?: never; rel?: never })

const sizes: Record<Size, CSSProperties> = {
  sm: { padding: '8px 18px', fontSize: 11 },
  md: { padding: '12px 28px', fontSize: 12 },
}

function baseStyle(variant: Variant, size: Size): CSSProperties {
  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    borderRadius: 8,
    textDecoration: 'none',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    ...sizes[size],
  }
  if (variant === 'primary') {
    return { ...base, color: '#000', background: '#fff', border: '1px solid #fff' }
  }
  return { ...base, color: '#fff', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.25)' }
}

const hover = {
  primary: { scale: 1.05, boxShadow: '0 12px 40px rgba(255,255,255,0.22)' },
  secondary: { scale: 1.05, borderColor: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.1)' },
}

export default function Button(props: Props) {
  const { variant = 'primary', size = 'md', children, style } = props

  // Magnetic pull toward the cursor.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 300, damping: 18 })
  const y = useSpring(my, { stiffness: 300, damping: 18 })

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.35)
    my.set((e.clientY - (r.top + r.height / 2)) * 0.35)
  }
  function onLeave() { mx.set(0); my.set(0) }

  const merged = { ...baseStyle(variant, size), ...style, x, y }
  const motionProps = {
    style: merged,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    whileHover: hover[variant],
    whileTap: { scale: 0.96 },
    transition: { type: 'spring' as const, stiffness: 350, damping: 22 },
  }

  if ('href' in props && props.href !== undefined) {
    const { href, target, rel } = props as Extract<Props, { href: string }>
    return (
      <motion.a href={href} target={target} rel={rel} {...motionProps}>
        {children}
      </motion.a>
    )
  }

  const { onClick, type = 'button', disabled } = props as Extract<Props, { onClick?: () => void }>
  return (
    <motion.button onClick={onClick} type={type} disabled={disabled} {...motionProps}>
      {children}
    </motion.button>
  )
}
