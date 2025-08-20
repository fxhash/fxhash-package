import { BigNumber } from "bignumber.js"

const FEE_GROWTH_RATE_DIVISOR = 10000

export const useArtCoinEvolveFee = (
  pricing: {
    mint_fee: string | null
    fee_currency: string | null
    fee_growth_rate: string | null
  },
  depth: number,
  amountMint: number
) => {
  if (!pricing.fee_currency || !pricing.fee_growth_rate)
    throw new Error("Invalid open-form pricing")

  const baseFee = new BigNumber(pricing.mint_fee || 0).multipliedBy(amountMint)
  const growthMultiplier = new BigNumber(pricing.fee_growth_rate)
    .div(FEE_GROWTH_RATE_DIVISOR)
    // depth is 1-indexed onchain
    .multipliedBy(depth + 1)

  const evolveFee = baseFee.multipliedBy(growthMultiplier)
  const totalFee = baseFee.plus(evolveFee)
  return {
    feeCurrency: pricing.fee_currency,
    mintFee: BigInt(baseFee.toString()),
    evolveFee: BigInt(evolveFee.toString()),
    totalFee: BigInt(totalFee.toString()),
  }
}
