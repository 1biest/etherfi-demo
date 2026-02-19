import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'metal'
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const variants: Record<string, string> = {
      primary: [
        'bg-[var(--color-surface-pressed)] text-[var(--color-text-primary)]',
        'border border-[var(--color-border-default)]',
      ].join(' '),
      secondary: [
        'bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)]',
        'border border-[var(--color-border-subtle)]',
        'shadow-[var(--shadow-xs)]',
      ].join(' '),
      ghost: [
        'bg-transparent text-[var(--color-text-tertiary)]',
        'border border-[var(--color-border-default)]',
      ].join(' '),
      metal: [
        'bg-[var(--color-accent-gold-muted)] text-[var(--color-accent-gold-dark)]',
        'border border-[var(--color-accent-gold-border)]',
      ].join(' '),
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1 px-2.5 py-0.5',
          'text-xs font-medium',
          'rounded-[var(--radius-full)]',
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'

export { Badge }
