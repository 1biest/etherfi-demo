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
  idleShineOffset = '-150%'
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
        y: clampedX
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
      chipInner: 'border-slate-400'
    },
    Premium: {
      bg: 'bg-[var(--color-accent-gold)]',
      text: 'text-black/80',
      textMuted: 'text-black/60',
      textFaint: 'text-black/40',
      border: 'border-white/20',
      ring: 'border-[var(--color-accent-gold)]/50 border-[var(--color-accent-gold)]', // fallback for opacity issue with css vars
      chip: 'bg-black/10 border-black/10',
      chipInner: 'border-black/20'
    },
    Black: {
      bg: 'bg-zinc-900',
      text: 'text-white/90',
      textMuted: 'text-white/70',
      textFaint: 'text-white/30',
      border: 'border-white/10',
      ring: 'border-zinc-700',
      chip: 'bg-white/10 border-white/10',
      chipInner: 'border-white/20'
    }
  }[tier]

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[400px] aspect-[1.586] mx-auto perspective-[1200px] group cursor-pointer z-10 hover:z-50"
      style={{
        '--idle-rx': `${idleRotateX}deg`,
        '--idle-rz': `${idleRotateZ}deg`,
        '--idle-ry': `${idleRotateY}deg`,
        '--idle-scale': idleScale,
        '--hover-scale': hoverScale,
        '--idle-shine': idleShineOffset,
        '--mouse-y': rotate.y,
      } as React.CSSProperties}
    >

      {/* 
        Dynamic tracking from mouse 
        (Placed on the outside so it always operates in screen space, unaffected by the card's twist)
      */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-200 ease-out [--tilt:10deg] group-hover:[--tilt:40deg]"
        style={{
          transform: `rotateX(calc(${rotate.x} * var(--tilt))) rotateY(calc(${rotate.y} * var(--tilt)))`,
          transformStyle: 'preserve-3d'
        }}
      >

        {/* 
          Shadow Layer 
          Moved completely outside of the preserve-3d card wrapper to prevent blur popping. 
        */}
        <div
          className="absolute inset-0 w-full h-full transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] 
                     [transform:rotateX(var(--idle-rx))_rotateZ(var(--idle-rz))_rotateY(var(--idle-ry))_scale(var(--idle-scale))] group-hover:[transform:rotateX(0deg)_rotateZ(0deg)_rotateY(0deg)_scale(var(--hover-scale))]"
        >
          <div
            className="absolute inset-0 bg-black/30 rounded-2xl blur-xl transition-all duration-300 group-hover:blur-2xl"
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
          className="absolute inset-0 w-full h-full transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] 
                     [transform:rotateX(var(--idle-rx))_rotateZ(var(--idle-rz))_rotateY(var(--idle-ry))_scale(var(--idle-scale))] group-hover:[transform:rotateX(0deg)_rotateZ(0deg)_rotateY(0deg)_scale(var(--hover-scale))]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Box (Main Card) */}
          <div
            className={`absolute inset-0 rounded-2xl overflow-hidden shadow-xl ${styles.bg} ${styles.border} border`}
            style={{
              transform: 'translateZ(0px)', // anchor layer
              backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)',
              backgroundSize: '150px', // Forces the grain SVG to render smaller/finer
              filter: tier === 'Black' ? 'brightness(0.9) contrast(120%)' : 'brightness(1) contrast(120%)',
            }}
          >
            {/* Card Content - relative to be above the noise but below shine */}
            <div
              className={`absolute inset-0 p-6 flex flex-col justify-between z-10 ${tier === 'Black' ? 'mix-blend-normal' : 'mix-blend-multiply'}`}
            >
              <div className="flex justify-between items-start">
                <div className={`text-xl font-bold ${styles.text}`}>
                  ether.fi
                </div>
                <CreditCard className={`h-7 w-7 ${styles.textFaint}`} />
              </div>

              <div className="space-y-4">
                {/* Chip */}
                <div className="flex gap-2">
                  <div className={`h-8 w-11 rounded-md flex items-center justify-center border ${styles.chip}`}>
                    <div className={`h-5 w-7 border rounded-sm ${styles.chipInner}`}></div>
                  </div>
                </div>

                {/* Number */}
                <div className={`text-lg sm:text-xl tracking-[0.25em] font-mono mt-2 ${styles.text}`}>
                  •••• •••• •••• 4829
                </div>

                {/* Details */}
                <div className="flex justify-between items-end pb-1">
                  <div className={`text-[10px] sm:text-xs uppercase tracking-wider ${styles.textMuted}`}>
                    Card Holder
                    <div className={`text-sm font-bold mt-0.5 tracking-normal normal-case ${styles.text}`}>
                      Your Name
                    </div>
                  </div>
                  <div className={`text-[10px] sm:text-xs uppercase tracking-wider text-right ${styles.textMuted}`}>
                    Expires
                    <div className={`text-sm font-bold mt-0.5 tracking-normal ${styles.text}`}>
                      12/28
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shine effect that moves with mouse */}
            <div
              className="absolute top-0 w-[100%] h-[200%] z-20 pointer-events-none
                bg-white/40 [box-shadow:0_0_60px_40px_rgba(255,255,255,0.4)] md:bg-white/30 md:[box-shadow:0_0_60px_40px_rgba(255,255,255,0.3)]
                [transform:skewX(-40deg)] transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                left-[var(--idle-shine)] group-hover:left-[calc(var(--mouse-y)*-300%)]"
              style={{
                opacity: tier === 'Black' ? 0.3 : 1
              }}
            />
          </div>

          {/* Ring / Outline in 3D Space */}
          <div
            className={`absolute inset-0 pointer-events-none border-2 rounded-2xl ${styles.ring}`}
            style={{ transform: 'translateZ(30px)' }}
          />
        </div>
      </div>
    </div>
  )
}
