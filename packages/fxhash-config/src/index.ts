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

const isProd = (() => {
  // We can't destructure process.envs
  // https://nextjs.org/docs/pages/api-reference/next-config-js/env
  return (
    process.env.FXHASH_ENV === 'prd' ||
    process.env.FXHASH_ENV === 'production' ||
    process.env.NEXT_PUBLIC_FXHASH_ENV === 'prd' ||
    process.env.NEXT_PUBLIC_FXHASH_ENV === 'production' ||
    process.env.REACT_APP_FXHASH_ENV === 'prd' ||
    process.env.REACT_APP_FXHASH_ENV === 'production'
  );
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
