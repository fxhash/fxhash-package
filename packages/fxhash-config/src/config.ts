import { ethTestnetApis, IEthApis } from "api/eth"
import { ITezosApis, tezosTestnetApis, tezosMainnetApis } from "api/tezos"
import {
  IFxhashApis,
  fxhashDevApis,
  fxhashLocalApis,
  fxhashPrdApis,
} from "api/fxhash"
import {
  ITezosContracts,
  tezosMainnetContracts,
  tezosTestnetContracts,
} from "contracts/tezos"
import { ethTestnetContracts, IEthContracts } from "contracts/eth"
import { getConfigForEnv } from "utils"

export interface IFxhashNetworkConfig {
  network: string
}

export interface IFxhashEnvConfig {
  envName: string
  gtMinPrice: string
  walletConnectId: string
  ethFeeReceiver: `0x${string}`
  fxhashPrimaryFee: number
  fxhashSecondaryFee: number
  projectLockTime: number
  referrerShare: number
}

// the variations supported by the config
export type TBlockchain = "tez" | "eth"
export type TBlockchainNetwork = "testnet" | "mainnet"
export type TEnv = "dev" | "prd" | "local"

type TBlockchainContacts = {
  [B in TBlockchain]: {
    tez: ITezosContracts
    eth: IEthContracts | null
  }[B]
}

type TBlockchainApis = {
  [B in TBlockchain]: {
    tez: ITezosApis
    eth: IEthApis | null
  }[B]
}

type TNetworkBlockchainConfig = {
  [B in TBlockchain]: {
    tez: IFxhashNetworkConfig
    eth: IFxhashNetworkConfig
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
        },
        apis: tezosTestnetApis,
      },
      eth: {
        contracts: ethTestnetContracts,
        config: {
          network: "Goerli",
        },
        apis: ethTestnetApis,
      },
    },
    mainnet: {
      tez: {
        contracts: tezosMainnetContracts,
        config: {
          network: "mainnet",
        },
        apis: tezosMainnetApis,
      },
      eth: {
        contracts: null,
        config: {
          network: "Mainnet",
        },
        apis: null,
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
        ethFeeReceiver: "0x53Bc1c48CAc9aEca57Cf36f169d3345c6fb59b42",
        fxhashPrimaryFee: 1000,
        fxhashSecondaryFee: 3330,
        projectLockTime: 3600,
        referrerShare: 0,
      },
    },
    dev: {
      apis: fxhashDevApis,
      config: {
        envName: "development",
        gtMinPrice: "0",
        walletConnectId: "111994543d1b754bab82c368d0e61ae5",
        ethFeeReceiver: "0x53Bc1c48CAc9aEca57Cf36f169d3345c6fb59b42",
        fxhashPrimaryFee: 1000,
        fxhashSecondaryFee: 3330,
        projectLockTime: 3600,
        referrerShare: 0,
      },
    },
    prd: {
      apis: fxhashPrdApis,
      config: {
        envName: "production",
        gtMinPrice: "0",
        walletConnectId: "111994543d1b754bab82c368d0e61ae5",
        ethFeeReceiver: "0xTODO",
        fxhashPrimaryFee: 5000,
        fxhashSecondaryFee: 2500,
        projectLockTime: 3600,
        referrerShare: 0,
      },
    },
  },
}

export const localConfig = getConfigForEnv("local")
export const devConfig = getConfigForEnv("dev")
export const prdConfig = getConfigForEnv("prd")
