import { isEthereumAddressValid, isTezosAddressValid } from "./address"
import { BASE58_CHARSET } from "./base58"
import {
  isEthereumTransactionHashValid,
  isTezosTransactionHashValid,
} from "./hash"
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

function sfc32(seed: number[]): () => number {
  let a = seed[0] | 0
  let b = seed[1] | 0
  let c = seed[2] | 0
  let d = seed[3] | 0
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
  return str
    .slice(start)
    .match(new RegExp(".{" + ((str.length - start) >> 2) + "}", "g"))
    .map(decoder)
}

function getSeedFromHash(hash: string): number[] {
  if (isEthereumTransactionHashValid(hash) || isEthereumAddressValid(hash)) {
    return matcher(hash, 2, s => parseInt(s, 16) | 0)
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
