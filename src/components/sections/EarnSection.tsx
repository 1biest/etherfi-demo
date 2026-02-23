'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  Card,
  Badge,
  Button,
  Panel,
  Divider,
  InteractiveMetalButton,
} from '@/design-system/components'
import { ArrowUpRight, Shield, Layers, Zap, Globe, Lock, Loader2, ChevronDown } from 'lucide-react'
import { useEtherfiRates, BaseAssetData } from '@/hooks/useEtherfiRates'

const ASSET_ICONS: Record<string, string> = {
  ETH: 'https://etherfi.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fa2eb6f5b-6767-43e2-890d-4acb71d6176b%2F4da40c95-7d07-41f5-941f-465457e90b1c%2FLiquid.svg?id=1deb0952-7c43-81dc-8d2c-cdc2cf37dee2&table=block&spaceId=a2eb6f5b-6767-43e2-890d-4acb71d6176b&userId=&cache=v2',
  wETH: 'https://etherfi.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fa2eb6f5b-6767-43e2-890d-4acb71d6176b%2Fb959e47c-10a1-4ebc-b0af-4980f6938b37%2Feeth.png?id=1deb0952-7c43-81d8-b4d3-ed63077f7b7a&table=block&spaceId=a2eb6f5b-6767-43e2-890d-4acb71d6176b&width=2000&userId=&cache=v2',
  weETH:
    'https://etherfi.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fa2eb6f5b-6767-43e2-890d-4acb71d6176b%2F0536547a-f5e0-461c-8c9d-75e532a90dfa%2Fweeth.png?id=1deb0952-7c43-8192-a668-fd4e42ff1d15&table=block&spaceId=a2eb6f5b-6767-43e2-890d-4acb71d6176b&width=2000&userId=&cache=v2',
  sETHFI:
    'https://etherfi.notion.site/image/attachment%3A746c0e4b-881b-4f99-8539-4fb1abc6adf0%3AETHFI.svg?id=265b0952-7c43-8067-82b1-d6a41a4f31b2&table=block&spaceId=a2eb6f5b-6767-43e2-890d-4acb71d6176b&userId=&cache=v2', // ETHFI logo for sETHFI
  eBTC: 'https://etherfi.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fa2eb6f5b-6767-43e2-890d-4acb71d6176b%2F9fcff3ce-61e5-441f-8062-1dffefeacfdd%2FeBTC.svg?id=1deb0952-7c43-81aa-b13f-eee3795f4dcf&table=block&spaceId=a2eb6f5b-6767-43e2-890d-4acb71d6176b&userId=&cache=v2',
  eUSD: 'https://etherfi.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fa2eb6f5b-6767-43e2-890d-4acb71d6176b%2F882883d7-c872-441a-8c0b-3e7a7c2b915d%2FeUSD.svg?id=1deb0952-7c43-81b7-a293-f9da26ac6e39&table=block&spaceId=a2eb6f5b-6767-43e2-890d-4acb71d6176b&userId=&cache=v2',
  beHYPE: 'https://cryptologos.cc/logos/hyperliquid-hype-logo.svg', // generic or hype logo fallback
  frxUSD: 'https://cryptologos.cc/logos/frax-share-fxs-logo.svg', // Frax fallback logo
}

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

