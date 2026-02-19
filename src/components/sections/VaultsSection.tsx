'use client'

import { Card, Badge, Button, Panel, Divider } from '@/design-system/components'
import { ArrowUpRight, TrendingUp, BarChart3, RefreshCw, Shield, Lock } from 'lucide-react'

const vaults = [
  {
    name: 'Liquid ETH Vault',
    asset: 'ETH',
    apy: '8.2%',
    tvl: '$1.2B',
    strategy: 'Multi-protocol yield optimization',
    risk: 'Medium',
  },
  {
    name: 'Liquid BTC Vault',
    asset: 'BTC',
    apy: '5.4%',
    tvl: '$680M',
    strategy: 'Cross-chain BTC yield farming',
    risk: 'Medium',
  },
  {
    name: 'Stablecoin Vault',
    asset: 'USDC/USDT',
    apy: '12.1%',
    tvl: '$520M',
    strategy: 'Delta-neutral stablecoin strategies',
    risk: 'Low',
  },
  {
    name: 'ETHFI Staking Vault',
    asset: 'ETHFI',
    apy: '15.6%',
    tvl: '$94M',
    strategy: 'Karak restaking + governance',
    risk: 'High',
  },
]

const overallMetrics = [
  { label: 'Total Vault TVL', value: '$2.5B' },
  { label: 'Avg. Vault APY', value: '10.3%', highlight: true },
  { label: 'Active Strategies', value: '24' },
  { label: 'Auto-Compounds', value: 'Daily' },
]

const features = [
  {
    icon: RefreshCw,
    title: 'Auto-Compounding',
    description: 'Earnings are automatically reinvested. No manual harvesting required.',
  },
  {
    icon: BarChart3,
    title: 'Diversified Strategies',
    description: 'Assets deployed across multiple DeFi protocols for optimized risk-adjusted returns.',
  },
  {
    icon: Shield,
    title: 'Automated Rebalancing',
    description: 'Smart rebalancing ensures your position is always optimally allocated.',
  },
]

export function VaultsSection() {
  return (
    <div className="flex flex-col items-center px-6 py-12 max-w-6xl mx-auto w-full gap-10">
      {/* Header */}
      <div className="text-center max-w-2xl space-y-4">
        <Badge variant="metal" className="gap-2">
          <TrendingUp className="h-3 w-3" />
          Yield Optimized
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] leading-tight">
          Liquid <span className="text-[var(--color-accent-gold)]">Vaults</span>
        </h1>
        <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
          Automated DeFi strategy vaults that optimize yields on ETH, BTC, and stablecoins.
          Diversified, auto-compounding, and professionally managed.
        </p>
      </div>

      {/* Overall Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
        {overallMetrics.map((metric) => (
          <Card
            key={metric.label}
            variant={metric.highlight ? 'metal' : 'primary'}
            padding="sm"
            className="text-center"
          >
            <span className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">
              {metric.label}
            </span>
            <div className="mt-1">
              <span className={`text-2xl md:text-3xl font-bold ${metric.highlight ? 'text-[var(--color-accent-gold)]' : 'text-[var(--color-text-primary)]'}`}>
                {metric.value}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <Divider variant="metal" label="Active Vaults" className="w-full" />

      {/* Vault Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {vaults.map((vault) => (
          <Card key={vault.name} variant="primary" padding="md" className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold text-[var(--color-text-primary)]">{vault.name}</h3>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{vault.strategy}</p>
              </div>
              <Badge variant={vault.risk === 'Low' ? 'primary' : vault.risk === 'High' ? 'ghost' : 'secondary'}>
                {vault.risk}
              </Badge>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border-subtle)]">
              <div>
                <span className="text-xs text-[var(--color-text-muted)]">APY</span>
                <div className="text-xl font-bold text-[var(--color-accent-gold)]">{vault.apy}</div>
              </div>
              <div className="text-right">
                <span className="text-xs text-[var(--color-text-muted)]">TVL</span>
                <div className="text-xl font-bold text-[var(--color-text-primary)]">{vault.tvl}</div>
              </div>
              <div className="text-right">
                <span className="text-xs text-[var(--color-text-muted)]">Asset</span>
                <div className="text-sm font-medium text-[var(--color-text-secondary)]">{vault.asset}</div>
              </div>
            </div>

            <Button variant="secondary" size="sm" className="w-full">
              Deposit
            </Button>
          </Card>
        ))}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {features.map((feature) => (
          <Panel key={feature.title} variant="secondary" className="flex flex-col items-center text-center !p-5 gap-3">
            <div className="h-10 w-10 rounded-full bg-[var(--color-accent-gold-muted)] border border-[var(--color-accent-gold-border)] flex items-center justify-center">
              <feature.icon className="h-5 w-5 text-[var(--color-accent-gold)]" />
            </div>
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{feature.title}</h3>
            <p className="text-xs text-[var(--color-text-tertiary)] leading-relaxed">{feature.description}</p>
          </Panel>
        ))}
      </div>
    </div>
  )
}
