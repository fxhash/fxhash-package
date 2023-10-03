import {TEnv, fxhashConfig, TBlockchainNetwork, IFxhashConfigSingleEnv} from "config";

export function getBlockhainNEtworkForEnv(env: TEnv): TBlockchainNetwork {
  return env === "prd" ? "mainnet" : "testnet"
}


export function getConfigForEnv(env: TEnv): IFxhashConfigSingleEnv {
  const blockhainNetwork = getBlockhainNEtworkForEnv(env)
  return {
    ...fxhashConfig.networks[blockhainNetwork],
    ...fxhashConfig.envs[env],
  } 
}