export function EarnSection() {
  const { data: ratesData, isLoading: isLoadingRates } = useEtherfiRates()
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const router = useRouter()

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category)
  }

  // Group assets
  const groupedAssets = {
    ETH: [] as BaseAssetData[],
    BTC: [] as BaseAssetData[],
    USD: [] as BaseAssetData[],
  }

  if (ratesData?.etherfi) {
    Object.values(ratesData.etherfi).forEach((asset) => {
      if (asset.symbol === 'eBTC') {
        groupedAssets.BTC.push(asset)
      } else if (asset.symbol?.includes('USD')) {
        groupedAssets.USD.push(asset)
      } else {
        groupedAssets.ETH.push(asset)
      }
    })
  }

  const CATEGORY_DETAILS = {
    ETH: {
      name: 'Ethereum',
      icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg',
      description: 'Native ETH staking, Liquid Restaking Tokens (LRTs), and governance tokens.',
    },
    BTC: {
      name: 'Bitcoin',
      icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg',
      description: 'Bitcoin staking and restaking yields.',
    },
    USD: {
      name: 'Stablecoin',
      icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg',
      description: 'Delta-neutral and stable-yield strategies.',
    },
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-6 py-12">
      {/* Header */}
      <div className="max-w-2xl cursor-default space-y-4 text-center">
        <Badge variant="metal" className="gap-2">
          <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-600" />
          Live on Mainnet
        </Badge>
        <h1 className="text-4xl leading-tight font-bold text-[var(--color-text-primary)] md:text-5xl">
          Stake & <span className="text-[var(--color-accent-gold)]">Earn</span>
        </h1>
        <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
          Earn rewards on your idle crypto with these value-accruing assets you can use across DeFi.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid w-full cursor-default grid-cols-2 gap-3 md:grid-cols-3">
        {metrics.map((metric) => (
          <Card
            key={metric.label}
            variant={metric.highlight ? 'metal' : 'primary'}
            padding="sm"
            className="text-center"
          >
            <span className="text-xs font-medium tracking-wider text-[var(--color-text-tertiary)] uppercase">
              {metric.label}
            </span>
            <div className="mt-1 flex items-baseline justify-center gap-1.5">
              <span
                className={`text-2xl font-bold md:text-3xl ${metric.highlight ? 'text-[var(--color-accent-gold)]' : 'text-[var(--color-text-primary)]'}`}
              >
                {metric.value}
              </span>
              {metric.unit && (
                <span className="text-sm text-[var(--color-text-muted)]">{metric.unit}</span>
              )}
            </div>
            {metric.change && (
              <div className="mt-1 flex items-center justify-center gap-1 text-xs text-emerald-700">
                <ArrowUpRight className="h-3 w-3" />
                <span>
                  {metric.change} ({metric.period})
                </span>
              </div>
            )}
          </Card>
        ))}
      </div>

      <Divider variant="metal" className="w-full" />

      {/* Assets Grid */}
      <div className="flex w-full flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="cursor-default text-2xl font-bold text-[var(--color-text-primary)]">
            Supported Assets
          </h2>
        </div>

        {isLoadingRates && (
          <div className="flex w-full items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--color-accent-gold)]" />
          </div>
        )}

        {ratesData?.etherfi && (
          <div className="flex w-full flex-col gap-6">
            {(
              Object.entries(groupedAssets) as [keyof typeof CATEGORY_DETAILS, BaseAssetData[]][]
            ).map(([category, assets]) => {
              if (assets.length === 0) return null

              const isExpanded = expandedCategory === category
              const details = CATEGORY_DETAILS[category]

              // Calculate category aggregates
              const totalTvl = assets.reduce((sum, a) => sum + (a.tvl || 0), 0)
              const maxApy = Math.max(...assets.map((a) => a.apy || 0))

              return (
                <div key={category} className="flex flex-col gap-4">
                  {/* Category Header Card wrapper */}
                  <Card
                    variant="primary"
                    className={`group/category flex flex-col overflow-hidden !p-0 transition-all duration-300 ease-out ${isExpanded ? 'border-[var(--color-accent-gold-border)] bg-[var(--color-surface-hover)]' : 'hover:bg-[var(--color-surface-hover)]'}`}
                  >
                    {/* Header Section (Clickable) */}
                    <div
                      className="flex cursor-pointer flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between"
                      onClick={() => toggleCategory(category)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--color-accent-gold-border)] bg-[var(--color-accent-gold-muted)] p-2">
                          <img
                            src={details.icon}
                            alt={`${details.name} icon`}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                            {details.name}
                          </h3>
                          <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">
                            {details.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-8 md:justify-end">
                        <div className="flex flex-col text-left md:text-right">
                          <span className="mb-1 text-xs tracking-wider text-[var(--color-text-muted)] uppercase">
                            Up To
                          </span>
                          <div className="text-2xl font-black tracking-tight text-[var(--color-accent-gold)] drop-shadow-[0_0_12px_rgba(232,212,139,0.3)]">
                            {maxApy.toFixed(2)}%{' '}
                            <span className="pl-1 text-sm font-medium text-[var(--color-text-tertiary)]">
                              APY
                            </span>
                          </div>
                        </div>

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-surface-tertiary)] text-[var(--color-text-secondary)] transition-colors group-hover/category:border-[var(--color-accent-gold-border)] group-hover/category:text-[var(--color-accent-gold)]">
                          <ChevronDown
                            className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Expandable Sub-strategies Section */}
                    <div
                      className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-6 pb-6">
                          <Divider className="mb-5 opacity-40" />
                          <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
                            {assets.map((asset) => (
                              <Card
                                key={asset.name}
                                variant="secondary"
                                padding="sm"
                                onClick={() => router.push(`/earn/${asset.symbol || asset.name}`)}
                                className="group flex scale-100 cursor-pointer flex-col gap-4 !p-6 transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-[var(--color-surface-hover)]"
                              >
                                {/* Header Row: Icon + Name/Desc */}
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--color-accent-gold-border)] bg-[var(--color-accent-gold-muted)]">
                                        {ASSET_ICONS[asset.symbol || asset.name] ? (
                                          <img
                                            src={ASSET_ICONS[asset.symbol || asset.name]}
                                            alt={`${asset.name} icon`}
                                            className="h-full w-full object-cover"
                                          />
                                        ) : (
                                          <span className="text-base font-bold text-[var(--color-accent-gold)]">
                                            {(asset.symbol || asset.name).charAt(0)}
                                          </span>
                                        )}
                                      </div>
                                      <div className="flex flex-col items-start pt-0.5">
                                        <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                                          {asset.name}
                                        </h3>
                                        <p className="mt-0.5 line-clamp-1 text-[11px] text-[var(--color-text-muted)]">
                                          {asset.description || asset.type.replace('-', ' ')}
                                        </p>
                                      </div>
                                    </div>
                                    <Badge
                                      variant={
                                        asset.type === 'native'
                                          ? 'primary'
                                          : asset.apy && asset.apy > 6
                                            ? 'ghost'
                                            : 'secondary'
                                      }
                                      className="h-auto px-2 py-0.5 text-[10px]"
                                    >
                                      {asset.type === 'native'
                                        ? 'Low Risk'
                                        : asset.apy && asset.apy > 6
                                          ? 'High Risk'
                                          : 'Medium Risk'}
                                    </Badge>
                                  </div>
                                </div>

                                <div className="mt-2 flex flex-col gap-3">
                                  {/* APY */}
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-[var(--color-text-muted)]">
                                      APY
                                    </span>
                                    <div className="text-2xl font-black tracking-tight text-[var(--color-accent-gold)] drop-shadow-[0_0_12px_rgba(232,212,139,0.3)]">
                                      {(asset.apy ?? 0).toFixed(2)}%
                                    </div>
                                  </div>

                                  {/* TVL */}
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-[var(--color-text-muted)]">
                                      TVL
                                    </span>
                                    <div className="text-sm font-bold text-[var(--color-text-primary)]">
                                      {asset.tvl !== undefined && asset.tvl > 0
                                        ? asset.tvl >= 1000000
                                          ? `$${(asset.tvl / 1000000).toFixed(2)}M`
                                          : asset.tvl >= 1000
                                            ? `$${(asset.tvl / 1000).toFixed(2)}k`
                                            : `$${asset.tvl.toFixed(2)}`
                                        : '-'}
                                    </div>
                                  </div>

                                  {/* Price */}
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-[var(--color-text-muted)]">
                                      Price
                                    </span>
                                    <div className="text-sm font-medium text-[var(--color-text-secondary)]">
                                      $
                                      {(asset.price ?? 0).toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      })}
                                    </div>
                                  </div>

                                  {/* 24h Change */}
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-[var(--color-text-muted)]">
                                      24h Change
                                    </span>
                                    <div className="flex items-center gap-1">
                                      {asset.change24h !== undefined ? (
                                        <p
                                          className={`text-sm font-medium ${asset.change24h >= 0 ? 'text-emerald-500' : 'text-red-500'}`}
                                        >
                                          {asset.change24h > 0 ? '+' : ''}
                                          {asset.change24h.toFixed(2)}%
                                        </p>
                                      ) : (
                                        <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                                          -
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {/* Action */}
                                <div className="mt-4 flex w-full">
                                  <InteractiveMetalButton
                                    variant="secondary"
                                    size="sm"
                                    className="w-full"
                                    onClick={(e) => {
                                      e.stopPropagation() // Prevent Card onClick from firing twice
                                      router.push(`/earn/${asset.symbol || asset.name}`)
                                    }}
                                  >
                                    Deposit
                                  </InteractiveMetalButton>
                                </div>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <Divider variant="metal" className="w-full" />

      {/* Features Grid */}
      <div className="grid w-full cursor-default grid-cols-1 gap-4 md:grid-cols-2">
        {features.map((feature) => (
          <Panel key={feature.title} variant="secondary" className="flex items-start gap-4 !p-5">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-accent-gold-border)] bg-[var(--color-accent-gold-muted)]">
              <feature.icon className="h-5 w-5 text-[var(--color-accent-gold)]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                {feature.title}
              </h3>
              <p className="mt-0.5 text-sm leading-relaxed text-[var(--color-text-tertiary)]">
                {feature.description}
              </p>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  )
}
