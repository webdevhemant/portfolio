import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin gradient bar at the top that tracks page scroll progress. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        transformOrigin: '0% 50%',
        scaleX,
        zIndex: 200,
        background: 'linear-gradient(90deg, #a78bfa, #38bdf8, #f472b6)',
        boxShadow: '0 0 12px rgba(124,58,237,0.6)',
      }}
    />
  )
}
