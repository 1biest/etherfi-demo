'use client'

import { Button, Panel, Divider } from '@/design-system/components'
import { CreditCard, Zap } from 'lucide-react'
import { CreditCard3D } from './CreditCard3D'

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
        <div className="relative group w-full max-w-[400px] mx-auto">
          <CreditCard3D />

          {/* Subtle ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#c7ec4c] rounded-[var(--radius-xl)] blur-[80px] -z-10 opacity-30 group-hover:opacity-50 transition-opacity duration-[800ms] pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
