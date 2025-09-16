import { FX_TICKETS_ABI } from "@/abi/FxTicket.js"
import { getContract } from "viem"
import { EthereumWalletManager } from ".."
import type { BlockchainType } from "@fxhash/shared"

export async function getBalance(
  walletManager: EthereumWalletManager,
  ticket: `0x${string}`,
  user: `0x${string}`,
  chain: BlockchainType
) {
  await walletManager.prepareSigner({ blockchainType: chain })
  const contract = getContract({
    address: ticket,
    abi: FX_TICKETS_ABI,
    client: walletManager.publicClient,
  })
  const dailyTax = await contract.read.balances([user])
  return dailyTax as bigint
}

export async function getDailyTax(
  walletManager: EthereumWalletManager,
  ticket: `0x${string}`,
  price: bigint,
  chain: BlockchainType
) {
  await walletManager.prepareSigner({ blockchainType: chain })
  const contract = getContract({
    address: ticket,
    abi: FX_TICKETS_ABI,
    client: walletManager.publicClient,
  })
  const dailyTax = await contract.read.getDailyTax([price])
  return dailyTax as bigint
}

export async function isForeclosed(
  walletManager: EthereumWalletManager,
  ticket: `0x${string}`,
  tokenId: bigint,
  chain: BlockchainType
) {
  await walletManager.prepareSigner({ blockchainType: chain })
  const contract = getContract({
    address: ticket,
    abi: FX_TICKETS_ABI,
    client: walletManager.publicClient,
  })
  const isForeclosed = await contract.read.isForeclosed([tokenId])
  return isForeclosed as boolean
}

export async function getAuctionPrice(
  walletManager: EthereumWalletManager,
  ticket: `0x${string}`,
  price: bigint,
  foreclosureTime: bigint,
  chain: BlockchainType
) {
  await walletManager.prepareSigner({ blockchainType: chain })
  const contract = getContract({
    address: ticket,
    abi: FX_TICKETS_ABI,
    client: walletManager.publicClient,
  })
  const auctionPrice = await contract.read.getAuctionPrice([
    price,
    foreclosureTime,
  ])
  return auctionPrice as bigint
}

export async function getTaxInfo(
  walletManager: EthereumWalletManager,
  ticket: `0x${string}`,
  tokenId: bigint,
  chain: BlockchainType
) {
  await walletManager.prepareSigner({ blockchainType: chain })
  const contract = getContract({
    address: ticket,
    abi: FX_TICKETS_ABI,
    client: walletManager.publicClient,
  })
  const taxInfo = (await contract.read.taxes([tokenId])) as unknown as bigint[]
  return {
    startTime: taxInfo[0],
    foreclosureTime: taxInfo[1],
    currentPrice: taxInfo[2],
    depositAmount: taxInfo[3],
  }
}

export async function getMinimumClaimValueForNewPrice(
  walletManager: EthereumWalletManager,
  ticket: `0x${string}`,
  tokenId: bigint,
  newPrice: bigint,
  chain: BlockchainType
) {
  await walletManager.prepareSigner({ blockchainType: chain })

  const taxInfo = await getTaxInfo(walletManager, ticket, tokenId, chain)
  const isTicketForeclosed = await isForeclosed(
    walletManager,
    ticket,
    tokenId,
    chain
  )
  const newDailyTax = await getDailyTax(walletManager, ticket, newPrice, chain)
  if (isTicketForeclosed) {
    const auctionPrice = await getAuctionPrice(
      walletManager,
      ticket,
      newPrice,
      taxInfo.foreclosureTime,
      chain
    )
    return auctionPrice + newDailyTax
  }
  return taxInfo.currentPrice + newDailyTax
}
