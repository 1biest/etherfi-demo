'use client'

import { useCallback, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface CarouselProps {
  sections: {
    id: string
    label: string
    content: React.ReactNode
  }[]
  activeIndex: number
  onChange: (index: number) => void
}

export function Carousel({ sections, activeIndex, onChange }: CarouselProps) {
  const goPrev = useCallback(() => {
    onChange(activeIndex === 0 ? sections.length - 1 : activeIndex - 1)
  }, [activeIndex, sections.length, onChange])

  const goNext = useCallback(() => {
    onChange(activeIndex === sections.length - 1 ? 0 : activeIndex + 1)
  }, [activeIndex, sections.length, onChange])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goPrev, goNext])

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      {/* Carousel Content */}
      <div className="relative flex-1 overflow-hidden">
        {/* Slides */}
        <div
          className="flex h-full transition-transform duration-[var(--duration-slow)]"
          style={{ transform: `translateX(-${activeIndex * 100}%)`, willChange: 'transform' }}
        >
          {sections.map((section) => (
            <div key={section.id} className="w-full flex-shrink-0 overflow-y-auto">
              {section.content}
            </div>
          ))}
        </div>

        {/* Page Indicator dots */}
        <div className="absolute top-1/2 right-4 z-10 flex -translate-y-1/2 flex-col items-center justify-center gap-2">
          {sections.map((_, i) => (
            <button
              key={i}
              onClick={() => onChange(i)}
              className={cn(
                'w-2 rounded-full transition-all duration-[var(--duration-fast)]',
                i === activeIndex
                  ? 'h-6 bg-[var(--color-accent-gold)]'
                  : 'h-2 bg-[var(--color-border-strong)] hover:bg-[var(--color-text-muted)]',
              )}
              aria-label={`Go to ${sections[i].label}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
