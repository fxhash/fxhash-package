import {
  EthIndexerConfig,
  ethIndexerConfigDev,
  ethIndexerConfigProd,
} from "./eth-indexer"

export const baseIndexerConfigDev: EthIndexerConfig = {
  ...ethIndexerConfigDev,
  chain: "base-sepolia",
  startBlock: 5514000,
  subsquidSchema: "squid_processor_base",
}

export const baseIndexerConfigLocal: EthIndexerConfig = {
  ...baseIndexerConfigDev,
  revealingEnabled: false,
  signingEnabled: false,
}

export const baseIndexerConfigProd: EthIndexerConfig = {
  ...ethIndexerConfigProd,
  chain: "base-mainnet",
  startBlock: 10786140,
  subsquidSchema: "squid_processor_base",
}
