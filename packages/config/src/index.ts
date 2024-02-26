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
} from "./config"

const isProd = (() => {
  // We can't destructure process.envs
  // https://nextjs.org/docs/pages/api-reference/next-config-js/env
  return (
    process.env.FXHASH_ENV === "prd" ||
    process.env.FXHASH_ENV === "production" ||
    process.env.NEXT_PUBLIC_FXHASH_ENV === "prd" ||
    process.env.NEXT_PUBLIC_FXHASH_ENV === "production" ||
    process.env.REACT_APP_FXHASH_ENV === "prd" ||
    process.env.REACT_APP_FXHASH_ENV === "production"
  )
})()

const isLocal = (() => {
  // We can't destructure process.envs
  // https://nextjs.org/docs/pages/api-reference/next-config-js/env
  return (
    process.env.FXHASH_ENV === "local" ||
    process.env.NEXT_PUBLIC_FXHASH_ENV === "local" ||
    process.env.REACT_APP_FXHASH_ENV === "local"
  )
})()

let config = isProd ? prdConfig : isLocal ? localConfig : devConfig

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

export default fxhashConfig
