import { useQuery } from '@tanstack/react-query'

export interface BaseAssetData {
  address: string
  name: string
  type: string
  symbol?: string
  description?: string
  supply?: number
  marketCap?: number
  volume?: number
  apy?: number
  tvl?: number
  price?: number
  change24h?: number
  source?: string
}

export interface RatesResponse {
  success: boolean
  protocol: string
  etherfi: {
    weETH: BaseAssetData
    weETHs: BaseAssetData
    [key: string]: BaseAssetData
  }
  source: string
  timestamp: number
  ethPrice: number
  cached: boolean
  cacheAge: number
}

export function useEtherfiRates() {
  return useQuery<RatesResponse>({
    queryKey: ['etherfiRates'],
    queryFn: async () => {
      const response = await fetch('https://trident-agentic.fly.dev/v1/rates/etherfi')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
  })
}
