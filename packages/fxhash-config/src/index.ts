import { IEthApis, ethTestnetApis } from "api/eth"
import { ITezosApis, tezosTestnetApis, tezosMainnetApis } from "api/tezos"
import { IFxhashApis, fxhashDevApis, fxhashPrdApis  } from "api/fxhash"
import { ITezosContracts, tezosMainnetContracts, tezosTestnetContracts } from "contracts/tezos"
import { IEthContracts, ethTestnetContracts } from "contracts/eth"
import { IFxhashEnvConfig, IFxhashNetworkConfig, TBlockchain, TBlockchainNetwork, TEnv, IFxhashConfig, FxhashConfig, prdConfig, devConfig, IFxhashConfigSingleEnv} from "config"

let config = (process.env.FXHASH_ENV === "prd" || process.env.FXHASH_ENV === "production" ) ? prdConfig : devConfig

function setConfig(userConfig: Partial<IFxhashConfigSingleEnv>): IFxhashConfigSingleEnv {
  config = {
    ...config,
    ...userConfig
  }
  return config
}

export {
  IEthApis,
  ethTestnetApis,
  ITezosApis,
  tezosTestnetApis,
  tezosMainnetApis,
  IFxhashApis,
  fxhashDevApis,
  fxhashPrdApis,
  ITezosContracts,
  tezosTestnetContracts,
  tezosMainnetContracts,
  IEthContracts,
  ethTestnetContracts,
  IFxhashEnvConfig,
  IFxhashNetworkConfig,
  TBlockchain,
  TBlockchainNetwork,
  TEnv,
  IFxhashConfig,
  FxhashConfig,
  devConfig,
  prdConfig,
  config,
  setConfig
}

export default FxhashConfig
