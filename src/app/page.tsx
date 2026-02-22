'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Carousel } from '@/components/Carousel'
import { EthRestakingSection } from '@/components/sections/EthRestakingSection'
import { VaultsSection } from '@/components/sections/VaultsSection'
import { CashSection } from '@/components/sections/CashSection'

const sections = [
  {
    id: 'cash',
    label: 'Cash',
    content: <CashSection />,
  },
  {
    id: 'vaults',
    label: 'Vaults',
    content: <VaultsSection />,
  },
  {
    id: 'restaking',
    label: 'Restaking',
    content: <EthRestakingSection />,
  },
]

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[var(--color-surface-primary)] md:flex-row">
      <Sidebar
        sections={sections.map((s) => ({ id: s.id, label: s.label }))}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />

      {/* 
        On mobile, the header is 64px (16rem/h-16), so add pt-16.
        On desktop, Sidebar is fixed with w-[260px], so add md:pl-[260px] md:pt-0. 
      */}
      <div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden md:pt-0">
        <Carousel sections={sections} activeIndex={activeIndex} onChange={setActiveIndex} />
      </div>
    </div>
  )
}
