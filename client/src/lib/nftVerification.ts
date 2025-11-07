import { createPublicClient, http } from 'viem'
import { base } from 'viem/chains'

const client = createPublicClient({
  chain: base,
  transport: http()
})

// ERC721 ABI for balanceOf function
const erc721Abi = [
  {
    inputs: [{ name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

export async function verifyNFTOwnership(walletAddress: `0x${string}`, contractAddress?: `0x${string}`): Promise<boolean> {
  try {
    // If no specific contract, check if user has any NFTs by checking a known NFT contract
    // For demo purposes, using a placeholder contract address
    const nftContract = contractAddress || '0x1234567890123456789012345678901234567890' as `0x${string}`

    const balance = await client.readContract({
      address: nftContract,
      abi: erc721Abi,
      functionName: 'balanceOf',
      args: [walletAddress],
    })

    return balance > 0
  } catch (error) {
    console.error('NFT verification failed:', error)
    return false
  }
}