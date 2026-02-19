import * as React from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'metal'
  padding?: 'sm' | 'md' | 'lg'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'primary', padding = 'md', children, ...props }, ref) => {
    const variants: Record<string, string> = {
      primary: [
        'paper-elevated texture-grain',
        'rounded-[var(--radius-lg)]',
      ].join(' '),
      secondary: [
        'paper-base',
        'rounded-[var(--radius-lg)]',
      ].join(' '),
      ghost: [
        'bg-transparent border border-[var(--color-border-subtle)]',
        'rounded-[var(--radius-lg)]',
      ].join(' '),
      metal: [
        'paper-elevated light-metal-highlight texture-grain',
        'border-[var(--color-border-gold)]',
        'rounded-[var(--radius-lg)]',
      ].join(' '),
    }

    const paddings: Record<string, string> = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }

    return (
      <div
        ref={ref}
        className={cn(variants[variant], paddings[padding], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = 'Card'

export { Card }
