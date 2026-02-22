import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'metal'
  size?: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled, ...props }, ref) => {
    const base = [
      'relative inline-flex items-center justify-center font-medium',
      'transition-all',
      'focus-visible:outline-none',
      'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
    ].join(' ')

    const variants: Record<string, string> = {
      primary: [
        'bg-[var(--color-text-primary)] text-[var(--color-surface-ivory)]',
        'shadow-[var(--shadow-sm)]',
        'hover:translate-y-[-1px] hover:shadow-[var(--shadow-md)]',
        'active:translate-y-[0px] active:shadow-[var(--shadow-xs)]',
        'focus-visible:shadow-[0_0_0_3px_var(--color-accent-gold-glow)]',
      ].join(' '),
      secondary: [
        'bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)]',
        'border border-[var(--color-border-default)]',
        'shadow-[var(--shadow-xs)]',
        'hover:bg-[var(--color-surface-ivory)] hover:translate-y-[-1px] hover:shadow-[var(--shadow-sm)]',
        'active:bg-[var(--color-surface-pressed)] active:translate-y-[0px] active:shadow-[var(--shadow-inner-pressed)]',
        'focus-visible:shadow-[0_0_0_3px_var(--color-accent-gold-glow)]',
      ].join(' '),
      ghost: [
        'bg-transparent text-[var(--color-text-secondary)]',
        'hover:bg-[var(--color-accent-gold-muted)] hover:text-[var(--color-text-primary)]',
        'active:bg-[var(--color-accent-gold-glow)]',
        'focus-visible:shadow-[0_0_0_3px_var(--color-accent-gold-glow)]',
      ].join(' '),
      metal: [
        'metal-interactive text-[var(--color-surface-ivory)]',
        'focus-visible:shadow-[0_0_0_3px_var(--color-accent-gold-glow)]',
      ].join(' '),
    }

    const sizes: Record<string, string> = {
      sm: 'h-8 px-3 text-sm gap-1.5 rounded-[var(--radius-sm)]',
      md: 'h-10 px-4 text-sm gap-2 rounded-[var(--radius-md)]',
      lg: 'h-12 px-6 text-base gap-2.5 rounded-[var(--radius-md)]',
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          base,
          variants[variant],
          sizes[size],
          'duration-[var(--duration-fast)]',
          className,
        )}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button }
