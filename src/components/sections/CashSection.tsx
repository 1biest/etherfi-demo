'use client'

import { Card, Badge, Button, Panel, Divider } from '@/design-system/components'
import { CreditCard, Zap, Globe, Smartphone, ShieldCheck, Gift, Plane, Percent } from 'lucide-react'
import { CreditCard3D } from '../CreditCard3D'

const metrics = [
  { label: 'Accepted Locations', value: '100M+', icon: Globe },
  { label: 'Max Cashback', value: '5%', icon: Percent, highlight: true },
  { label: 'Mobile Pay', value: 'Supported', icon: Smartphone },
  { label: 'Card Types', value: '3 Tiers', icon: CreditCard },
]

const tiers = [
  {
    name: 'Standard' as const,
    cashback: '1%',
    fee: 'Free',
    perks: ['Visa acceptance worldwide', 'Apple Pay & Google Pay', 'Real-time notifications'],
    highlighted: false,
  },
  {
    name: 'Premium' as const,
    cashback: '3%',
    fee: '$9.99/mo',
    perks: ['Metal card', 'Airport lounge access', 'Concierge service', 'Purchase protection'],
    highlighted: true,
  },
  {
    name: 'Black' as const,
    cashback: '5%',
    fee: 'Invite Only',
    perks: ['All Premium perks', 'Priority support', 'Exclusive events', 'Custom limits'],
    highlighted: false,
  },
]

const features = [
  {
    icon: ShieldCheck,
    title: 'Non-Custodial',
    description: 'You maintain full control. Crypto stays in your wallet until you spend.',
  },
  {
    icon: Zap,
    title: 'Never Sell',
    description: 'Borrow USDC against your eETH/weETH — spend without liquidating holdings.',
  },
  {
    icon: Gift,
    title: 'Earn While You Spend',
    description: 'Deposits in Liquid Vaults continue earning yield while available for spending.',
  },
  {
    icon: Plane,
    title: 'No FX Fees',
    description: 'Zero foreign transaction fees. Spend globally at the real exchange rate.',
  },
]

export function CashSection() {
  return (
    <div className="flex flex-col items-center px-6 py-12 max-w-6xl mx-auto w-full gap-10">
      {/* Header */}
      <div className="text-center max-w-2xl space-y-4">
        <Badge variant="metal" className="gap-2">
          <CreditCard className="h-3 w-3" />
          Visa Card
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] leading-tight">
          Ether.fi <span className="text-[var(--color-accent-gold)]">Cash</span>
        </h1>
        <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
          A DeFi-native, non-custodial Visa card.
          Spend your crypto rewards anywhere in the world — without selling your holdings.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
        {metrics.map((metric) => (
          <Card
            key={metric.label}
            variant={metric.highlight ? 'metal' : 'primary'}
            padding="sm"
            className="text-center"
          >
            <metric.icon className="h-4 w-4 mx-auto text-[var(--color-accent-gold)] mb-1" />
            <span className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">
              {metric.label}
            </span>
            <div className="mt-1">
              <span className={`text-2xl font-bold ${metric.highlight ? 'text-[var(--color-accent-gold)]' : 'text-[var(--color-text-primary)]'}`}>
                {metric.value}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <Divider variant="metal" label="Card Tiers" className="w-full" />

      {/* Tiers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full items-start mt-8">
        {tiers.map((tier) => (
          <div key={tier.name} className="flex flex-col gap-8 w-full group/tier">
            {/* 3D Card Visual */}
            <div className="w-full px-6 pt-12 pb-8 h-[250px] flex items-center justify-center">
              <CreditCard3D tier={tier.name} />
            </div>

            {/* Tier Details Card */}
            <Card
              variant={tier.highlighted ? 'metal' : 'primary'}
              padding="md"
              className="flex flex-col gap-4 h-full w-full"
            >
              <div className="text-center">
                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">{tier.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-[var(--color-accent-gold)]">{tier.cashback}</span>
                  <span className="text-sm text-[var(--color-text-muted)] ml-1">cashback</span>
                </div>
                <div className="text-xs text-[var(--color-text-tertiary)] mt-1">{tier.fee}</div>
              </div>

              <Divider variant="ghost" />

              <ul className="space-y-2 flex-1">
                {tier.perks.map((perk, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                    <span className="h-1 w-1 rounded-full bg-[var(--color-accent-gold)] flex-shrink-0" />
                    {perk}
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.highlighted ? 'metal' : 'secondary'}
                size="sm"
                className="w-full mt-auto"
              >
                {tier.fee === 'Invite Only' ? 'Request Invite' : 'Get Card'}
              </Button>
            </Card>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {features.map((feature) => (
          <Panel key={feature.title} variant="secondary" className="flex gap-4 items-start !p-5">
            <div className="h-10 w-10 rounded-[var(--radius-md)] bg-[var(--color-accent-gold-muted)] border border-[var(--color-accent-gold-border)] flex items-center justify-center flex-shrink-0">
              <feature.icon className="h-5 w-5 text-[var(--color-accent-gold)]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{feature.title}</h3>
              <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5 leading-relaxed">{feature.description}</p>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  )
}
