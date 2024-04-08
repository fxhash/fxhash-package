export type EthIndexerConfig = {
  awsS3Bucket: string
  awsS3Region: string
  chain: "sepolia" | "eth-mainnet"
  debugSigner: boolean
  moderationEnabled: boolean
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
  awsS3Bucket: "fxh-media-assets-dev-testnet-us-east-1",
  awsS3Region: "us-east-1",
  chain: "sepolia",
  debugSigner: true,
  moderationEnabled: false,
  revealingBatchNumber: 2,
  revealingEnabled: false,
  revealingMaxAttempts: 8,
  revealingMetadataQueue: 4,
  signingBatchNumber: 2,
  signingEnabled: false,
  signingMaxAttempts: 8,
  signingMetadataQueue: 4,
  startBlock: 5013011,
  subsquidSchema: "squid_processor",
  wipeDbOnStartup: false,
}

export const ethIndexerConfigLocal: EthIndexerConfig = {
  ...ethIndexerConfigDev,
  // override some values
}

export const ethIndexerConfigProd: EthIndexerConfig = {
  awsS3Bucket: "fxh-media-assets-prd-mainnet-us-east-1",
  awsS3Region: "us-east-1",
  chain: "eth-mainnet",
  debugSigner: true,
  moderationEnabled: false,
  revealingBatchNumber: 1,
  revealingEnabled: true,
  revealingMaxAttempts: 3,
  revealingMetadataQueue: 20,
  signingBatchNumber: 20,
  signingEnabled: true,
  signingMaxAttempts: 8,
  signingMetadataQueue: 40,
  startBlock: 18762350,
  subsquidSchema: "squid_processor",
  wipeDbOnStartup: false,
}
