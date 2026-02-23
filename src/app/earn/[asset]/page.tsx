'use client'

import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sidebar } from '@/components/Sidebar'
import { sections } from '@/app/[[...tab]]/page'
import { useEtherfiRates } from '@/hooks/useEtherfiRates'
import { Card, Badge, InteractiveMetalButton, Divider } from '@/design-system/components'
import { ChevronLeft, Loader2, ArrowUpRight } from 'lucide-react'

// Map of asset symbols/names to specific icons from the main page
const ASSET_ICONS: Record<string, string> = {
  ETH: '/eth-token-icon.png',
  wETH: 'https://etherfi.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fa2eb6f5b-6767-43e2-890d-4acb71d6176b%2Fb959e47c-10a1-4ebc-b0af-4980f6938b37%2Feeth.png?id=1deb0952-7c43-81d8-b4d3-ed63077f7b7a&table=block&spaceId=a2eb6f5b-6767-43e2-890d-4acb71d6176b&width=2000&userId=&cache=v2',
  weETH:
    'https://etherfi.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fa2eb6f5b-6767-43e2-890d-4acb71d6176b%2F0536547a-f5e0-461c-8c9d-75e532a90dfa%2Fweeth.png?id=1deb0952-7c43-8192-a668-fd4e42ff1d15&table=block&spaceId=a2eb6f5b-6767-43e2-890d-4acb71d6176b&width=2000&userId=&cache=v2',
  sETHFI:
    'https://etherfi.notion.site/image/attachment%3A746c0e4b-881b-4f99-8539-4fb1abc6adf0%3AETHFI.svg?id=265b0952-7c43-8067-82b1-d6a41a4f31b2&table=block&spaceId=a2eb6f5b-6767-43e2-890d-4acb71d6176b&userId=&cache=v2',
  eBTC: 'https://etherfi.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fa2eb6f5b-6767-43e2-890d-4acb71d6176b%2F9fcff3ce-61e5-441f-8062-1dffefeacfdd%2FeBTC.svg?id=1deb0952-7c43-81aa-b13f-eee3795f4dcf&table=block&spaceId=a2eb6f5b-6767-43e2-890d-4acb71d6176b&userId=&cache=v2',
  eUSD: 'https://etherfi.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fa2eb6f5b-6767-43e2-890d-4acb71d6176b%2F882883d7-c872-441a-8c0b-3e7a7c2b915d%2FeUSD.svg?id=1deb0952-7c43-81b7-a293-f9da26ac6e39&table=block&spaceId=a2eb6f5b-6767-43e2-890d-4acb71d6176b&userId=&cache=v2',
  beHYPE: 'https://cryptologos.cc/logos/hyperliquid-hype-logo.svg',
  frxUSD: 'https://cryptologos.cc/logos/frax-share-fxs-logo.svg',
}

