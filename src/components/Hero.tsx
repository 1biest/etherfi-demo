'use client'

import { Button, Badge } from '@/design-system/components'
import { YieldDisplay } from './YieldDisplay'
import { useEtherFi } from '@/hooks/useEtherFi'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  const { apy, tvl } = useEtherFi()

  return (
    <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[85vh] overflow-hidden">
      {/* Soft ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[var(--color-accent-gold-glow)] rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[var(--color-accent-gold-muted)] rounded-full blur-[100px] -z-10" />

      <div className="text-center max-w-3xl mx-auto space-y-8 z-10">
        {/* Status Badge */}
        <Badge variant="metal" className="gap-2">
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
          Native Restaking is live
        </Badge>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--color-text-primary)] text-balance leading-[1.1]">
          Make your ETH{' '}
          <span className="text-[var(--color-accent-gold)]">
            Work Harder
          </span>
        </h1>

        {/* Subline */}
        <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto text-balance leading-relaxed">
          Stake your ETH to receive eETH. Native restaking on EigenLayer to supercharge your rewards.
          Keep control of your keys.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Button size="lg" variant="metal">
            Stake Now
          </Button>
          <Button size="lg" variant="ghost" className="group">
            Learn More
            <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Yield Display */}
        <div className="pt-12 w-full max-w-2xl mx-auto">
          <YieldDisplay apy={apy} tvl={tvl} />
        </div>
      </div>
    </section>
  )
}
