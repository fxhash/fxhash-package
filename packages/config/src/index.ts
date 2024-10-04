import { type IEthApis, ethTestnetApis } from "./api/eth.js"
import {
  type ITezosApis,
  tezosTestnetApis,
  tezosMainnetApis,
} from "./api/tezos.js"
import { type IFxhashApis, fxhashDevApis, fxhashPrdApis } from "./api/fxhash.js"
import {
  type ITezosContracts,
  tezosMainnetContracts,
  tezosTestnetContracts,
} from "./contracts/tezos.js"
import { type IEthContracts, ethTestnetContracts } from "./contracts/eth.js"
import {
  type IFxhashEnvConfig,
  type IFxhashNetworkConfig,
  type TBlockchain,
  type TBlockchainNetwork,
  type TEnv,
  type IFxhashConfig,
  fxhashConfig,
  prdConfig,
  devConfig,
  type IFxhashConfigSingleEnv,
  localConfig,
  localDockerConfig,
} from "./config.js"
import { isLocal, isProd, isDockerLocal } from "./helpers.js"

let config: IFxhashConfigSingleEnv = isProd
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

export * from "./types.js"
export * from "./helpers.js"

export { type IAppMetadata, isAppMetadataValid } from "./config/metadata.js"

export default fxhashConfig
