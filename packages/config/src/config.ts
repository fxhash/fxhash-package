import { ethMainnetApis, ethTestnetApis, IEthApis } from "./api/eth"
import { ITezosApis, tezosTestnetApis, tezosMainnetApis } from "./api/tezos"
import {
  IFxhashApis,
  fxhashDevApis,
  fxhashLocalApis,
  fxhashLocalDockerApis,
  fxhashPrdApis,
} from "./api/fxhash"
import {
  ITezosContracts,
  tezosMainnetContracts,
  tezosTestnetContracts,
} from "./contracts/tezos"
import { BlockchainIdentifier, BlockchainIdentifiers } from "./types"
import {
  ethMainnetContracts,
  ethTestnetContracts,
  IEthContracts,
} from "./contracts/eth"
import {
  baseMainnetContracts,
  baseTestnetContracts,
  IBaseContracts,
} from "./contracts/base"
import { baseMainnetApis, baseTestnetApis, IBaseApis } from "./api/base"
import { getConfigForEnv } from "./utils"
import {
  AlgoliaConfig,
  algoliaConfigDev,
  algoliaConfigProd,
} from "./config/algolia"
import {
  IndexerV2Config,
  indexerV2ConfigDev,
  indexerV2ConfigLocal,
  indexerV2ConfigProd,
} from "./config/indexer-v2"
import {
  EthIndexerConfig,
  ethIndexerConfigDev,
  ethIndexerConfigLocal,
  ethIndexerConfigProd,
} from "./config/eth-indexer"
import {
  baseIndexerConfigDev,
  baseIndexerConfigLocal,
  baseIndexerConfigProd,
} from "./config/base-indexer"

// the variations supported by the config
export type TBlockchain = "tez" | "eth" | "base"
export type TBlockchainNetwork = "testnet" | "mainnet"
export type TEnv = "dev" | "prd" | "local" | "localDocker"
export type TEnvName = "development" | "production" | "local" | "localDocker"

export type { IndexerV2Config, EthIndexerConfig }

export interface IFxhashNetworkConfig {
  network: string
  chainId: BlockchainIdentifier
  ethFeeReceiver: `0x${string}`
  wertRelayer: string
}

export interface IFxhashEnvConfig {
  envName: TEnvName
  gtMinPrice: string
  walletConnectId: string
  projectLockTime: number
  referrerShare: number
  cloudflareTurnstileSiteKey: string
  cloudflareTurnstileSiteKeyV2: string
  fxhashPrimaryFee: number
  fxhashSecondaryFee: number
  syndicateProjectId: string
  awsS3Bucket: string
  awsS3Region: string
  openTelemetryTarget: string
  // service specific config
  algolia: AlgoliaConfig
  indexer: {
    tez: IndexerV2Config
    eth: EthIndexerConfig
    base: EthIndexerConfig
  }
}

type TBlockchainContacts = {
  [B in TBlockchain]: {
    tez: ITezosContracts
    eth: IEthContracts
    base: IBaseContracts
  }[B]
}

type TBlockchainApis = {
  [B in TBlockchain]: {
    tez: ITezosApis
    eth: IEthApis | null
    base: IBaseApis | null
  }[B]
}

type TNetworkBlockchainConfig = {
  [B in TBlockchain]: {
    tez: IFxhashNetworkConfig
    eth: IFxhashNetworkConfig
    base: IFxhashNetworkConfig
  }[B]
}

export type IFxhashConfig = {
  networks: {
    [N in TBlockchainNetwork]: {
      [B in TBlockchain]: {
        contracts: TBlockchainContacts[B]
        config: TNetworkBlockchainConfig[B]
        apis: TBlockchainApis[B]
      }
    }
  }
  envs: {
    [K in TEnv]: {
      apis: IFxhashApis
      config: IFxhashEnvConfig
    }
  }
}

