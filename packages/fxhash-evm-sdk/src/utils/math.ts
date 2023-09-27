import { config } from "@fxhash/config"

// clamps a value x in the range [min, max]
export const clamp = (x: number, min: number, max: number) =>
  Math.max(min, Math.min(max, x))

export const lerp = (a: number, b: number, t: number) => (b - a) * t + a

export function getMutezDecimalsNb(x: number): number {
  const mu = Math.floor(Math.abs(x))
  const st = (mu / 1000000).toString()
  const split = st.split(".")
  return split.length > 1 ? split.pop()?.length || 0 : 0
}

export function floorToDecimalNb(nb: number, decimals: number): number {
  const coeff = Math.pow(10, decimals)
  return Math.floor(nb * coeff) / coeff
}

export function getDecimalsNumber(x: number): number {
  return x.toString().split(".").pop()?.length || 0
}

export function isPositive(value: number | undefined): boolean {
  return typeof value !== "undefined"
    ? value >= parseFloat(config.GT_MIN_PRICE!)
    : true
}

export function getNumberWithOrdinal(n: number) {
  const s = ["th", "st", "nd", "rd"],
    v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

const getDailyHarbergerTax = (price: number) => {
  return price * 0.0014
}
export function getMintTicketHarbergerTax(price: number, days: number) {
  return getDailyHarbergerTax(price) * days
}
export function getDaysCoveredByHarbergerTax(
  totalTaxPaid: number,
  price: number
) {
  return totalTaxPaid / getDailyHarbergerTax(price)
}
export const getTaxPaidUntil = (
  taxationLocked: number,
  taxationStart: Date,
  price: number
) => {
  const numberOfDaysCovered = getDaysCoveredByHarbergerTax(
    taxationLocked,
    price
  )
  return new Date(
    taxationStart.getTime() + numberOfDaysCovered * 24 * 60 * 60 * 1000
  )
}
