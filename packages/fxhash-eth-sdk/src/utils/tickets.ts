import { PublicClient, WalletClient, getContract } from "viem"
import { EthereumWalletManager, FX_TICKETS_ABI } from ".."

export async function getDailyTax(
  walletClient: WalletClient,
  publicClient: PublicClient,
  ticket: `0x${string}`,
  price: bigint
) {
  const contract = getContract({
    address: ticket,
    abi: FX_TICKETS_ABI,
    walletClient: walletClient,
    publicClient: publicClient,
  })
  const dailyTax = await contract.read.getDailyTax([price])
  return dailyTax as bigint
}

export async function isForeclosed(
  walletClient: WalletClient,
  publicClient: PublicClient,
  ticket: `0x${string}`,
  tokenId: bigint
) {
  const contract = getContract({
    address: ticket,
    abi: FX_TICKETS_ABI,
    walletClient: walletClient,
    publicClient: publicClient,
  })
  const isForeclosed = await contract.read.isForeclosed([tokenId])
  return isForeclosed as boolean
}

export async function getAuctionPrice(
  walletClient: WalletClient,
  publicClient: PublicClient,
  ticket: `0x${string}`,
  price: bigint,
  foreclosureTime: bigint
) {
  const contract = getContract({
    address: ticket,
    abi: FX_TICKETS_ABI,
    walletClient: walletClient,
    publicClient: publicClient,
  })
  const auctionPrice = await contract.read.getAuctionPrice([
    price,
    foreclosureTime,
  ])
  return auctionPrice as bigint
}

export async function getTaxInfo(
  walletClient: WalletClient,
  publicClient: PublicClient,
  ticket: `0x${string}`,
  tokenId: bigint
) {
  const contract = getContract({
    address: ticket,
    abi: FX_TICKETS_ABI,
    walletClient: walletClient,
    publicClient: publicClient,
  })
  const taxInfo = await contract.read.taxes([tokenId])
  return {
    gracePeriod: taxInfo[0],
    foreclosureTime: taxInfo[1],
    currentPrice: taxInfo[2],
    depositAmount: taxInfo[3],
  }
}

export async function getMinimumClaimValueForNewPrice(
  walletClient: WalletClient,
  publicClient: PublicClient,
  ticket: `0x${string}`,
  tokenId: bigint,
  newPrice: bigint
) {
  const taxInfo = await getTaxInfo(walletClient, publicClient, ticket, tokenId)
  const isTicketForeclosed = await isForeclosed(
    walletClient,
    publicClient,
    ticket,
    tokenId
  )
  const newDailyTax = await getDailyTax(
    walletClient,
    publicClient,
    ticket,
    newPrice
  )
  if (isTicketForeclosed) {
    const auctionPrice = await getAuctionPrice(
      walletClient,
      publicClient,
      ticket,
      newPrice,
      taxInfo.foreclosureTime
    )
    return auctionPrice + newDailyTax
  } else {
    return taxInfo.currentPrice + newDailyTax
  }
}
