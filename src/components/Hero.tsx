'use client'

import { Button, Badge } from '@/design-system/components'
import { YieldDisplay } from './YieldDisplay'
import { useEtherFi } from '@/hooks/useEtherFi'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  const { apy, tvl } = useEtherFi()

  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      {/* Soft ambient light */}
      <div className="absolute top-0 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[var(--color-accent-gold-glow)] blur-[120px]" />
      <div className="absolute right-0 bottom-0 -z-10 h-[300px] w-[400px] rounded-full bg-[var(--color-accent-gold-muted)] blur-[100px]" />

      <div className="z-10 mx-auto max-w-3xl space-y-8 text-center">
        {/* Status Badge */}
        <Badge variant="metal" className="gap-2">
          <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-600" />
          Native Restaking is live
        </Badge>

        {/* Heading */}
        <h1 className="text-5xl leading-[1.1] font-bold tracking-tight text-balance text-[var(--color-text-primary)] md:text-7xl">
          Make your ETH <span className="text-[var(--color-accent-gold)]">Work Harder</span>
        </h1>

        {/* Subline */}
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-balance text-[var(--color-text-secondary)] md:text-xl">
          Stake your ETH to receive eETH. Native restaking on EigenLayer to supercharge your
          rewards. Keep control of your keys.
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
          <Button size="lg" variant="metal">
            Stake Now
          </Button>
          <Button size="lg" variant="ghost" className="group">
            Learn More
            <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Yield Display */}
        <div className="mx-auto w-full max-w-2xl pt-12">
          <YieldDisplay apy={apy} tvl={tvl} />
        </div>
      </div>
    </section>
  )
}
