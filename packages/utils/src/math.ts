import { isEthereumAddressValid, isTezosAddressValid } from "./address"
import { BASE58_CHARSET } from "./constants"
import { isEthereumTransactionHashValid } from "./hash"
import { ResettableRandFunction } from "./types/math"

export function getRandomHash(n: number): string {
  return Array(n)
    .fill(0)
    .map(function (_) {
      return BASE58_CHARSET[(Math.random() * BASE58_CHARSET.length) | 0]
    })
    .join("")
}

function b58dec(str: string): number {
  return [...str].reduce(function (p: number, c: string): number {
    return (p * BASE58_CHARSET.length + BASE58_CHARSET.indexOf(c)) | 0
  }, 0)
}

function sfc32([a, b, c, d]: number[]): () => number {
  return function () {
    a |= 0
    b |= 0
    c |= 0
    d |= 0
    const t = (((a + b) | 0) + d) | 0
    d = (d + 1) | 0
    a = b ^ (b >>> 9)
    b = (c + (c << 3)) | 0
    c = (c << 21) | (c >>> 11)
    c = (c + t) | 0
    return (t >>> 0) / 4294967296
  }
}

function matcher(
  str: string,
  start: number,
  decoder: (s: string) => number = b58dec
): number[] {
  const matches = str
    .slice(start)
    .match(new RegExp(".{" + ((str.length - start) >> 2) + "}", "g"))
  return matches ? matches.map(decoder) : []
}

function getSeedFromHash(hash: string): number[] {
  // Accounting for ethereum and base
  if (isEthereumTransactionHashValid(hash) || isEthereumAddressValid(hash)) {
    return matcher(hash, 2, s => Number(BigInt(`0x${s}`) % BigInt(0xffffffff)))
  } else if (isTezosAddressValid(hash)) {
    return matcher(hash, 3)
  } else {
    return matcher(hash, 2)
  }
}

export function createFxRandom(hash: string): ResettableRandFunction {
  const seed = getSeedFromHash(hash)
  return sfc32(seed)
}

export function getDecimalsNb(x: number, exponent: number): number {
  const mu = Math.floor(Math.abs(x))
  const st = (mu / Math.pow(10, exponent)).toString()
  const split = st.split(".")
  return split.length > 1 ? split.pop()?.length || 0 : 0
}

export function bigIntPow(base: bigint, exponent: number): bigint {
  let out = BigInt(1)
  for (let i = 0; i < exponent; i++) {
    out = out * base
  }
  return out
}

// clamps a value x in the range [min, max]
export const clamp = (x: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, x))
