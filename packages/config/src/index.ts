import { type IEthApis, ethTestnetApis } from "./api/eth.js"
import {
  type ITezosApis,
  tezosTestnetApis,
  tezosMainnetApis,
} from "./api/tezos.js"
import { fxhashDevApis, fxhashPrdApis } from "./api/fxhash.js"
import {
  type ITezosContracts,
  tezosMainnetContracts,
  tezosTestnetContracts,
} from "./contracts/tezos.js"
import { type IEthContracts, ethTestnetContracts } from "./contracts/eth.js"
import { type GPURenderingConfig } from "./config/gpu.js"
import {
  fxhashConfig,
  prdConfig,
  devConfig,
  localConfig,
  config,
  setConfig,
} from "./config.js"
import {
  type IFxhashEnvConfig,
  type IFxhashNetworkConfig,
  type TBlockchain,
  type TBlockchainNetwork,
  type TEnv,
  type IFxhashConfig,
} from "./types.js"

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
  type ITezosContracts,
  type IEthContracts,
  type IFxhashEnvConfig,
  type IFxhashNetworkConfig,
  type TBlockchain,
  type TBlockchainNetwork,
  type TEnv,
  type IFxhashConfig,
  type GPURenderingConfig,
}

export * from "./types.js"
export * from "./helpers.js"
export * from "./utils/index.js"

export { isAppMetadataValid } from "./config/metadata.js"

export default fxhashConfig

export { FXH_TOKEN_IMAGE } from "./constants";