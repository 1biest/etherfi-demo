'use client'

import { useState, useCallback, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CarouselProps {
  sections: {
    id: string
    label: string
    content: React.ReactNode
  }[]
}

export function Carousel({ sections }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < sections.length) {
      setActiveIndex(index)
    }
  }, [sections.length])

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? sections.length - 1 : prev - 1))
  }, [sections.length])

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev === sections.length - 1 ? 0 : prev + 1))
  }, [sections.length])

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
    <div className="relative flex flex-col h-full min-h-0">
      {/* Tab Navigation */}
      <nav className="flex items-center justify-center gap-1 px-4 py-3 border-b border-[var(--color-border-subtle)]">
        {sections.map((section, i) => (
          <button
            key={section.id}
            onClick={() => goTo(i)}
            className={cn(
              'relative px-5 py-2 text-sm font-medium rounded-[var(--radius-md)] transition-all duration-[var(--duration-fast)]',
              i === activeIndex
                ? 'text-[var(--color-text-primary)] bg-[var(--color-surface-elevated)] shadow-[var(--shadow-sm)]'
                : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-accent-gold-muted)]'
            )}
          >
            {section.label}
            {i === activeIndex && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[var(--color-accent-gold)] rounded-full" />
            )}
          </button>
        ))}
      </nav>

      {/* Carousel Content */}
      <div className="relative flex-1 overflow-hidden">
        {/* Prev Arrow */}
        <button
          onClick={goPrev}
          className={cn(
            'absolute left-3 top-1/2 -translate-y-1/2 z-20',
            'h-10 w-10 rounded-full',
            'flex items-center justify-center',
            'bg-[var(--color-surface-elevated)] border border-[var(--color-border-default)]',
            'shadow-[var(--shadow-md)]',
            'text-[var(--color-text-secondary)]',
            'hover:text-[var(--color-text-primary)] hover:shadow-[var(--shadow-lg)]',
            'hover:border-[var(--color-accent-gold-border)]',
            'transition-all duration-[var(--duration-fast)]',
            'active:scale-95'
          )}
          aria-label="Previous section"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Next Arrow */}
        <button
          onClick={goNext}
          className={cn(
            'absolute right-3 top-1/2 -translate-y-1/2 z-20',
            'h-10 w-10 rounded-full',
            'flex items-center justify-center',
            'bg-[var(--color-surface-elevated)] border border-[var(--color-border-default)]',
            'shadow-[var(--shadow-md)]',
            'text-[var(--color-text-secondary)]',
            'hover:text-[var(--color-text-primary)] hover:shadow-[var(--shadow-lg)]',
            'hover:border-[var(--color-accent-gold-border)]',
            'transition-all duration-[var(--duration-fast)]',
            'active:scale-95'
          )}
          aria-label="Next section"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Slides */}
        <div
          className="flex h-full transition-transform duration-[var(--duration-slow)]"
          style={{ transform: `translateX(-${activeIndex * 100}%)`, willChange: 'transform' }}
        >
          {sections.map((section) => (
            <div
              key={section.id}
              className="w-full flex-shrink-0 overflow-y-auto"
            >
              {section.content}
            </div>
          ))}
        </div>
      </div>

      {/* Page Indicator dots */}
      <div className="flex items-center justify-center gap-2 py-3 border-t border-[var(--color-border-subtle)]">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={cn(
              'h-2 rounded-full transition-all duration-[var(--duration-fast)]',
              i === activeIndex
                ? 'w-6 bg-[var(--color-accent-gold)]'
                : 'w-2 bg-[var(--color-border-strong)] hover:bg-[var(--color-text-muted)]'
            )}
            aria-label={`Go to ${sections[i].label}`}
          />
        ))}
      </div>
    </div>
  )
}
