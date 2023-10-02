import { IEthApis } from "api/eth"
import { ITezosApis, tezosTestnetApis, tezosMainnetApis } from "api/tezos"
import { IFxhashApis, fxhashDevApis, fxhashPrdApis  } from "api/fxhash"
import { ITezosContracts, tezosMainnetContracts, tezosTestnetContracts } from "contracts/tezos"
import { IEthContracts } from "contracts/eth"
import { IFxhashEnvConfig, IFxhashNetworkConfig, TBlockchain, TBlockchainNetwork, TEnv, IFxhashConfig, FxhashConfig, prdConfig, devConfig, IFxhashConfigSingleEnv} from "config"

let config = process.env.FXHASH_ENV === "prd" ? prdConfig : devConfig

function setConfig(userConfig: Partial<IFxhashConfigSingleEnv>): IFxhashConfigSingleEnv {
  config = {
    ...config,
    ...userConfig
  }
  return config
}

export {
  IEthApis,
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