export default function EarnAssetPage({ params }: { params: Promise<{ asset: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  // Ensure the Sidebar always highlights "Earn" on this sub-route
  const [activeIndex, setActiveIndex] = useState(
    sections.findIndex((s) => s.id === 'earn') !== -1
      ? sections.findIndex((s) => s.id === 'earn')
      : 2,
  )
  const [actionTab, setActionTab] = useState<'deposit' | 'swap'>('swap')

  const { data: ratesData, isLoading } = useEtherfiRates()

  // Intercept Sidebar clicks to navigate back to root carousel
  const handleSidebarNav = (index: number) => {
    setActiveIndex(index)
    const targetId = sections[index]?.id || ''
    router.push(`/${targetId}`)
  }

  // Find the exact asset from the hook data
  const targetSymbol = decodeURIComponent(resolvedParams.asset)
  const asset = ratesData?.etherfi
    ? Object.values(ratesData.etherfi).find(
        (a) => a.symbol === targetSymbol || a.name === targetSymbol,
      )
    : null

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[var(--color-surface-primary)] md:flex-row">
      <Sidebar
        sections={sections.map((s) => ({ id: s.id, label: s.label }))}
        activeIndex={activeIndex}
        setActiveIndex={handleSidebarNav}
      />

      <div className="flex h-screen min-w-0 flex-1 flex-col overflow-y-auto pb-16 md:pt-0 md:pb-0">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-start gap-8 px-6 py-12 md:py-16">
          <Link
            href="/earn"
            className="flex cursor-pointer items-center gap-2 text-sm font-medium text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-text-primary)]"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Earn
          </Link>

          {isLoading ? (
            <div className="flex min-h-[40vh] w-full items-center justify-center">
              <Loader2 className="h-10 w-10 animate-spin text-[var(--color-accent-gold)]" />
            </div>
          ) : !asset ? (
            <div className="flex min-h-[40vh] w-full flex-col items-center justify-center gap-4">
              <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
                Asset Not Found
              </h1>
              <p className="text-[var(--color-text-secondary)]">
                The requested restaking strategy could not be located.
              </p>
              <InteractiveMetalButton onClick={() => router.push('/earn')} variant="secondary">
                Return to Directory
              </InteractiveMetalButton>
            </div>
          ) : (
            <div className="flex w-full flex-col gap-10">
              {/* Asset Hero Section */}
              <div className="flex w-full cursor-default flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--color-accent-gold-border)] bg-[var(--color-accent-gold-muted)] p-1 shadow-[0_0_30px_rgba(232,212,139,0.15)]">
                    {ASSET_ICONS[asset.symbol || asset.name] ? (
                      <img
                        src={ASSET_ICONS[asset.symbol || asset.name]}
                        alt={`${asset.name} icon`}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-bold text-[var(--color-accent-gold)]">
                        {(asset.symbol || asset.name).charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <h1 className="text-3xl font-black tracking-tight text-[var(--color-text-primary)] md:text-5xl">
                        {asset.name}
                      </h1>
                      <Badge
                        variant={
                          asset.type === 'native'
                            ? 'primary'
                            : asset.apy && asset.apy > 6
                              ? 'ghost'
                              : 'secondary'
                        }
                        className="h-6"
                      >
                        {asset.type === 'native'
                          ? 'Low Risk'
                          : asset.apy && asset.apy > 6
                            ? 'High Risk'
                            : 'Medium Risk'}
                      </Badge>
                    </div>
                    <p className="max-w-xl text-lg text-[var(--color-text-secondary)]">
                      {asset.description ||
                        `Deposit ${asset.name} to start earning premium native restaking yields.`}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-1 md:items-end">
                  <span className="text-sm font-medium tracking-wider text-[var(--color-text-tertiary)] uppercase">
                    Current APY
                  </span>
                  <div className="text-5xl font-black tracking-tighter text-[var(--color-accent-gold)] drop-shadow-[0_0_20px_rgba(232,212,139,0.4)]">
                    {(asset.apy ?? 0).toFixed(2)}%
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid w-full cursor-default grid-cols-2 gap-4 md:grid-cols-4">
                <Card
                  variant="secondary"
                  padding="sm"
                  className="flex flex-col items-center gap-2 !p-5 text-center"
                >
                  <span className="text-xs font-medium tracking-wider text-[var(--color-text-muted)] uppercase">
                    Total Value Locked
                  </span>
                  <div className="text-xl font-bold text-[var(--color-text-primary)]">
                    {asset.tvl !== undefined && asset.tvl > 0
                      ? asset.tvl >= 1000000
                        ? `$${(asset.tvl / 1000000).toFixed(2)}M`
                        : asset.tvl >= 1000
                          ? `$${(asset.tvl / 1000).toFixed(2)}k`
                          : `$${asset.tvl.toFixed(2)}`
                      : '-'}
                  </div>
                </Card>
                <Card
                  variant="secondary"
                  padding="sm"
                  className="flex flex-col items-center gap-2 !p-5 text-center"
                >
                  <span className="text-xs font-medium tracking-wider text-[var(--color-text-muted)] uppercase">
                    Current Price
                  </span>
                  <div className="text-xl font-bold text-[var(--color-text-primary)]">
                    $
                    {(asset.price ?? 0).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </Card>
                <Card
                  variant="secondary"
                  padding="sm"
                  className="flex flex-col items-center gap-2 !p-5 text-center"
                >
                  <span className="text-xs font-medium tracking-wider text-[var(--color-text-muted)] uppercase">
                    24h Change
                  </span>
                  <div
                    className={`text-xl font-bold ${asset.change24h && asset.change24h >= 0 ? 'text-emerald-500' : 'text-red-500'}`}
                  >
                    {asset.change24h !== undefined
                      ? `${asset.change24h > 0 ? '+' : ''}${asset.change24h.toFixed(2)}%`
                      : '-'}
                  </div>
                </Card>
                <Card
                  variant="secondary"
                  padding="sm"
                  className="flex flex-col items-center gap-2 !p-5 text-center"
                >
                  <span className="text-xs font-medium tracking-wider text-[var(--color-text-muted)] uppercase">
                    Network
                  </span>
                  <div className="flex items-center gap-1.5 text-xl font-bold text-[var(--color-text-primary)]">
                    Ethereum <ArrowUpRight className="h-4 w-4 text-[var(--color-text-tertiary)]" />
                  </div>
                </Card>
              </div>

              {/* Action Area */}
              <div className="mt-6 grid w-full cursor-default grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Action Card */}
                <div className="lg:col-span-7">
                  <Card
                    variant="primary"
                    className="flex h-full flex-col bg-[var(--color-surface-elevated)] p-0"
                  >
                    {/* Tabs Header */}
                    <div className="flex w-full border-b border-[var(--color-border-subtle)]">
                      <button
                        onClick={() => setActionTab('swap')}
                        className={`flex-1 cursor-pointer py-4 text-center font-bold tracking-wide transition-colors ${actionTab === 'swap' ? 'border-b-2 border-[var(--color-accent-gold)] bg-[var(--color-surface-tertiary)] text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]'}`}
                      >
                        Swap
                      </button>
                      <button
                        onClick={() => setActionTab('deposit')}
                        className={`flex-1 cursor-pointer py-4 text-center font-bold tracking-wide transition-colors ${actionTab === 'deposit' ? 'border-b-2 border-[var(--color-accent-gold)] bg-[var(--color-surface-tertiary)] text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]'}`}
                      >
                        Deposit
                      </button>
                    </div>

                    <div className="flex flex-1 flex-col gap-6 p-8">
                      {actionTab === 'deposit' ? (
                        <>
                          <div className="flex cursor-default items-center justify-between rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-overlay)] p-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                                Amount to Deposit
                              </span>
                              <input
                                type="text"
                                placeholder="0.00"
                                className="mt-1 w-full cursor-text bg-transparent text-3xl font-semibold text-[var(--color-text-primary)] outline-none"
                              />
                            </div>
                            <div className="flex items-center gap-2 self-end rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-tertiary)] px-3 py-2">
                              {ASSET_ICONS[asset.symbol || asset.name] ? (
                                <img
                                  src={ASSET_ICONS[asset.symbol || asset.name]}
                                  alt="Token"
                                  className="h-5 w-5 rounded-full"
                                />
                              ) : null}
                              <span className="text-sm font-bold">
                                {asset.symbol || asset.name}
                              </span>
                            </div>
                          </div>

                          <div className="mt-auto flex flex-col gap-3 border-t border-[var(--color-border-subtle)] pt-6">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-[var(--color-text-secondary)]">
                                Est. Annual Return
                              </span>
                              <span className="font-medium text-[var(--color-accent-gold)]">
                                + ${((1000 * (asset.apy ?? 0)) / 100).toFixed(2)}
                              </span>
                            </div>
                            <div className="mb-4 flex items-center justify-between text-sm">
                              <span className="text-[var(--color-text-secondary)]">Gas Fee</span>
                              <span className="font-medium text-[var(--color-text-primary)]">
                                $4.52
                              </span>
                            </div>
                            <div className="group w-full">
                              <InteractiveMetalButton
                                variant="secondary"
                                className="w-full cursor-pointer py-4 text-base font-bold shadow-[var(--shadow-lg)]"
                              >
                                Confirm Deposit
                              </InteractiveMetalButton>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex cursor-default items-center justify-between rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-overlay)] p-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                                Swap From
                              </span>
                              <input
                                type="text"
                                placeholder="0.00"
                                className="mt-1 w-full cursor-text bg-transparent text-3xl font-semibold text-[var(--color-text-primary)] outline-none"
                              />
                            </div>
                            <div className="flex items-center gap-2 self-end rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-tertiary)] px-3 py-2">
                              {ASSET_ICONS.ETH ? (
                                <img
                                  src={ASSET_ICONS.ETH}
                                  alt="Token"
                                  className="h-5 w-5 rounded-full"
                                />
                              ) : null}
                              <span className="text-sm font-bold">ETH</span>
                            </div>
                          </div>

                          <div className="relative z-10 -my-3 flex w-full justify-center">
                            <div className="cursor-pointer rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-surface-tertiary)] p-2 transition-colors hover:bg-[var(--color-surface-hover)]">
                              <ArrowUpRight className="h-4 w-4 rotate-90 text-[var(--color-text-primary)]" />
                            </div>
                          </div>

                          <div className="flex cursor-default items-center justify-between rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-overlay)] p-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                                Swap To (Est.)
                              </span>
                              <input
                                type="text"
                                readOnly
                                placeholder="0.00"
                                className="mt-1 w-full cursor-text bg-transparent text-3xl font-semibold text-[var(--color-text-muted)] outline-none"
                              />
                            </div>
                            <div className="flex items-center gap-2 self-end rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-tertiary)] px-3 py-2">
                              {ASSET_ICONS[asset.symbol || asset.name] ? (
                                <img
                                  src={ASSET_ICONS[asset.symbol || asset.name]}
                                  alt="Token"
                                  className="h-5 w-5 rounded-full"
                                />
                              ) : null}
                              <span className="text-sm font-bold">
                                {asset.symbol || asset.name}
                              </span>
                            </div>
                          </div>

                          <div className="mt-auto flex flex-col gap-3 border-t border-[var(--color-border-subtle)] pt-6">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-[var(--color-text-secondary)]">
                                Exchange Rate
                              </span>
                              <span className="font-medium text-[var(--color-text-primary)]">
                                1 ETH = 0.98 {asset.symbol || asset.name}
                              </span>
                            </div>
                            <div className="mb-4 flex items-center justify-between text-sm">
                              <span className="text-[var(--color-text-secondary)]">
                                Network Fee
                              </span>
                              <span className="font-medium text-[var(--color-text-primary)]">
                                ~$3.10
                              </span>
                            </div>
                            <div className="group w-full">
                              <InteractiveMetalButton
                                variant="secondary"
                                className="w-full cursor-pointer py-4 text-base font-bold shadow-[var(--shadow-lg)]"
                              >
                                Swap Assets
                              </InteractiveMetalButton>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </Card>
                </div>

                {/* About / Rules */}
                <div className="flex cursor-default flex-col gap-4 lg:col-span-5">
                  <Card variant="secondary" className="flex h-full flex-col !p-6">
                    <h3 className="mb-4 text-lg font-bold text-[var(--color-text-primary)]">
                      Strategy Details
                    </h3>
                    <ul className="space-y-4 text-sm text-[var(--color-text-secondary)]">
                      <li className="flex items-start gap-3">
                        <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-accent-gold)]" />
                        <p>
                          Provides liquid restaking yields natively sourced from EigenLayer and
                          Symbiotic networks.
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-accent-gold)]" />
                        <p>
                          Instantly liquid: You can withdraw or swap your assets at any time without
                          a mandatory cool-down period.
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                        <p>
                          Smart Contract Risk is extensively audited by top-tier firms including
                          Zellic and Halborn.
                        </p>
                      </li>
                    </ul>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
