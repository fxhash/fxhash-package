import { PublicClient, getContract } from "viem"
import { FX_TICKETS_ABI } from ".."

export async function getBalance(
  publicClient: PublicClient,
  ticket: `0x${string}`,
  user: `0x${string}`
) {
  const contract = getContract({
    address: ticket,
    abi: FX_TICKETS_ABI,
    publicClient: publicClient,
  })
  const dailyTax = await contract.read.balances([user])
  return dailyTax as bigint
}

export async function getDailyTax(
  publicClient: PublicClient,
  ticket: `0x${string}`,
  price: bigint
) {
  const contract = getContract({
    address: ticket,
    abi: FX_TICKETS_ABI,
    publicClient: publicClient,
  })
  const dailyTax = await contract.read.getDailyTax([price])
  return dailyTax as bigint
}

export async function isForeclosed(
  publicClient: PublicClient,
  ticket: `0x${string}`,
  tokenId: bigint
) {
  const contract = getContract({
    address: ticket,
    abi: FX_TICKETS_ABI,
    publicClient: publicClient,
  })
  const isForeclosed = await contract.read.isForeclosed([tokenId])
  return isForeclosed as boolean
}

export async function getAuctionPrice(
  publicClient: PublicClient,
  ticket: `0x${string}`,
  price: bigint,
  foreclosureTime: bigint
) {
  const contract = getContract({
    address: ticket,
    abi: FX_TICKETS_ABI,
    publicClient: publicClient,
  })
  const auctionPrice = await contract.read.getAuctionPrice([
    price,
    foreclosureTime,
  ])
  return auctionPrice as bigint
}

export async function getTaxInfo(
  publicClient: PublicClient,
  ticket: `0x${string}`,
  tokenId: bigint
) {
  const contract = getContract({
    address: ticket,
    abi: FX_TICKETS_ABI,
    publicClient: publicClient,
  })
  const taxInfo = await contract.read.taxes([tokenId])
  return {
    startTime: taxInfo[0],
    foreclosureTime: taxInfo[1],
    currentPrice: taxInfo[2],
    depositAmount: taxInfo[3],
  }
}

export async function getMinimumClaimValueForNewPrice(
  publicClient: PublicClient,
  ticket: `0x${string}`,
  tokenId: bigint,
  newPrice: bigint
) {
  const taxInfo = await getTaxInfo(publicClient, ticket, tokenId)
  const isTicketForeclosed = await isForeclosed(publicClient, ticket, tokenId)
  const newDailyTax = await getDailyTax(publicClient, ticket, newPrice)
  if (isTicketForeclosed) {
    const auctionPrice = await getAuctionPrice(
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
