import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ether.fi — Premium Yield & Cash',
  description: 'Stake ETH, earn yield, and spend with the Ether.fi Cash Card.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} texture-grain`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
