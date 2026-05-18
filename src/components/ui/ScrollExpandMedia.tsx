import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image'
  mediaSrc: string
  posterSrc?: string
  bgImageSrc: string
  title?: string
  date?: string
  scrollToExpand?: string
  textBlend?: boolean
  overlayContent?: ReactNode
  children?: ReactNode
}

export default function ScrollExpandMedia({
  mediaType = 'image',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand = 'Scroll to expand',
  textBlend = true,
  overlayContent,
  children,
}: ScrollExpandMediaProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false)
  const [touchStartY, setTouchStartY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setScrollProgress(0)
    setShowContent(false)
    setMediaFullyExpanded(false)
  }, [mediaType])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false)
        e.preventDefault()
      } else if (!mediaFullyExpanded) {
        e.preventDefault()
        const newProgress = Math.min(Math.max(scrollProgress + e.deltaY * 0.0009, 0), 1)
        setScrollProgress(newProgress)
        if (newProgress >= 1) { setMediaFullyExpanded(true); setShowContent(true) }
        else if (newProgress < 0.75) setShowContent(false)
      }
    }

    const handleTouchStart = (e: TouchEvent) => setTouchStartY(e.touches[0].clientY)

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return
      const deltaY = touchStartY - e.touches[0].clientY
      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false); e.preventDefault()
      } else if (!mediaFullyExpanded) {
        e.preventDefault()
        const factor = deltaY < 0 ? 0.008 : 0.005
        const newProgress = Math.min(Math.max(scrollProgress + deltaY * factor, 0), 1)
        setScrollProgress(newProgress)
        if (newProgress >= 1) { setMediaFullyExpanded(true); setShowContent(true) }
        else if (newProgress < 0.75) setShowContent(false)
        setTouchStartY(e.touches[0].clientY)
      }
    }

    const handleScroll = () => { if (!mediaFullyExpanded) window.scrollTo(0, 0) }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', () => setTouchStartY(0))
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [scrollProgress, mediaFullyExpanded, touchStartY])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const mediaW = 300 + scrollProgress * (isMobile ? 650 : 1250)
  const mediaH = 400 + scrollProgress * (isMobile ? 200 : 400)
  const textShift = scrollProgress * (isMobile ? 180 : 150)

  const firstWord = title?.split(' ')[0] ?? ''
  const rest = title?.split(' ').slice(1).join(' ') ?? ''

  return (
    <div ref={sectionRef} className="overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">

          {/* Background image fades out as media expands */}
          <motion.div
            className="absolute inset-0 z-0 h-full"
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <img
              src={bgImageSrc}
              alt="Background"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>

          <div className="w-full flex flex-col items-center relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">

              {/* Expanding media */}
              <div
                className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden"
                style={{
                  width: `${mediaW}px`,
                  height: `${mediaH}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0 0 60px rgba(0,0,0,0.6)',
                }}
              >
                {mediaType === 'video' ? (
                  <div className="relative w-full h-full pointer-events-none">
                    <video
                      src={mediaSrc}
                      poster={posterSrc}
                      autoPlay muted loop playsInline
                      className="w-full h-full object-cover"
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/30"
                      animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={mediaSrc}
                      alt={title ?? 'Hero'}
                      className="w-full h-full object-cover"
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/40"
                      animate={{ opacity: 0.7 - scrollProgress * 0.35 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                {/* Date + scroll hint pinned inside the media box */}
                <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-1 z-10">
                  {date && (
                    <p
                      className="text-sm font-mono text-white/60 tracking-widest uppercase"
                      style={{ transform: `translateX(-${textShift}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {!mediaFullyExpanded && (
                    <p
                      className="text-xs font-mono text-white/40 tracking-widest"
                      style={{ transform: `translateX(${textShift}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              {/* Overlay content — dev panels etc */}
              {overlayContent}

              {/* Title — splits apart as media expands */}
              <div
                className={`flex flex-col items-center justify-center gap-2 w-full relative z-10 pointer-events-none select-none ${
                  textBlend ? 'mix-blend-difference' : ''
                }`}
              >
                <h1
                  className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white"
                  style={{ transform: `translateX(-${textShift}vw)` }}
                >
                  {firstWord}
                </h1>
                <h1
                  className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white"
                  style={{ transform: `translateX(${textShift}vw)` }}
                >
                  {rest}
                </h1>
              </div>
            </div>

            {/* Content revealed after full expansion — mount only when ready so child animate props fire correctly */}
            {showContent && (
              <motion.div
                className="w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {children}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
