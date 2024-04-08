export type EthIndexerConfig = {
  awsS3Bucket: string
  awsS3Region: string
  debugSigner: boolean
  moderationEnabled: boolean
  port: number
  revealingBatchNumber: number
  revealingEnabled: boolean
  revealingMaxAttempts: number
  revealingMetadataQueue: number
  signingBatchNumber: number
  signingEnabled: boolean
  signingMetadataQueue: number
  signingMaxAttempts: number
  subsquidSchema: string
  wipeDbOnStartup: boolean
}

export const ethIndexerConfigDev: EthIndexerConfig = {
  awsS3Bucket: "fxh-media-assets-dev-testnet-us-east-1",
  awsS3Region: "us-east-1",
  debugSigner: true,
  moderationEnabled: false,
  port: 4001,
  revealingBatchNumber: 2,
  revealingEnabled: false,
  revealingMaxAttempts: 8,
  revealingMetadataQueue: 4,
  signingBatchNumber: 2,
  signingEnabled: false,
  signingMaxAttempts: 8,
  signingMetadataQueue: 4,
  subsquidSchema: "squid_processor",
  wipeDbOnStartup: false,
}

export const ethIndexerConfigLocal: EthIndexerConfig = {
  ...ethIndexerConfigDev,
  // override some values
}

export const ethIndexerConfigProd: EthIndexerConfig = {
  debugSigner: true,
  port: 4001,
  reportNumberFlag: 3,
  signingBatchNumber: 2,
  signingEnabled: false,
  signingMetadataQueue: 4,
  signingMaxAttempts: 8,
  tracingEnabled: true,
  tzktRequestsInterval: 2000,
  wipeDbOnStartup: false,
}
