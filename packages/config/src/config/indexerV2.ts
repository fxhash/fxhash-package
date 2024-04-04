export type IndexerV2Config = {
  debugSigner: boolean
  maintenanceMode: boolean
  openTelemetryTarget: string
  port: number
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
  openTelemetryTarget: "https://tempo.ss.fxhash2.xyz",
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

export const indexerV2ConfigLocal: IndexerV2Config = {
  ...indexerV2ConfigDev,
  tracingEnabled: false,
  openTelemetryTarget: "http://localhost:14268",
}

export const indexerV2ConfigProd: IndexerV2Config = {
  debugSigner: true,
  maintenanceMode: false,
  openTelemetryTarget: "https://tempo.ss.fxhash2.xyz",
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
