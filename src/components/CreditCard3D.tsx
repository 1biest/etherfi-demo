'use client'

import { CreditCard } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export type CardTier = 'Standard' | 'Premium' | 'Black'

interface CreditCard3DProps {
  tier?: CardTier
  idleRotateX?: number
  idleRotateZ?: number
  idleRotateY?: number
  idleScale?: number
  hoverScale?: number
  idleShineOffset?: string
}

export function CreditCard3D({
  tier = 'Premium',
  idleRotateX = 360,
  idleRotateZ = -60,
  idleRotateY = 20,
  idleScale = 1,
  hoverScale = 1.3,
  idleShineOffset = '-150%',
}: CreditCard3DProps) {
  const [rotate, setRotate] = useState({ x: 0.5, y: -0.5 }) // Default normalized tilt
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()

      // Calculate center of this specific card
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calculate distance from mouse to the card's center
      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY

      // Normalize the distance based on screen size so movement is proportional
      const normalizedX = distanceX / (window.innerWidth / 2)
      const normalizedY = distanceY / (window.innerHeight / 2)

      // Clamp the values to strictly enforce bounds [-1, 1]
      const clampedX = Math.max(-1, Math.min(1, normalizedX))
      const clampedY = Math.max(-1, Math.min(1, normalizedY))

      setRotate({
        // Rotating on X axis responds to vertical movement
        x: -clampedY,
        // Rotating on Y axis responds to horizontal movement
        y: clampedX,
      })
    }

    // Follow cursor everywhere on the screen
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const styles = {
    Standard: {
      bg: 'bg-slate-200',
      text: 'text-slate-800',
      textMuted: 'text-slate-600',
      textFaint: 'text-slate-400',
      border: 'border-slate-400/20',
      ring: 'border-slate-300',
      chip: 'bg-slate-300 border-slate-400',
      chipInner: 'border-slate-400',
    },
    Premium: {
      bg: 'bg-[var(--color-accent-gold)]',
      text: 'text-black/80',
      textMuted: 'text-black/60',
      textFaint: 'text-black/40',
      border: 'border-white/20',
      ring: 'border-[var(--color-accent-gold)]/50 border-[var(--color-accent-gold)]', // fallback for opacity issue with css vars
      chip: 'bg-black/10 border-black/10',
      chipInner: 'border-black/20',
    },
    Black: {
      bg: 'bg-zinc-900',
      text: 'text-white/90',
      textMuted: 'text-white/70',
      textFaint: 'text-white/30',
      border: 'border-white/10',
      ring: 'border-zinc-700',
      chip: 'bg-white/10 border-white/10',
      chipInner: 'border-white/20',
    },
  }[tier]

  return (
    <div
      ref={containerRef}
      className="group relative z-10 mx-auto aspect-[1.586] w-full max-w-[400px] cursor-pointer perspective-[1200px] hover:z-50"
      style={
        {
          '--idle-rx': `${idleRotateX}deg`,
          '--idle-rz': `${idleRotateZ}deg`,
          '--idle-ry': `${idleRotateY}deg`,
          '--idle-scale': idleScale,
          '--hover-scale': hoverScale,
          '--idle-shine': idleShineOffset,
          '--mouse-y': rotate.y,
        } as React.CSSProperties
      }
    >
      {/* 
        Dynamic tracking from mouse 
        (Placed on the outside so it always operates in screen space, unaffected by the card's twist)
      */}
      <div
        className="absolute inset-0 h-full w-full transition-transform duration-200 ease-out [--tilt:20deg] group-hover:[--tilt:40deg] group-hover/tier:[--tilt:40deg]"
        style={{
          transform: `rotateX(calc(${rotate.x} * var(--tilt))) rotateY(calc(${rotate.y} * var(--tilt)))`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* 
          Shadow Layer 
          Moved completely outside of the preserve-3d card wrapper to prevent blur popping. 
        */}
        <div className="absolute inset-0 h-full w-full [transform:rotateX(var(--idle-rx))_rotateZ(var(--idle-rz))_rotateY(var(--idle-ry))_scale(var(--idle-scale))] transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[transform:rotateX(0deg)_rotateZ(0deg)_rotateY(0deg)_scale(var(--hover-scale))] group-hover/tier:[transform:rotateX(0deg)_rotateZ(0deg)_rotateY(0deg)_scale(var(--hover-scale))]">
          <div
            className="absolute inset-0 rounded-2xl bg-black/30 blur-xl transition-all duration-300 group-hover:blur-2xl group-hover/tier:blur-2xl"
            style={{
              transform: 'translateY(10px) translateZ(-40px)', // push it down and back relative to the view
            }}
          />
        </div>

        {/* 
          3D Scene Layer 
          Idle state = spun. Hover state = untwists to face the user and expands 20% 
        */}
        <div
          className="absolute inset-0 h-full w-full [transform:rotateX(var(--idle-rx))_rotateZ(var(--idle-rz))_rotateY(var(--idle-ry))_scale(var(--idle-scale))] transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[transform:rotateX(0deg)_rotateZ(0deg)_rotateY(0deg)_scale(var(--hover-scale))] group-hover/tier:[transform:rotateX(0deg)_rotateZ(0deg)_rotateY(0deg)_scale(var(--hover-scale))]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Box (Main Card) */}
          <div
            className={`absolute inset-0 overflow-hidden rounded-2xl shadow-xl ${styles.bg} ${styles.border} border`}
            style={{
              transform: 'translateZ(0px)', // anchor layer
              backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)',
              backgroundSize: '150px', // Forces the grain SVG to render smaller/finer
              filter:
                tier === 'Black'
                  ? 'brightness(0.9) contrast(120%)'
                  : 'brightness(1) contrast(120%)',
            }}
          >
            {/* Card Content - relative to be above the noise but below shine */}
            <div
              className={`absolute inset-0 z-10 flex flex-col justify-between p-6 ${tier === 'Black' ? 'mix-blend-normal' : 'mix-blend-multiply'}`}
            >
              <div className="flex items-start justify-between">
                <div className={`text-xl font-bold ${styles.text}`}>ether.fi</div>
                <CreditCard className={`h-7 w-7 ${styles.textFaint}`} />
              </div>

              <div className="space-y-4">
                {/* Chip */}
                <div className="flex gap-2">
                  <div
                    className={`flex h-8 w-11 items-center justify-center rounded-md border ${styles.chip}`}
                  >
                    <div className={`h-5 w-7 rounded-sm border ${styles.chipInner}`}></div>
                  </div>
                </div>

                {/* Number */}
                <div
                  className={`mt-2 font-mono text-lg tracking-[0.25em] sm:text-xl ${styles.text}`}
                >
                  •••• •••• •••• 4829
                </div>

                {/* Details */}
                <div className="flex items-end justify-between pb-1">
                  <div
                    className={`text-[10px] tracking-wider uppercase sm:text-xs ${styles.textMuted}`}
                  >
                    Card Holder
                    <div
                      className={`mt-0.5 text-sm font-bold tracking-normal normal-case ${styles.text}`}
                    >
                      Your Name
                    </div>
                  </div>
                  <div
                    className={`text-right text-[10px] tracking-wider uppercase sm:text-xs ${styles.textMuted}`}
                  >
                    Expires
                    <div className={`mt-0.5 text-sm font-bold tracking-normal ${styles.text}`}>
                      12/28
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shine effect that moves with mouse */}
            <div
              className="pointer-events-none absolute top-0 left-[var(--idle-shine)] z-20 h-[200%] w-[100%] [transform:skewX(-40deg)] bg-white/40 [box-shadow:0_0_60px_40px_rgba(255,255,255,0.4)] transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:left-[calc(var(--mouse-y)*-300%)] group-hover/tier:left-[calc(var(--mouse-y)*-300%)] md:bg-white/30 md:[box-shadow:0_0_60px_40px_rgba(255,255,255,0.3)]"
              style={{
                opacity: tier === 'Black' ? 0.3 : 1,
              }}
            />
          </div>

          {/* Ring / Outline in 3D Space */}
          <div
            className={`pointer-events-none absolute inset-0 rounded-2xl border-2 ${styles.ring}`}
            style={{ transform: 'translateZ(30px)' }}
          />
        </div>
      </div>
    </div>
  )
}
