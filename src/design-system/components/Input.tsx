import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'metal'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, variant = 'primary', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    const variants: Record<string, string> = {
      primary: [
        'bg-[var(--color-surface-elevated)]',
        'border border-[var(--color-border-default)]',
        'shadow-[var(--shadow-inner-pressed)]',
        'hover:border-[var(--color-border-strong)]',
        'focus:border-[var(--color-accent-gold)]',
        'focus:shadow-[0_0_0_3px_var(--color-accent-gold-glow)]',
      ].join(' '),
      secondary: [
        'bg-[var(--color-surface-primary)]',
        'border border-[var(--color-border-default)]',
        'shadow-[var(--shadow-xs)]',
        'hover:border-[var(--color-border-strong)]',
        'focus:border-[var(--color-accent-gold)]',
        'focus:shadow-[0_0_0_3px_var(--color-accent-gold-glow)]',
      ].join(' '),
      ghost: [
        'bg-transparent',
        'border border-transparent',
        'hover:bg-[var(--color-accent-gold-muted)]',
        'focus:bg-[var(--color-surface-elevated)]',
        'focus:border-[var(--color-accent-gold)]',
        'focus:shadow-[0_0_0_3px_var(--color-accent-gold-glow)]',
      ].join(' '),
      metal: [
        'bg-[var(--color-surface-elevated)]',
        'border border-[var(--color-border-gold)]',
        'shadow-[var(--shadow-xs)]',
        'hover:border-[var(--color-accent-gold)]',
        'focus:border-[var(--color-accent-gold)]',
        'focus:shadow-[0_0_0_3px_var(--color-accent-gold-glow)]',
      ].join(' '),
    }

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--color-text-secondary)]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'h-10 w-full rounded-[var(--radius-md)] px-3 text-sm',
            'text-[var(--color-text-primary)]',
            'placeholder:text-[var(--color-text-muted)]',
            'outline-none transition-all duration-[var(--duration-fast)]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            variants[variant],
            error && 'border-red-400 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
