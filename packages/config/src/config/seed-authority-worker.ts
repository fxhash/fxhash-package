export type SeedAuthorityWorkerConfig = {
  hashChainSize: number
}

export const seedAuthorityWorkerConfigDev: SeedAuthorityWorkerConfig = {
  hashChainSize: 32,
}

export const seedAuthorityWorkerConfigLocal: SeedAuthorityWorkerConfig = {
  ...seedAuthorityWorkerConfigDev,
}

export const seedAuthorityWorkerConfigProd: SeedAuthorityWorkerConfig = {
  ...seedAuthorityWorkerConfigDev,
  hashChainSize: 2048,
}
