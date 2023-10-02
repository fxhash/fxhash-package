import {TEnv, FxhashConfig, TBlockchainNetwork, IFxhashConfigSingleEnv} from "config";

export function getBlockhainNEtworkForEnv(env: TEnv): TBlockchainNetwork {
  return env === "prd" ? "mainnet" : "testnet"
}


export function getConfigForEnv(env: TEnv): IFxhashConfigSingleEnv {
  const blockhainNetwork = getBlockhainNEtworkForEnv(env)
  return {
    ...FxhashConfig.networks[blockhainNetwork],
    ...FxhashConfig.envs[env],
  } 
}
