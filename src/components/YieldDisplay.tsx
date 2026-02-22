'use client'

import { Card, Badge, Divider } from '@/design-system/components'
import { ArrowUpRight } from 'lucide-react'

interface YieldDisplayProps {
  apy: number
  tvl: string
}

export function YieldDisplay({ apy, tvl }: YieldDisplayProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Card variant="metal" padding="md">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-sm font-medium text-[var(--color-text-tertiary)]">
            Passively Earning
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-bold text-[var(--color-accent-gold)]">{apy}%</span>
            <span className="text-sm font-semibold text-[var(--color-accent-gold-dark)]">APY</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-700">
            <ArrowUpRight className="h-3 w-3" />
            <span>+0.2% this week</span>
          </div>
        </div>
      </Card>

      <Card variant="primary" padding="md">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-sm font-medium text-[var(--color-text-tertiary)]">
            Total Value Locked
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-[var(--color-text-primary)]">${tvl}</span>
          </div>
          <Badge variant="metal">Trusted by 100k+ users</Badge>
        </div>
      </Card>
    </div>
  )
}