export type IFxhashConfigSingleEnv = {
  [B in TBlockchain]: {
    contracts: TBlockchainContacts[B]
    config: TNetworkBlockchainConfig[B]
    apis: TBlockchainApis[B]
  }
} & {
  apis: IFxhashApis
  config: IFxhashEnvConfig
}

export const fxhashConfig: IFxhashConfig = {
  networks: {
    testnet: {
      tez: {
        contracts: tezosTestnetContracts,
        config: {
          network: "ghostnet",
          chainId: BlockchainIdentifiers.TezosGhostnet,
          ethFeeReceiver: "0x",
          wertRelayer: "tz1T2uyYTshSGrEg13VGJFqsWwbi2H175hZb",
        },
        apis: tezosTestnetApis,
      },
      eth: {
        contracts: ethTestnetContracts,
        config: {
          network: "Sepolia",
          chainId: BlockchainIdentifiers.EthereumSepolia,
          ethFeeReceiver: "0xe1f04609f7bC45e23a1BA4CD4a76f476755beBA6",
          wertRelayer: "0x2ff0ec69341f43cc462251bd49bb63681adafcb0",
        },
        apis: ethTestnetApis,
      },
      base: {
        contracts: baseTestnetContracts,
        config: {
          network: "Base Sepolia",
          chainId: BlockchainIdentifiers.BaseSepolia,
          ethFeeReceiver: "0xF70DF285Bc6941b4760BcC041B0cA1cc50E27F8d",
          wertRelayer: "0x2ff0ec69341f43cc462251bd49bb63681adafcb0",
        },
        apis: baseTestnetApis,
      },
    },
    mainnet: {
      tez: {
        contracts: tezosMainnetContracts,
        config: {
          network: "mainnet",
          chainId: BlockchainIdentifiers.TezosMainnet,
          ethFeeReceiver: "0x",
          wertRelayer: "tz1KkPS1TWFyDWfQwrdvmTmsCLUNMegDrrSi",
        },
        apis: tezosMainnetApis,
      },
      eth: {
        contracts: ethMainnetContracts,
        config: {
          network: "Ethereum",
          chainId: BlockchainIdentifiers.EthereumMainnet,
          ethFeeReceiver: "0xed650E40F7bd3812152D4BFA6740662F50e178DF",
          wertRelayer: "0xc16157e00b1bff1522c6f01246b4fb621da048d0",
        },
        apis: ethMainnetApis,
      },
      base: {
        contracts: baseMainnetContracts,
        config: {
          network: "Base",
          chainId: BlockchainIdentifiers.BaseMainnet,
          ethFeeReceiver: "0xF70DF285Bc6941b4760BcC041B0cA1cc50E27F8d",
          wertRelayer: "0xc16157e00b1bff1522c6f01246b4fb621da048d0",
        },
        apis: baseMainnetApis,
      },
    },
  },
  envs: {
    local: {
      apis: fxhashLocalApis,
      config: {
        envName: "local",
        gtMinPrice: "0",
        walletConnectId: "111994543d1b754bab82c368d0e61ae5",
        projectLockTime: 3600,
        referrerShare: 0,
        cloudflareTurnstileSiteKey: "1x00000000000000000000AA",
        cloudflareTurnstileSiteKeyV2: "0x4AAAAAAAW-w_xThcj91jkA",
        /**
         * ! Beware ! Changing any of these 3 values will result in current
         * projects breaking.
         * https://github.com/fxhash/monorepo/issues/701
         */
        fxhashPrimaryFee: 1000,
        fxhashSecondaryFee: 2500,
        syndicateProjectId: "9dd71e90-4605-45f4-94e0-4e533b01081d",
        awsS3Bucket: "fxh-media-assets-dev-testnet-us-east-1",
        awsS3Region: "us-east-1",
        openTelemetryTarget: "http://localhost:14268",
        // service specific config
        algolia: algoliaConfigDev,
        indexer: {
          tez: indexerV2ConfigLocal,
          eth: ethIndexerConfigLocal,
          base: baseIndexerConfigLocal,
        },
      },
    },
    localDocker: {
      apis: fxhashLocalDockerApis,
      config: {
        envName: "localDocker",
        gtMinPrice: "0",
        walletConnectId: "111994543d1b754bab82c368d0e61ae5",
        projectLockTime: 3600,
        referrerShare: 0,
        cloudflareTurnstileSiteKey: "1x00000000000000000000AA",
        cloudflareTurnstileSiteKeyV2: "0x4AAAAAAAW-w_xThcj91jkA",
        /**
         * ! Beware ! Changing any of these 3 values will result in current
         * projects breaking.
         * https://github.com/fxhash/monorepo/issues/701
         */
        fxhashPrimaryFee: 1000,
        fxhashSecondaryFee: 2500,
        syndicateProjectId: "9dd71e90-4605-45f4-94e0-4e533b01081d",
        awsS3Bucket: "fxh-media-assets-dev-testnet-us-east-1",
        awsS3Region: "us-east-1",
        openTelemetryTarget: "http://localhost:14268",
        // service specific config
        algolia: algoliaConfigDev,
        indexer: {
          tez: indexerV2ConfigLocal,
          eth: ethIndexerConfigLocal,
          base: baseIndexerConfigLocal,
        },
      },
    },
    dev: {
      apis: fxhashDevApis,
      config: {
        envName: "development",
        gtMinPrice: "0",
        walletConnectId: "111994543d1b754bab82c368d0e61ae5",
        projectLockTime: 3600,
        referrerShare: 0,
        cloudflareTurnstileSiteKey: "0x4AAAAAAAVOb6invoeYS4EN",
        cloudflareTurnstileSiteKeyV2: "0x4AAAAAAAW-w_xThcj91jkA",
        /**
         * ! Beware ! Changing any of these 3 values will result in current
         * projects breaking.
         * https://github.com/fxhash/monorepo/issues/701
         */
        fxhashPrimaryFee: 1000,
        fxhashSecondaryFee: 2500,
        syndicateProjectId: "9dd71e90-4605-45f4-94e0-4e533b01081d",
        awsS3Bucket: "fxh-media-assets-dev-testnet-us-east-1",
        awsS3Region: "us-east-1",
        openTelemetryTarget: "https://tempo.ss.fxhash2.xyz",
        // service specific config
        algolia: algoliaConfigDev,
        indexer: {
          tez: indexerV2ConfigDev,
          eth: ethIndexerConfigDev,
          base: baseIndexerConfigDev,
        },
      },
    },
    prd: {
      apis: fxhashPrdApis,
      config: {
        envName: "production",
        gtMinPrice: "0",
        walletConnectId: "111994543d1b754bab82c368d0e61ae5",
        projectLockTime: 3600,
        referrerShare: 0,
        cloudflareTurnstileSiteKey: "0x4AAAAAAAVObp1YeuhbqNKB",
        cloudflareTurnstileSiteKeyV2: "0x4AAAAAAAW-yE4Q6Wdz6SNb",
        /**
         * ! Beware ! Changing any of these 3 values will result in current
         * projects breaking.
         * https://github.com/fxhash/monorepo/issues/701
         */
        fxhashPrimaryFee: 1000,
        fxhashSecondaryFee: 2500,
        syndicateProjectId: "9dd71e90-4605-45f4-94e0-4e533b01081d",
        awsS3Bucket: "fxh-media-assets-prd-mainnet-us-east-1",
        awsS3Region: "us-east-1",
        openTelemetryTarget: "https://tempo.ss.fxhash2.xyz",
        // service specific config
        algolia: algoliaConfigProd,
        indexer: {
          tez: indexerV2ConfigProd,
          eth: ethIndexerConfigProd,
          base: baseIndexerConfigProd,
        },
      },
    },
  },
}

export const localConfig = getConfigForEnv("local")
export const localDockerConfig = getConfigForEnv("localDocker")
export const devConfig = getConfigForEnv("dev")
export const prdConfig = getConfigForEnv("prd")
