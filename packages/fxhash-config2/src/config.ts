import { IEthApis } from "api/eth"
import { ITezosApis, tezosTestnetApis, tezosMainnetApis } from "api/tezos"
import { IFxhashApis, fxhashDevApis, fxhashPrdApis  } from "api/fxhash"
import { ITezosContracts, tezosMainnetContracts, tezosTestnetContracts } from "contracts/tezos"
import { IEthContracts } from "contracts/eth"
import {getConfigForEnv} from "utils"

export interface IFxhashNetworkConfig {
  network: string
}

export interface IFxhashEnvConfig {
  envName: string
}

// the variations supported by the config
export type TBlockchain = "tez" | "eth"
export type TBlockchainNetwork = "testnet" | "mainnet"
export type TEnv = "dev" | "prd"

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
    contracts: TBlockchainContacts[B];
    config: TNetworkBlockchainConfig[B];
    apis: TBlockchainApis[B];
  };
} & {
  apis: IFxhashApis;
  config: IFxhashEnvConfig;
}

export const FxhashConfig: IFxhashConfig = {
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
        contracts: null,
        config: {
          network: "goerli",
        },
        apis: null,
      },
    },
    mainnet: {
      tez: {
        contracts: tezosMainnetContracts,
        config: {
          network: "ghostnet",
        },
        apis: tezosMainnetApis,
      },
      eth: {
        contracts: null,
        config: {
          network: "goerli",
        },
        apis: null,
      },
    },
  },
  envs: {
    dev: {
      apis: fxhashDevApis,
      config: {
        envName: "development",
      },
    },
    prd: {
      apis: fxhashPrdApis,
      config: {
        envName: "production",
      },
    },
  },
}

export const devConfig = getConfigForEnv("dev")
export const prdConfig = getConfigForEnv("prd")
