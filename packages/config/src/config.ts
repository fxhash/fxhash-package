import { fxhashConfig, getConfigForEnv } from "./configBase.js"
import { getEnv } from "./helpers.js"
import { IFxhashConfigSingleEnv } from "./types.js"

export const localConfig: IFxhashConfigSingleEnv = getConfigForEnv("local")
export const localDockerConfig: IFxhashConfigSingleEnv =
  getConfigForEnv("localDocker")
export const devConfig: IFxhashConfigSingleEnv = getConfigForEnv("dev")
export const prdConfig: IFxhashConfigSingleEnv = getConfigForEnv("prd")

const currentEnv = getEnv()
let config: IFxhashConfigSingleEnv = getConfigForEnv(currentEnv)

function setConfig(
  userConfig: Partial<IFxhashConfigSingleEnv>
): IFxhashConfigSingleEnv {
  config = {
    ...config,
    ...userConfig,
  }
  return config
}

export { fxhashConfig, config, setConfig }
