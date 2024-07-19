import { IEthApis, ethTestnetApis } from "./api/eth"
import { ITezosApis, tezosTestnetApis, tezosMainnetApis } from "./api/tezos"
import { IFxhashApis, fxhashDevApis, fxhashPrdApis } from "./api/fxhash"
import {
  ITezosContracts,
  tezosMainnetContracts,
  tezosTestnetContracts,
} from "./contracts/tezos"
import { IEthContracts, ethTestnetContracts } from "./contracts/eth"
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
  localConfig,
  localDockerConfig,
} from "./config"
import { isLocal, isProd, isDockerLocal } from "./helpers"

let config = isProd
  ? prdConfig
  : isLocal
    ? isDockerLocal
      ? localDockerConfig
      : localConfig
    : devConfig

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
  ethTestnetApis,
  tezosTestnetApis,
  tezosMainnetApis,
  fxhashDevApis,
  fxhashPrdApis,
  tezosTestnetContracts,
  tezosMainnetContracts,
  ethTestnetContracts,
  fxhashConfig,
  devConfig,
  prdConfig,
  localConfig,
  config,
  setConfig,
  type IEthApis,
  type ITezosApis,
  type IFxhashApis,
  type ITezosContracts,
  type IEthContracts,
  type IFxhashEnvConfig,
  type IFxhashNetworkConfig,
  type TBlockchain,
  type TBlockchainNetwork,
  type TEnv,
  type IFxhashConfig,
}

export * from "./types"
export * from "./helpers"

export { type IAppMetadata } from "./config/metadata"

export default fxhashConfig
