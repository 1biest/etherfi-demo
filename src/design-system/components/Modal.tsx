'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { Button } from './Button'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'metal'
  className?: string
}

export function Modal({ open, onClose, title, children, variant = 'primary', className }: ModalProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [open, onClose])

  if (!open) return null

  const variants: Record<string, string> = {
    primary: 'paper-elevated texture-grain',
    secondary: 'paper-base texture-grain',
    ghost: 'glass-soft',
    metal: 'paper-elevated light-metal-highlight texture-grain border-[var(--color-border-gold)] glow-soft',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[var(--color-text-primary)]/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        className={cn(
          'relative z-10 w-full max-w-lg',
          'rounded-[var(--radius-xl)] p-6',
          'shadow-[var(--shadow-xl)]',
          'animate-[modalIn_var(--duration-normal)_var(--ease-out)]',
          variants[variant],
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {/* Header */}
        {(title) && (
          <div className="flex items-center justify-between mb-4">
            {title && (
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                {title}
              </h2>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="ml-auto -mr-2"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Content */}
        <div className="text-[var(--color-text-secondary)] text-sm">
          {children}
        </div>
      </div>
    </div>
  )
}
