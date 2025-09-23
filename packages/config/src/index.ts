import { type IEthApis, ethTestnetApis } from "./api/eth.js"
import { fxhashDevApis, fxhashPrdApis } from "./api/fxhash.js"
import {
  type ITezosApis,
  tezosMainnetApis,
  tezosTestnetApis,
} from "./api/tezos.js"
import {
  config,
  devConfig,
  fxhashConfig,
  localConfig,
  prdConfig,
  setConfig,
} from "./config.js"
import { type GPURenderingConfig } from "./config/gpu.js"
import { type IEthContracts, ethTestnetContracts } from "./contracts/eth.js"
import {
  type ITezosContracts,
  tezosMainnetContracts,
  tezosTestnetContracts,
} from "./contracts/tezos.js"
import {
  type IFxhashConfig,
  type IFxhashEnvConfig,
  type IFxhashNetworkConfig,
  type TBlockchain,
  type TBlockchainNetwork,
  type TEnv,
} from "./types.js"

export {
  config,
  devConfig,
  ethTestnetApis,
  ethTestnetContracts,
  fxhashConfig,
  fxhashDevApis,
  fxhashPrdApis,
  localConfig,
  prdConfig,
  setConfig,
  tezosMainnetApis,
  tezosMainnetContracts,
  tezosTestnetApis,
  tezosTestnetContracts,
  type GPURenderingConfig,
  type IEthApis,
  type IEthContracts,
  type IFxhashConfig,
  type IFxhashEnvConfig,
  type IFxhashNetworkConfig,
  type ITezosApis,
  type ITezosContracts,
  type TBlockchain,
  type TBlockchainNetwork,
  type TEnv,
}

export * from "./helpers.js"
export * from "./types.js"
export * from "./utils/index.js"

export { isAppMetadataValid } from "./config/metadata.js"

export default fxhashConfig
