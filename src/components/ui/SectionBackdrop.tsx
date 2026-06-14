import AuroraGradient from './AuroraGradient'

type RGBTriple = [string, string, string]

interface SectionBackdropProps {
  /** Kept for API compatibility with existing callers; tint is currently fixed. */
  colors?: RGBTriple
  intensity?: number
  speed?: number
  height?: string
}

/**
 * Animated CSS aurora confined to a top band behind a section heading, fading into
 * clean black. Compositor-only (no WebGL) so it stays smooth and light on resources.
 */
export default function SectionBackdrop({ height = 'clamp(380px, 48vh, 560px)' }: SectionBackdropProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.7,
        maskImage: 'linear-gradient(to bottom, #000 0%, #000 30%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 30%, transparent 100%)',
      }}
    >
      <AuroraGradient transparent />
    </div>
  )
}
