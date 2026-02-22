'use client'

import {
  Card,
  Badge,
  Button,
  Panel,
  Divider,
  InteractiveMetalButton,
} from '@/design-system/components'
import { CreditCard, Zap, Globe, Smartphone, ShieldCheck, Gift, Plane, Percent } from 'lucide-react'
import { CreditCard3D } from '../CreditCard3D'
import { cn } from '@/lib/utils'

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
    <div className="mx-auto flex w-full max-w-6xl cursor-default flex-col items-center gap-10 px-6 py-12">
      {/* Header */}
      <div className="max-w-2xl space-y-4 text-center">
        <Badge variant="metal" className="gap-2">
          <CreditCard className="h-3 w-3" />
          Visa Card
        </Badge>
        <h1 className="text-4xl leading-tight font-bold text-[var(--color-text-primary)] md:text-5xl">
          Ether.fi <span className="text-[var(--color-accent-gold)]">Cash</span>
        </h1>
        <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
          A DeFi-native, non-custodial Visa card. Spend your crypto rewards anywhere in the world —
          without selling your holdings.
        </p>
      </div>

      {/* Mobile Pay */}
      <div className="flex w-full items-center justify-center gap-6 text-[var(--color-text-tertiary)]">
        <div className="flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          <span className="text-sm font-medium tracking-wider uppercase">Apple Pay</span>
        </div>
        <div className="h-4 w-px bg-[var(--color-border)]" />
        <div className="flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          <span className="text-sm font-medium tracking-wider uppercase">Google Pay</span>
        </div>
      </div>

      <Divider variant="metal" label="Card Tiers" className="w-full" />

      {/* Tiers */}
      <div className="mt-8 grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="group flex w-full scale-100 cursor-pointer flex-col gap-8 pt-10 transition-all duration-500 ease-out hover:scale-[1.05]"
          >
            {/* 3D Card Visual */}
            <div className="flex h-[250px] w-full items-center justify-center px-6 pt-12 pb-8">
              <CreditCard3D tier={tier.name} />
            </div>

            {/* Tier Details Card */}
            <Card
              variant={tier.highlighted ? 'metal' : 'primary'}
              padding="md"
              className="flex h-full w-full flex-col gap-4"
            >
              <div className="pt-12 text-center">
                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">{tier.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-[var(--color-accent-gold)]">
                    {tier.cashback}
                  </span>
                  <span className="ml-1 text-sm text-[var(--color-text-muted)]">cashback</span>
                </div>
                <div className="mt-1 text-xs text-[var(--color-text-tertiary)]">{tier.fee}</div>
              </div>

              <Divider variant="ghost" />

              <ul className="flex-1 space-y-2">
                {tier.perks.map((perk, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"
                  >
                    <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[var(--color-accent-gold)]" />
                    {perk}
                  </li>
                ))}
              </ul>

              <InteractiveMetalButton variant="secondary" size="sm" className="mt-auto w-full">
                {tier.fee === 'Invite Only' ? 'Request Invite' : 'Get Card'}
              </InteractiveMetalButton>
            </Card>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {features.map((feature) => (
          <Panel key={feature.title} variant="secondary" className="flex items-start gap-4 !p-5">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-accent-gold-border)] bg-[var(--color-accent-gold-muted)]">
              <feature.icon className="h-5 w-5 text-[var(--color-accent-gold)]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                {feature.title}
              </h3>
              <p className="mt-0.5 text-xs leading-relaxed text-[var(--color-text-tertiary)]">
                {feature.description}
              </p>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  )
}
