export type FileApiConfig = {
  gentkMetadataVersion: string
  maxFileSize: number
  tracingEnabled: boolean
}

export const fileApiConfigDev: FileApiConfig = {
  gentkMetadataVersion: "0.2",
  maxFileSize: 500,
  tracingEnabled: true,
}

export const fileApiConfigLocal: FileApiConfig = {
  ...fileApiConfigDev,
  tracingEnabled: false,
}

export const fileApiConfigProd: FileApiConfig = {
  ...fileApiConfigDev,
}
