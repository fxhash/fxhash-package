import { Blockchain, TEZOS_CHARSET } from "./address"

export function mockTezosTransactionHash(): string {
  const randomSequence = Array.from(
    { length: 33 },
    () => TEZOS_CHARSET[(Math.random() * TEZOS_CHARSET.length) | 0]
  ).join("")
  return `oo${randomSequence}`
}

export function mockEthereumTransactionHash(): string {
  const randomBytes = Array.from({ length: 32 }, () =>
    Math.floor(Math.random() * 256)
  )
  return `0x${Buffer.from(randomBytes).toString("hex")}`
}

export function mockTransactionHash(chain: Blockchain): string {
  if (chain === "ETHEREUM") return mockEthereumTransactionHash()
  return mockTezosTransactionHash()
}

export function isEthereumTransactionHashValid(hash: string): boolean {
  return hash.substring(0, 2) === "0x"
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
