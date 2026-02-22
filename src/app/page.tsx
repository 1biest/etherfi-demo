'use client'

import { Header } from '@/components/Header'
import { Carousel } from '@/components/Carousel'
import { EthRestakingSection } from '@/components/sections/EthRestakingSection'
import { VaultsSection } from '@/components/sections/VaultsSection'
import { CashSection } from '@/components/sections/CashSection'

const sections = [
  {
    id: 'eth-restaking',
    label: 'ETH Restaking',
    content: <EthRestakingSection />,
  },
  {
    id: 'vaults',
    label: 'Vaults',
    content: <VaultsSection />,
  },
  {
    id: 'cash',
    label: 'Cash',
    content: <CashSection />,
  },
]

export default function Home() {
  return (
    <div className="flex h-screen flex-col bg-[var(--color-surface-primary)]">
      <Header />
      <div className="min-h-0 flex-1 pt-16">
        <Carousel sections={sections} />
      </div>
    </div>
  )
}
