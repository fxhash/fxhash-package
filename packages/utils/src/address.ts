export const TEZOS_CHARSET =
  "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"

export function mockEthereumAddress(): string {
  const randomBytes = Array.from({ length: 20 }, () =>
    Math.floor(Math.random() * 256)
  )
  return `0x${Buffer.from(randomBytes).toString("hex")}`
}

export function mockTezosAddress() {
  const randomSequence = Array.from(
    { length: 33 },
    () => TEZOS_CHARSET[(Math.random() * TEZOS_CHARSET.length) | 0]
  ).join("")
  return `tz1${randomSequence}`
}

export type Blockchain = "ETHEREUM" | "TEZOS"

export function mockBlockchainAddress(chain: Blockchain) {
  if (chain === "ETHEREUM") return mockEthereumAddress()
  return mockTezosAddress()
}

export function isTezosAddressValid(address: string): boolean {
  if (address.length !== 36) {
    return false
  }
  for (let i = 0; i < address.length; i++) {
    if (!TEZOS_CHARSET.includes(address[i])) return false
  }
  return true
}

export function isEthereumAddressValid(address: string): boolean {
  if (!/^(0x)?[0-9a-fA-F]{40}$/.test(address)) {
    return false
  }
  return true
}

export function getBlockchainFromAddress(address: string): Blockchain {
  if (isEthereumAddressValid(address)) return "ETHEREUM"
  if (isTezosAddressValid(address)) return "TEZOS"
  throw new Error(
    "The provided address is not a valid tezos or ethereum address"
  )
}
