export type IndexerV2Config = {
  debugSigner: boolean
  maintenanceMode: boolean
  reportNumberFlag: number
  signingBatchNumber: number
  signingEnabled: boolean
  signingMetadataQueue: number
  signingMaxAttempts: number
  tracingEnabled: boolean
  tzktRequestsInterval: number
  wipeDbOnStartup: boolean
}

export const indexerV2ConfigDev: IndexerV2Config = {
  debugSigner: true,
  maintenanceMode: false,
  reportNumberFlag: 3,
  signingBatchNumber: 2,
  signingEnabled: true,
  signingMetadataQueue: 4,
  signingMaxAttempts: 8,
  tracingEnabled: false,
  tzktRequestsInterval: 2000,
  wipeDbOnStartup: false,
}

export const indexerV2ConfigLocal: IndexerV2Config = {
  ...indexerV2ConfigDev,
  tracingEnabled: false,
}

export const indexerV2ConfigProd: IndexerV2Config = {
  debugSigner: true,
  maintenanceMode: false,
  reportNumberFlag: 3,
  signingBatchNumber: 2,
  signingEnabled: false,
  signingMetadataQueue: 4,
  signingMaxAttempts: 8,
  tracingEnabled: true,
  tzktRequestsInterval: 2000,
  wipeDbOnStartup: false,
}
