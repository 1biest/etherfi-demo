'use client'

import { Button, Panel, Divider } from '@/design-system/components'
import { CreditCard, Zap } from 'lucide-react'

export function CashCardPromo() {
  return (
    <section id="cash" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <Divider variant="metal" className="max-w-7xl mx-auto mb-16" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Copy */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text-primary)] leading-tight">
            Spend your yield.{' '}
            <span className="text-[var(--color-accent-gold)]">
              Real-world utility.
            </span>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
            The Ether.fi Cash Card lets you spend your crypto rewards anywhere Visa is accepted.
            Earn up to 3% crypto-back on every purchase.
          </p>

          <ul className="space-y-3 pt-2">
            {[
              'No foreign transaction fees',
              'Metal card for premium tiers',
              'Instant settlement with eETH',
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                <div className="h-6 w-6 rounded-full bg-[var(--color-accent-gold-muted)] border border-[var(--color-accent-gold-border)] flex items-center justify-center flex-shrink-0">
                  <Zap className="h-3 w-3 text-[var(--color-accent-gold)]" />
                </div>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4">
            <Button size="lg" variant="primary">
              Join Waitlist
            </Button>
          </div>
        </div>

        {/* Card Mockup */}
        <div className="relative group">
          <Panel variant="metal" className="p-0 overflow-hidden">
            <div className="relative w-full aspect-[1.586] p-8 flex flex-col justify-between">
              {/* Surface highlight */}
              <div className="absolute inset-0 light-top-diffuse pointer-events-none" />

              <div className="flex justify-between items-start relative z-10">
                <div className="text-xl font-bold text-[var(--color-accent-gold)]">
                  ether.fi
                </div>
                <CreditCard className="h-7 w-7 text-[var(--color-text-muted)]" />
              </div>

              <div className="space-y-4 relative z-10">
                {/* Chip */}
                <div className="flex gap-2">
                  <div className="h-7 w-9 rounded-md metal-accent opacity-70" />
                </div>

                {/* Number */}
                <div className="text-base tracking-[0.25em] text-[var(--color-text-tertiary)] font-mono">
                  •••• •••• •••• 4829
                </div>

                {/* Details */}
                <div className="flex justify-between items-end">
                  <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
                    Card Holder
                    <div className="text-sm text-[var(--color-text-primary)] mt-0.5 font-medium tracking-normal normal-case">
                      Card Holder
                    </div>
                  </div>
                  <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider text-right">
                    Expires
                    <div className="text-sm text-[var(--color-text-primary)] mt-0.5 font-medium tracking-normal">
                      12/28
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Panel>

          {/* Subtle ambient glow */}
          <div className="absolute -inset-6 bg-[var(--color-accent-gold-glow)] rounded-[var(--radius-xl)] blur-2xl -z-10 opacity-50 group-hover:opacity-80 transition-opacity duration-[var(--duration-slow)]" />
        </div>
      </div>
    </section>
  )
}
