import { IEthApis, ethTestnetApis } from "api/eth"
import { ITezosApis, tezosTestnetApis, tezosMainnetApis } from "api/tezos"
import { IFxhashApis, fxhashDevApis, fxhashPrdApis } from "api/fxhash"
import {
  ITezosContracts,
  tezosMainnetContracts,
  tezosTestnetContracts,
} from "contracts/tezos"
import { IEthContracts, ethTestnetContracts } from "contracts/eth"
import {
  IFxhashEnvConfig,
  IFxhashNetworkConfig,
  TBlockchain,
  TBlockchainNetwork,
  TEnv,
  IFxhashConfig,
  fxhashConfig,
  prdConfig,
  devConfig,
  IFxhashConfigSingleEnv,
} from "config"

const PRD_ENVS = ["prd", "production"]
const ACCEPTED_ENVS = [
  "FXHASH_ENV",
  "NEXT_PUBLIC_FXHASH_ENV",
  "REACT_APP_FXHASH_ENV",
]
const isProd = (() => {
  for (const ENV_NAME in ACCEPTED_ENVS) {
    if (PRD_ENVS.includes(process?.env?.[ENV_NAME])) {
      return true
    }
  }
  return false
})()

let config = isProd ? prdConfig : devConfig

function setConfig(
  userConfig: Partial<IFxhashConfigSingleEnv>
): IFxhashConfigSingleEnv {
  config = {
    ...config,
    ...userConfig,
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
  fxhashConfig,
  devConfig,
  prdConfig,
  config,
  setConfig,
}

export default fxhashConfig
