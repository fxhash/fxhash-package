export type EthIndexerConfig = {
  chain: "sepolia" | "eth-mainnet" | "base-sepolia" | "base-mainnet"
  debugSigner: boolean
  revealingBatchNumber: number
  revealingEnabled: boolean
  revealingMaxAttempts: number
  revealingMetadataQueue: number
  signingBatchNumber: number
  signingEnabled: boolean
  signingMetadataQueue: number
  signingMaxAttempts: number
  startBlock: number
  subsquidSchema: string
  wipeDbOnStartup: boolean
}

export const ethIndexerConfigDev: EthIndexerConfig = {
  chain: "eth-sepolia",
  debugSigner: true,
  revealingBatchNumber: 2,
  revealingEnabled: true,
  revealingMaxAttempts: 8,
  revealingMetadataQueue: 4,
  signingBatchNumber: 2,
  signingEnabled: true,
  signingMaxAttempts: 8,
  signingMetadataQueue: 4,
  startBlock: 5013011,
  subsquidSchema: "squid_processor",
  wipeDbOnStartup: false,
}

export const ethIndexerConfigLocal: EthIndexerConfig = {
  ...ethIndexerConfigDev,
  signingEnabled: false,
}

export const ethIndexerConfigProd: EthIndexerConfig = {
  ...ethIndexerConfigDev,
  chain: "eth-mainnet",
  revealingBatchNumber: 1,
  revealingMaxAttempts: 3,
  revealingMetadataQueue: 20,
  signingBatchNumber: 20,
  signingMaxAttempts: 8,
  signingMetadataQueue: 40,
  startBlock: 18762350,
}
