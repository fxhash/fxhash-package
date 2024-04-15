export type FileSystemEmulatorConfig = {
  awsBucketName: string
  awsRegion: string
  maxFileSize: number
}

export const fsEmulatorConfigDev: FileSystemEmulatorConfig = {
  awsBucketName: "fxh-dev-fs-emulator-us-east-1",
  awsRegion: "us-east-1",
  maxFileSize: 500,
}

export const fsEmulatorConfigLocal: FileSystemEmulatorConfig = {
  ...fsEmulatorConfigDev,
}

export const fsEmulatorConfigProd: FileSystemEmulatorConfig = {
  ...fsEmulatorConfigDev,
  awsBucketName: "fxh-prd-fs-emulator-us-east-1",
}
