import * as React from 'react'
import { cn } from '@/lib/utils'

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'metal'
}

const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    const variants: Record<string, string> = {
      primary: ['paper-base texture-grain', 'rounded-[var(--radius-xl)] p-8'].join(' '),
      secondary: [
        'bg-[var(--color-surface-secondary)]',
        'border border-[var(--color-border-default)]',
        'shadow-[var(--shadow-xs)]',
        'rounded-[var(--radius-xl)] p-8',
      ].join(' '),
      ghost: [
        'bg-transparent',
        'border border-dashed border-[var(--color-border-default)]',
        'rounded-[var(--radius-xl)] p-8',
      ].join(' '),
      metal: [
        'paper-base light-metal-highlight texture-grain',
        'border-[var(--color-border-gold)]',
        'rounded-[var(--radius-xl)] p-8',
        'glow-soft',
      ].join(' '),
    }

    return (
      <div ref={ref} className={cn('relative', variants[variant], className)} {...props}>
        {children}
      </div>
    )
  },
)
Panel.displayName = 'Panel'

export { Panel }
