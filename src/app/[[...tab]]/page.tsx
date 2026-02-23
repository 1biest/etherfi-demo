'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/Sidebar'
import { Carousel } from '@/components/Carousel'
import { EarnSection } from '@/components/sections/EarnSection'
import { VaultsSection } from '@/components/sections/VaultsSection'
import { CashSection } from '@/components/sections/CashSection'

export const sections = [
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
    label: 'Earn',
    content: <EarnSection />,
  },
]

export default function Home({ params }: { params: Promise<{ tab?: string[] }> }) {
  const router = useRouter()
  const resolvedParams = use(params)

  // Initialize index based on URL params
  const initialIndex = (() => {
    if (resolvedParams.tab && resolvedParams.tab.length > 0) {
      const idx = sections.findIndex((s) => s.id === resolvedParams.tab![0].toLowerCase())
      return idx !== -1 ? idx : 0
    }
    return 0
  })()

  const [activeIndex, setActiveIndex] = useState(initialIndex)

  // Sync state to URL without full page reload
  useEffect(() => {
    const currentTabId = sections[activeIndex].id
    // replace instead of push to avoid cluttering history
    router.replace(`/${currentTabId}`, { scroll: false })
  }, [activeIndex, router])

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
      <div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden pb-16 md:pt-0 md:pb-0">
        <Carousel sections={sections} activeIndex={activeIndex} onChange={setActiveIndex} />
      </div>
    </div>
  )
}
