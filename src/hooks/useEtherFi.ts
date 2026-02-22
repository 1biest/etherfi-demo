import { useAccount, useReadContract } from 'wagmi'
import { parseEther } from 'viem'

// Placeholder ABI for demonstration
const ETHERFI_ABI = [
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

const ETHERFI_ADDRESS = '0x1234567890123456789012345678901234567890' // Mock Address

export function useEtherFi() {
  const { address } = useAccount()

  // In a real app, this would read from the actual contract
  // const { data: balance } = useReadContract({
  //   address: ETHERFI_ADDRESS,
  //   abi: ETHERFI_ABI,
  //   functionName: 'balanceOf',
  //   args: [address!],
  //   query: {
  //      enabled: !!address
  //   }
  // })

  // returning mock data for the demo to ensure UI looks populated
  return {
    apy: 3.85,
    tvl: '3.2B',
    userBalance: '0.00',
    points: 1250,
    eigenLayerPoints: 450,
  }
}
