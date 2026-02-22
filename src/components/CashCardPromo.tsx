'use client'

import { Button, Panel, Divider } from '@/design-system/components'
import { CreditCard, Zap } from 'lucide-react'
import { CreditCard3D } from './CreditCard3D'

export function CashCardPromo() {
  return (
    <section id="cash" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <Divider variant="metal" className="mx-auto mb-16 max-w-7xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <div className="space-y-6">
          <h2 className="text-3xl leading-tight font-bold text-[var(--color-text-primary)] md:text-5xl">
            Spend your yield.{' '}
            <span className="text-[var(--color-accent-gold)]">Real-world utility.</span>
          </h2>
          <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
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
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-[var(--color-accent-gold-border)] bg-[var(--color-accent-gold-muted)]">
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
        <div className="group relative mx-auto w-full max-w-[400px]">
          <CreditCard3D />

          {/* Subtle ambient glow */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius-xl)] bg-[#c7ec4c] opacity-30 blur-[80px] transition-opacity duration-[800ms] group-hover:opacity-50" />
        </div>
      </div>
    </section>
  )
}
