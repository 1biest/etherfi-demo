'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from '@/design-system/components'
import { Wallet, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
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

  return (
    <header className="glass-soft fixed top-0 right-0 left-0 z-50 border-b border-[var(--color-border-subtle)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="relative h-8 w-8 overflow-hidden rounded-full">
            <div className="metal-accent absolute inset-0 rounded-full" />
            <div className="absolute inset-[3px] rounded-full bg-[var(--color-surface-elevated)]" />
            <div className="metal-accent absolute inset-[5px] rounded-full opacity-60" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-[var(--color-text-primary)]">
            ether.fi
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            onClick={handleConnect}
            variant="secondary"
            size="sm"
            className="hidden gap-2 md:inline-flex"
          >
            <Wallet className="h-4 w-4 text-[var(--color-accent-gold)]" />
            {isConnected ? 'Disconnect' : 'Connect Wallet'}
          </Button>

          <button
            className="p-1 text-[var(--color-text-secondary)] md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface-overlay)] p-4 backdrop-blur-lg md:hidden">
          <Button onClick={handleConnect} variant="metal" size="sm" className="w-full gap-2">
            <Wallet className="h-4 w-4" />
            {isConnected ? 'Disconnect' : 'Connect Wallet'}
          </Button>
        </div>
      )}
    </header>
  )
}
