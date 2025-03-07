import { baseMainnetApis, baseTestnetApis } from "./api/base.js"
import { ethMainnetApis, ethTestnetApis } from "./api/eth.js"
import { tezosMainnetApis, tezosTestnetApis } from "./api/tezos.js"
import {
  fxhashDevApis,
  fxhashLocalApis,
  fxhashLocalDockerApis,
  fxhashPrdApis,
} from "./api/fxhash.js"
import { fxAppEnvMetadata } from "./config/metadata.js"
import { algoliaConfigDev, algoliaConfigProd } from "./config/algolia.js"
import { gpuRenderingConfigDev, gpuRenderingConfigProd } from "./config/gpu.js"
import {
  tezosMainnetContracts,
  tezosTestnetContracts,
} from "./contracts/tezos.js"
import { ethMainnetContracts, ethTestnetContracts } from "./contracts/eth.js"
import { baseMainnetContracts, baseTestnetContracts } from "./contracts/base.js"
import { getEnv } from "./helpers.js"
import {
  BlockchainIdentifiers,
  IFxhashConfig,
  IFxhashConfigSingleEnv,
  TBlockchainNetwork,
  TEnv,
} from "./types.js"
import { AUTH_JWT_PK_DEV, AUTH_JWT_PK_PRD } from "./constants.js"
// Import other necessary types and configurations

/**
 * ! Beware ! Changing these values will result in current
 * projects breaking.
 * https://github.com/fxhash/monorepo/issues/701
 */
const tezosFees = {
  primary: 500,
  secondary: 250,
}

const ethFees = {
  primary: 1000,
  secondary: 2500,
}

const baseFees = {
  primary: 1000,
  secondary: 2500,
}
/**
 * --------------------------------------------------------
 */

