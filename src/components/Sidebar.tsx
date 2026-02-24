'use client'

import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { Button, Modal } from '@/design-system/components'
import { Wallet, Menu, X, Copy, Check } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { formatUnits } from 'viem'

interface SidebarProps {
  sections: { id: string; label: string }[]
  activeIndex: number
  setActiveIndex: (index: number) => void
}

export function Sidebar({ sections, activeIndex, setActiveIndex }: SidebarProps) {
  const { isConnected, address } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)
  const { resolvedTheme } = useTheme()

  const { data: balanceData } = useBalance({
    address: address,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const isClientConnected = mounted && isConnected

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatAddress = (addr?: string) => {
    if (!addr) return ''
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const handleConnect = () => {
    if (isConnected) {
      disconnect()
    } else {
      setIsWalletModalOpen(true)
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
            className={`h-8 object-contain drop-shadow-md ${mounted && resolvedTheme === 'dark' ? 'brightness-0 invert' : ''}`}
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
          <div className="flex flex-col gap-4">
            {isClientConnected && address && (
              <div className="flex cursor-default flex-col gap-1 rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                    {formatAddress(address)}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-text-primary)]"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4 cursor-pointer" />
                    )}
                  </button>
                </div>
                {balanceData && (
                  <div className="text-sm text-[var(--color-text-tertiary)]">
                    {parseFloat(formatUnits(balanceData.value, balanceData.decimals)).toFixed(4)}{' '}
                    {balanceData.symbol}
                  </div>
                )}
              </div>
            )}
            <ThemeToggle />
            <Button
              onClick={handleConnect}
              variant="metal"
              className="w-full gap-2 border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] text-[var(--color-surface-ivory)] shadow-[var(--shadow-sm)] hover:border-[var(--color-border-default)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-surface-ivory)]"
            >
              <Wallet className={cn('h-4 w-4', !isClientConnected && 'text-white')} />
              {isClientConnected ? 'Disconnect' : 'Connect Wallet'}
            </Button>
          </div>
        </div>
      )}

      {/* Desktop Left Sidebar */}
      <aside className="glass-soft fixed top-0 bottom-0 left-0 z-50 hidden w-[260px] flex-col border-r border-[var(--color-border-subtle)] bg-[var(--color-surface-primary)] md:flex">
        <div className="flex h-full flex-col p-6">
          {/* Logo Section */}
          <div className="pt- mb-10 flex items-center gap-3 px-4">
            <img
              src="/transparent-light-bg-etherfi_logo-black-landscape-1.svg"
              alt="ether.fi logo"
              className={`h-12 object-contain ${mounted && resolvedTheme === 'dark' ? 'brightness-0 invert' : ''}`}
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
          <div className="mt-auto flex w-full flex-col gap-4">
            {isClientConnected && address && (
              <div className="flex cursor-default flex-col gap-1 rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                    {formatAddress(address)}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-text-primary)]"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4 cursor-pointer" />
                    )}
                  </button>
                </div>
                {balanceData && (
                  <div className="text-sm text-[var(--color-text-tertiary)]">
                    {parseFloat(formatUnits(balanceData.value, balanceData.decimals)).toFixed(4)}{' '}
                    {balanceData.symbol}
                  </div>
                )}
              </div>
            )}
            <ThemeToggle />
            <Button
              onClick={handleConnect}
              variant={isClientConnected ? 'secondary' : 'metal'}
              className="flex w-full items-center justify-center gap-2 p-3 text-[var(--color-surface-ivory)] shadow-[var(--shadow-md)]"
            >
              <Wallet className={cn('h-4 w-4', !isClientConnected && 'text-white')} />
              {isClientConnected ? 'Disconnect' : 'Log In'}
            </Button>
          </div>
        </div>
      </aside>

      {/* Wallet Selection Modal */}
      <Modal
        open={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        title="Connect Wallet"
        variant="primary"
      >
        <div className="mt-4 flex flex-col gap-3">
          {connectors.map((connector) => (
            <Button
              key={connector.id}
              onClick={() => {
                connect({ connector })
                setIsWalletModalOpen(false)
              }}
              variant="secondary"
              className="flex w-full items-center justify-between p-4"
            >
              <span className="font-medium text-[var(--color-text-primary)]">{connector.name}</span>
            </Button>
          ))}
        </div>
      </Modal>
    </>
  )
}
