'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from '@/design-system/components'
import { Wallet, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  sections: { id: string; label: string }[]
  activeIndex: number
  setActiveIndex: (index: number) => void
}

export function Sidebar({ sections, activeIndex, setActiveIndex }: SidebarProps) {
  const { isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleConnect = () => {
    if (isConnected) {
      disconnect()
    } else {
      const injectedConnector = connectors.find((c) => c.id === 'injected')
      if (injectedConnector) {
        connect({ connector: injectedConnector })
      }
    }
  }

  const handleNavClick = (i: number) => {
    setActiveIndex(i)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Mobile Top Header */}
      <header className="glass-soft fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between border-b border-[var(--color-border-subtle)] px-4 sm:px-6 md:hidden">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <img
            src="/transparent-light-bg-etherfi_logo-black-landscape-1.svg"
            alt="ether.fi logo"
            className="h-8 object-contain drop-shadow-md"
          />
        </div>
        <button
          className="p-1 text-[var(--color-text-secondary)]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed top-16 right-0 left-0 z-40 border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-overlay)] p-4 backdrop-blur-lg md:hidden">
          <nav className="mb-4 flex flex-col gap-2">
            {sections.map((section, i) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(i)}
                className={cn(
                  'rounded-[var(--radius-md)] px-4 py-3 text-left text-base font-medium transition-all duration-[var(--duration-fast)]',
                  i === activeIndex
                    ? 'border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] shadow-[var(--shadow-sm)]'
                    : 'text-[var(--color-text-tertiary)] hover:bg-[var(--color-accent-gold-muted)] hover:text-[var(--color-text-secondary)]',
                )}
              >
                {section.label}
              </button>
            ))}
          </nav>
          <Button
            onClick={handleConnect}
            variant="metal"
            className="w-full gap-2 border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] shadow-[var(--shadow-sm)] hover:border-[var(--color-border-default)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text-primary)]"
          >
            <Wallet className="h-4 w-4" />
            {isConnected ? 'Disconnect' : 'Connect Wallet'}
          </Button>
        </div>
      )}

      {/* Desktop Left Sidebar */}
      <aside className="glass-soft fixed top-0 bottom-0 left-0 z-50 hidden w-[260px] flex-col border-r border-[var(--color-border-subtle)] bg-[var(--color-surface-primary)] md:flex">
        <div className="flex h-full flex-col p-6">
          {/* Logo Section */}
          <div className="mb-10 flex items-center gap-3">
            <img
              src="/transparent-light-bg-etherfi_logo-black-landscape-1.svg"
              alt="ether.fi logo"
              className="h-12 object-contain"
            />
          </div>

          {/* Navigation Section */}
          <nav className="flex-1 space-y-2">
            {sections.map((section, i) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(i)}
                className={cn(
                  'group flex w-full cursor-pointer items-center gap-3 rounded-[var(--radius-lg)] px-5 py-3 text-left font-medium transition-all duration-[var(--duration-fast)]',
                  i === activeIndex
                    ? 'border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] text-[var(--color-accent-gold)] shadow-[var(--shadow-sm)]'
                    : 'border border-transparent text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-secondary)]',
                )}
              >
                <div
                  className={cn(
                    'h-2 w-2 rounded-full transition-all duration-[var(--duration-fast)]',
                    i === activeIndex
                      ? 'scale-110 bg-[var(--color-accent-gold)] shadow-[0_0_8px_var(--color-accent-gold)]'
                      : 'border border-[var(--color-text-muted)] bg-transparent group-hover:border-[var(--color-text-secondary)]',
                  )}
                />
                {section.label}
              </button>
            ))}
          </nav>

          {/* Actions Section */}
          <div className="mt-auto md:w-full">
            <Button
              onClick={handleConnect}
              variant={isConnected ? 'secondary' : 'metal'}
              className="flex w-full items-center justify-center gap-2 p-3 shadow-[var(--shadow-md)]"
            >
              <Wallet
                className={cn('h-4 w-4', !isConnected && 'text-[var(--color-accent-gold)]')}
              />
              {isConnected ? 'Disconnect' : 'Log In'}
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
