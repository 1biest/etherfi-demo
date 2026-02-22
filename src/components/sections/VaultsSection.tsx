'use client'

import { useState, useMemo } from 'react'
import { Card, Badge, Button, Panel, Divider, InteractiveMetalButton } from '@/design-system/components'
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
    description:
      'Assets deployed across multiple DeFi protocols for optimized risk-adjusted returns.',
  },
  {
    icon: Shield,
    title: 'Automated Rebalancing',
    description: 'Smart rebalancing ensures your position is always optimally allocated.',
  },
]

export function VaultsSection() {
  const [sortConfig, setSortConfig] = useState<{
    key: 'name' | 'asset' | 'tvl' | 'apy' | 'risk' | null
    direction: 'asc' | 'desc'
  }>({ key: 'tvl', direction: 'desc' })

  const handleSort = (key: 'name' | 'asset' | 'tvl' | 'apy' | 'risk') => {
    let direction: 'asc' | 'desc' = 'desc'
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc'
    }
    setSortConfig({ key, direction })
  }

  const sortedVaults = useMemo(() => {
    const sortableVaults = [...vaults]
    if (sortConfig.key !== null) {
      sortableVaults.sort((a, b) => {
        let aValue: string | number = a[sortConfig.key!]
        let bValue: string | number = b[sortConfig.key!]

        // Convert formatted strings to numbers for accurate sorting
        if (sortConfig.key === 'tvl') {
          aValue = parseFloat(a.tvl.replace(/[^0-9.-]+/g, '')) * (a.tvl.includes('B') ? 1000 : 1)
          bValue = parseFloat(b.tvl.replace(/[^0-9.-]+/g, '')) * (b.tvl.includes('B') ? 1000 : 1)
        } else if (sortConfig.key === 'apy') {
          aValue = parseFloat(a.apy.replace(/[%]/g, ''))
          bValue = parseFloat(b.apy.replace(/[%]/g, ''))
        } else if (sortConfig.key === 'risk') {
          const riskMap = { Low: 1, Medium: 2, High: 3 }
          aValue = riskMap[a.risk as keyof typeof riskMap]
          bValue = riskMap[b.risk as keyof typeof riskMap]
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }
    return sortableVaults
  }, [sortConfig])

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-6 py-12 cursor-default">
      {/* Header */}
      <div className="max-w-2xl space-y-4 text-center">
        <Badge variant="metal" className="gap-2">
          <TrendingUp className="h-3 w-3" />
          Yield Optimized
        </Badge>
        <h1 className="text-4xl leading-tight font-bold text-[var(--color-text-primary)] md:text-5xl">
          Liquid <span className="text-[var(--color-accent-gold)]">Vaults</span>
        </h1>
        <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
          Automated DeFi strategy vaults that optimize yields on ETH, BTC, and stablecoins.
          Diversified, auto-compounding, and professionally managed.
        </p>
      </div>

      {/* Overall Metrics */}
      <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-4">
        {overallMetrics.map((metric) => (
          <Card
            key={metric.label}
            variant={metric.highlight ? 'metal' : 'primary'}
            padding="sm"
            className="text-center"
          >
            <span className="text-xs font-medium tracking-wider text-[var(--color-text-tertiary)] uppercase">
              {metric.label}
            </span>
            <div className="mt-1">
              <span
                className={`text-2xl font-bold md:text-3xl ${metric.highlight ? 'text-[var(--color-accent-gold)]' : 'text-[var(--color-text-primary)]'}`}
              >
                {metric.value}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <Divider variant="metal" label="Active Vaults" className="w-full" />

      {/* Sortable Vaults List */}
      <div className="w-full space-y-4">
        {/* Table Header / Legend */}
        <div className="hidden grid-cols-12 gap-4 px-6 pb-2 text-xs font-medium tracking-wider text-[var(--color-text-tertiary)] uppercase md:grid">
          <button
            onClick={() => handleSort('name')}
            className="col-span-3 flex cursor-pointer items-center gap-1 hover:text-[var(--color-text-primary)] transition-colors text-left"
          >
            Vault Name
            {sortConfig.key === 'name' && (
              <span className="text-[var(--color-accent-gold)]">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
            )}
          </button>
          <button
            onClick={() => handleSort('asset')}
            className="col-span-2 flex cursor-pointer items-center gap-1 hover:text-[var(--color-text-primary)] transition-colors text-left"
          >
            Asset
            {sortConfig.key === 'asset' && (
              <span className="text-[var(--color-accent-gold)]">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
            )}
          </button>
          <button
            onClick={() => handleSort('tvl')}
            className="col-span-2 flex cursor-pointer items-center justify-end gap-1 hover:text-[var(--color-text-primary)] transition-colors text-right"
          >
            {sortConfig.key === 'tvl' && (
              <span className="text-[var(--color-accent-gold)]">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
            )}
            TVL
          </button>
          <button
            onClick={() => handleSort('apy')}
            className="col-span-2 flex cursor-pointer items-center justify-end gap-1 hover:text-[var(--color-text-primary)] transition-colors text-right"
          >
            {sortConfig.key === 'apy' && (
              <span className="text-[var(--color-accent-gold)]">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
            )}
            APY
          </button>
          <button
            onClick={() => handleSort('risk')}
            className="col-span-2 flex cursor-pointer items-center justify-center gap-1 hover:text-[var(--color-text-primary)] transition-colors text-center"
          >
            Risk
            {sortConfig.key === 'risk' && (
              <span className="text-[var(--color-accent-gold)]">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
            )}
          </button>
          <div className="col-span-1" />
        </div>

        {/* Vault Rows */}
        <div className="flex flex-col gap-3">
          {sortedVaults.map((vault) => (
            <Card
              key={vault.name}
              variant="primary"
              padding="sm"
              className="group flex flex-col gap-4 scale-100 cursor-pointer transition-all duration-500 ease-out hover:scale-[1.02] hover:bg-[var(--color-surface-hover)] md:grid md:grid-cols-12 md:items-center md:px-6 md:py-4"
            >
              {/* Mobile: Top Row | Desktop: Col 1 */}
              <div className="col-span-3">
                <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                  {vault.name}
                </h3>
                <p className="mt-0.5 text-xs text-[var(--color-text-muted)] line-clamp-1">{vault.strategy}</p>
              </div>

              {/* Mobile: Asset/Badge | Desktop: Col 2 */}
              <div className="col-span-2 flex items-center justify-between md:block">
                <span className="text-xs text-[var(--color-text-muted)] md:hidden">Asset</span>
                <div className="text-sm font-medium text-[var(--color-text-secondary)]">
                  {vault.asset}
                </div>
              </div>

              {/* Stats Row */}
              <div className="col-span-2 flex items-center justify-between md:justify-end">
                <span className="text-xs text-[var(--color-text-muted)] md:hidden">TVL</span>
                <div className="text-base font-bold text-[var(--color-text-primary)]">
                  {vault.tvl}
                </div>
              </div>

              <div className="col-span-2 flex items-center justify-between md:justify-end">
                <span className="text-xs text-[var(--color-text-muted)] md:hidden">APY</span>
                <div className="text-2xl font-black tracking-tight text-[var(--color-accent-gold)] drop-shadow-[0_0_12px_rgba(232,212,139,0.3)]">
                  {vault.apy}
                </div>
              </div>

              {/* Risk */}
              <div className="col-span-2 flex items-center justify-between md:justify-center">
                <span className="text-xs text-[var(--color-text-muted)] md:hidden">Risk</span>
                <Badge
                  variant={
                    vault.risk === 'Low' ? 'primary' : vault.risk === 'High' ? 'ghost' : 'secondary'
                  }
                >
                  {vault.risk}
                </Badge>
              </div>

              {/* Action */}
              <div className="col-span-1 mt-2 flex justify-end md:mt-0">
                <InteractiveMetalButton variant="secondary" size="sm" className="w-full md:w-auto">
                  Deposit
                </InteractiveMetalButton>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 cursor-default">
        {features.map((feature) => (
          <Panel
            key={feature.title}
            variant="secondary"
            className="flex flex-col items-center gap-3 !p-5 text-center"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-accent-gold-border)] bg-[var(--color-accent-gold-muted)]">
              <feature.icon className="h-5 w-5 text-[var(--color-accent-gold)]" />
            </div>
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
              {feature.title}
            </h3>
            <p className="text-xs leading-relaxed text-[var(--color-text-tertiary)]">
              {feature.description}
            </p>
          </Panel>
        ))}
      </div>
    </div>
  )
}
