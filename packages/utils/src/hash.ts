import { BASE58_CHARSET } from "./base58"
import { Blockchain } from "./types/blockchain"

export function mockTezosTransactionHash(): string {
  const randomSequence = Array.from(
    { length: 49 },
    () => BASE58_CHARSET[(Math.random() * BASE58_CHARSET.length) | 0]
  ).join("")
  return `oo${randomSequence}`
}

export function mockEthereumTransactionHash(): string {
  const randomBytes = Array.from(
    { length: 32 },
    () => (Math.random() * 256) | 0
  )
  return `0x${Buffer.from(randomBytes).toString("hex")}`
}

export function mockTransactionHash(chain: Blockchain): string {
  if (chain === "ETHEREUM") return mockEthereumTransactionHash()
  return mockTezosTransactionHash()
}

export function isEthereumTransactionHashValid(hash: string): boolean {
  return /^(0x)?([A-Fa-f0-9]{64})$/.test(hash)
}

export function isTezosTransactionHashValid(hash: string): boolean {
  const substr = hash.substring(0, 2)
  return substr === "tz" || substr === "KT"
}

export function getBlockchainFromTransactionHash(hash: string): Blockchain {
  if (isEthereumTransactionHashValid(hash)) return "ETHEREUM"
  if (isTezosTransactionHashValid(hash)) return "TEZOS"
  throw new Error(
    "The provided value is not a valid tezos or ethereum transaction hash"
  )
}
