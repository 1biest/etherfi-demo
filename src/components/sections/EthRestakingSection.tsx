'use client'

import { Card, Badge, Button, Panel, Divider } from '@/design-system/components'
import { ArrowUpRight, Shield, Layers, Zap, Globe, Lock } from 'lucide-react'

const metrics = [
  { label: 'Total Value Locked', value: '$6.4B', change: '+12.3%', period: '30d' },
  { label: 'ETH Staked', value: '2.7M', change: '+2.1%', period: '7d', unit: 'ETH' },
  { label: 'Staking APY', value: '3.85%', highlight: true },
  { label: 'Validators', value: '84,200+', change: '+340', period: '30d' },
  { label: 'DeFi Integrations', value: '400+' },
  { label: 'Unique Stakers', value: '100K+' },
]

const features = [
  {
    icon: Lock,
    title: 'Non-Custodial',
    description: 'Retain full control of your validator keys. Your ETH, your keys.',
  },
  {
    icon: Layers,
    title: 'EigenLayer Restaking',
    description: 'Native restaking on EigenLayer for compounded rewards and EIGEN points.',
  },
  {
    icon: Zap,
    title: 'Liquid Staking Token',
    description: 'Receive eETH/weETH — use across 400+ DeFi protocols while earning.',
  },
  {
    icon: Globe,
    title: 'Auto-Compounding',
    description: 'Rewards are automatically compounded. No manual claiming needed.',
  },
]

export function EthRestakingSection() {
  return (
    <div className="flex flex-col items-center px-6 py-12 max-w-6xl mx-auto w-full gap-10">
      {/* Header */}
      <div className="text-center max-w-2xl space-y-4">
        <Badge variant="metal" className="gap-2">
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
          Live on Mainnet
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] leading-tight">
          ETH <span className="text-[var(--color-accent-gold)]">Restaking</span>
        </h1>
        <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
          Stake your ETH to receive eETH — a liquid staking token with native restaking on EigenLayer.
          Earn staking rewards, restaking points, and EigenLayer points simultaneously.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
        {metrics.map((metric) => (
          <Card
            key={metric.label}
            variant={metric.highlight ? 'metal' : 'primary'}
            padding="sm"
            className="text-center"
          >
            <span className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">
              {metric.label}
            </span>
            <div className="mt-1 flex items-baseline justify-center gap-1.5">
              <span className={`text-2xl md:text-3xl font-bold ${metric.highlight ? 'text-[var(--color-accent-gold)]' : 'text-[var(--color-text-primary)]'}`}>
                {metric.value}
              </span>
              {metric.unit && (
                <span className="text-sm text-[var(--color-text-muted)]">{metric.unit}</span>
              )}
            </div>
            {metric.change && (
              <div className="mt-1 flex items-center justify-center gap-1 text-xs text-emerald-700">
                <ArrowUpRight className="h-3 w-3" />
                <span>{metric.change} ({metric.period})</span>
              </div>
            )}
          </Card>
        ))}
      </div>

      <Divider variant="metal" className="w-full" />

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {features.map((feature) => (
          <Panel key={feature.title} variant="secondary" className="flex gap-4 items-start !p-5">
            <div className="h-10 w-10 rounded-[var(--radius-md)] bg-[var(--color-accent-gold-muted)] border border-[var(--color-accent-gold-border)] flex items-center justify-center flex-shrink-0">
              <feature.icon className="h-5 w-5 text-[var(--color-accent-gold)]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{feature.title}</h3>
              <p className="text-sm text-[var(--color-text-tertiary)] mt-0.5 leading-relaxed">{feature.description}</p>
            </div>
          </Panel>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-4 pt-2">
        <Button variant="metal" size="lg">Stake ETH</Button>
        <Button variant="ghost" size="lg">View Docs</Button>
      </div>
    </div>
  )
}