const fxhashConfig: IFxhashConfig = {
  networks: {
    testnet: {
      tez: {
        contracts: tezosTestnetContracts,
        config: {
          network: "ghostnet",
          chainId: BlockchainIdentifiers.TezosGhostnet,
          ethFeeReceiver: "0x",
          wertRelayer: "tz1T2uyYTshSGrEg13VGJFqsWwbi2H175hZb",
          fxhashFees: tezosFees,
          royaltyBasisPoint: 1000,
          splitBasisPoint: 1000,
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
          fxhashFees: ethFees,
          royaltyBasisPoint: 10_000,
          splitBasisPoint: 1_000_000,
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
          fxhashFees: baseFees,
          royaltyBasisPoint: 10_000,
          splitBasisPoint: 1_000_000,
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
          fxhashFees: tezosFees,
          royaltyBasisPoint: 1000,
          splitBasisPoint: 1000,
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
          fxhashFees: ethFees,
          royaltyBasisPoint: 10_000,
          splitBasisPoint: 1_000_000,
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
          fxhashFees: baseFees,
          royaltyBasisPoint: 10_000,
          splitBasisPoint: 1_000_000,
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
        metadata: fxAppEnvMetadata("local"),
        gtMinPrice: "0",
        walletConnectId: "111994543d1b754bab82c368d0e61ae5",
        projectLockTime: 3600,
        referrerShare: 0,
        splitsApiKey: "75348d57d6cf60fa4551766c",
        cloudflareTurnstileSiteKey: "1x00000000000000000000AA",
        cloudflareTurnstileSiteKeyV2: "0x4AAAAAAAW-w_xThcj91jkA",
        syndicateProjectId: "9dd71e90-4605-45f4-94e0-4e533b01081d",
        awsS3Bucket: "fxh-media-assets-dev-testnet-us-east-1",
        awsS3Region: "us-east-1",
        openTelemetryTarget: "http://localhost:14268",
        algolia: algoliaConfigDev,
        gpu: gpuRenderingConfigDev,
        authJwtPublicKey: AUTH_JWT_PK_DEV,
      },
    },
    localDocker: {
      apis: fxhashLocalDockerApis,
      config: {
        envName: "localDocker",
        metadata: fxAppEnvMetadata("localDocker"),
        gtMinPrice: "0",
        walletConnectId: "111994543d1b754bab82c368d0e61ae5",
        projectLockTime: 3600,
        referrerShare: 0,
        splitsApiKey: "75348d57d6cf60fa4551766c",
        cloudflareTurnstileSiteKey: "1x00000000000000000000AA",
        cloudflareTurnstileSiteKeyV2: "0x4AAAAAAAW-w_xThcj91jkA",
        syndicateProjectId: "9dd71e90-4605-45f4-94e0-4e533b01081d",
        awsS3Bucket: "fxh-media-assets-dev-testnet-us-east-1",
        awsS3Region: "us-east-1",
        openTelemetryTarget: "http://localhost:14268",
        algolia: algoliaConfigDev,
        gpu: gpuRenderingConfigDev,
        authJwtPublicKey: AUTH_JWT_PK_DEV,
      },
    },
    dev: {
      apis: fxhashDevApis,
      config: {
        envName: "development",
        metadata: fxAppEnvMetadata("dev"),
        gtMinPrice: "0",
        walletConnectId: "111994543d1b754bab82c368d0e61ae5",
        projectLockTime: 3600,
        referrerShare: 0,
        splitsApiKey: "75348d57d6cf60fa4551766c",
        cloudflareTurnstileSiteKey: "0x4AAAAAAAVOb6invoeYS4EN",
        cloudflareTurnstileSiteKeyV2: "0x4AAAAAAAW-w_xThcj91jkA",
        syndicateProjectId: "9dd71e90-4605-45f4-94e0-4e533b01081d",
        awsS3Bucket: "fxh-media-assets-dev-testnet-us-east-1",
        awsS3Region: "us-east-1",
        openTelemetryTarget: "https://tempo.ss.fxhash2.xyz",
        algolia: algoliaConfigDev,
        gpu: gpuRenderingConfigDev,
        authJwtPublicKey: AUTH_JWT_PK_DEV,
      },
    },
    prd: {
      apis: fxhashPrdApis,
      config: {
        envName: "production",
        metadata: fxAppEnvMetadata("prd"),
        gtMinPrice: "0",
        walletConnectId: "111994543d1b754bab82c368d0e61ae5",
        projectLockTime: 3600,
        referrerShare: 0,
        splitsApiKey: "75348d57d6cf60fa4551766c",
        cloudflareTurnstileSiteKey: "0x4AAAAAAAVObp1YeuhbqNKB",
        cloudflareTurnstileSiteKeyV2: "0x4AAAAAAAW-yE4Q6Wdz6SNb",
        syndicateProjectId: "398ad73d-341c-4861-a038-f0ae1ca58e07",
        awsS3Bucket: "fxh-media-assets-prd-mainnet-us-east-1",
        awsS3Region: "us-east-1",
        openTelemetryTarget: "https://tempo.ss.fxhash2.xyz",
        algolia: algoliaConfigProd,
        gpu: gpuRenderingConfigProd,
        authJwtPublicKey: AUTH_JWT_PK_PRD,
      },
    },
  },
}

export function getBlockchainNetworkForEnv(env: TEnv): TBlockchainNetwork {
  return env === "prd" ? "mainnet" : "testnet"
}

export function getConfigForEnv(env: TEnv): IFxhashConfigSingleEnv {
  const blockchainNetwork = getBlockchainNetworkForEnv(env)
  return {
    ...fxhashConfig.networks[blockchainNetwork],
    ...fxhashConfig.envs[env],
  }
}

export const localConfig: IFxhashConfigSingleEnv = getConfigForEnv("local")
export const localDockerConfig: IFxhashConfigSingleEnv =
  getConfigForEnv("localDocker")
export const devConfig: IFxhashConfigSingleEnv = getConfigForEnv("dev")
export const prdConfig: IFxhashConfigSingleEnv = getConfigForEnv("prd")

const currentEnv = getEnv()
let config: IFxhashConfigSingleEnv = getConfigForEnv(currentEnv)

function setConfig(
  userConfig: Partial<IFxhashConfigSingleEnv>
): IFxhashConfigSingleEnv {
  config = {
    ...config,
    ...userConfig,
  }
  return config
}

export { fxhashConfig, config, setConfig }
