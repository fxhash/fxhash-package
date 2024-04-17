export type FileSystemEmulatorConfig = {
  maxFileSize: number
}

export const fsEmulatorConfigDev: FileSystemEmulatorConfig = {
  maxFileSize: 500,
}

export const fsEmulatorConfigLocal: FileSystemEmulatorConfig = {
  ...fsEmulatorConfigDev,
}

export const fsEmulatorConfigProd: FileSystemEmulatorConfig = {
  ...fsEmulatorConfigDev,
}
