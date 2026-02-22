import * as React from 'react'
import { Button, ButtonProps } from './Button'
import { cn } from '@/lib/utils'

export interface InteractiveMetalButtonProps extends ButtonProps {}

export const InteractiveMetalButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveMetalButtonProps
>(({ className, variant = 'secondary', ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant={variant}
      className={cn(
        // Specific transitions to avoid transitioning the text color
        'transition-[background,border,box-shadow,transform] duration-300 ease-in-out',
        // Base group-hover states aiming for the metal-interactive look
        'group-hover:bg-[linear-gradient(165deg,var(--color-accent-gold-highlight)_0%,var(--color-accent-gold)_40%,var(--color-accent-gold-dark)_100%)]',
        'group-hover:border-[var(--color-accent-gold)]',
        '!transition-[background,border,box-shadow,transform] group-hover:!text-[var(--color-surface-ivory)] group-hover:transition-[color] group-hover:delay-0 group-hover:duration-0',
        'group-hover:shadow-[var(--shadow-sm),inset_0_1px_0_rgba(232,212,139,0.4),inset_0_-1px_0_rgba(138,111,46,0.2)]',
        'group-hover:delay-100',

        // Actual button hover within the already-hovered group (elevate slightly more like native metal-interactive)
        'hover:!shadow-[var(--shadow-md),inset_0_1px_0_rgba(232,212,139,0.5),inset_0_-1px_0_rgba(138,111,46,0.2)]',
        'hover:!-translate-y-[1px]',
        'hover:delay-0',

        // Active state (pressed)
        'active:!shadow-[var(--shadow-xs),var(--shadow-inner-pressed)]',
        'active:!translate-y-[0px]',
        'active:delay-0',
        className,
      )}
      {...props}
    />
  )
})
InteractiveMetalButton.displayName = 'InteractiveMetalButton'
