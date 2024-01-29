import {
  TEnv,
  fxhashConfig,
  TBlockchainNetwork,
  IFxhashConfigSingleEnv,
} from "config"

export function getBlockchainNetworkForEnv(env: TEnv): TBlockchainNetwork {
  return env === "prd" ? "mainnet" : "testnet"
}

export function getConfigForEnv(env: TEnv): IFxhashConfigSingleEnv {
  const blockchainNetwork = getBlockchainNetworkForEnv(env)
  return {
    ...fxhashConfig.networks[blockchainNetwork],
    ...fxhashConfig.envs[env],
  }
}
