import * as React from 'react'
import { cn } from '@/lib/utils'

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'metal'
  orientation?: 'horizontal' | 'vertical'
  label?: string
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, variant = 'primary', orientation = 'horizontal', label, ...props }, ref) => {
    const variants: Record<string, string> = {
      primary: 'bg-[var(--color-border-default)]',
      secondary: 'bg-[var(--color-border-strong)]',
      ghost: 'bg-[var(--color-border-subtle)]',
      metal:
        'bg-gradient-to-r from-transparent via-[var(--color-accent-gold-border)] to-transparent',
    }

    if (label) {
      return (
        <div
          ref={ref}
          className={cn('flex items-center gap-4', className)}
          role="separator"
          {...props}
        >
          <div className={cn('h-px flex-1', variants[variant])} />
          <span className="text-xs font-medium tracking-wider text-[var(--color-text-muted)] uppercase">
            {label}
          </span>
          <div className={cn('h-px flex-1', variants[variant])} />
        </div>
      )
    }

    if (orientation === 'vertical') {
      return (
        <div
          ref={ref}
          className={cn('w-px self-stretch', variants[variant], className)}
          role="separator"
          {...props}
        />
      )
    }

    return (
      <div
        ref={ref}
        className={cn('h-px w-full', variants[variant], className)}
        role="separator"
        {...props}
      />
    )
  },
)
Divider.displayName = 'Divider'

export { Divider }
