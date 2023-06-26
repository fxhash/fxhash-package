import { FxHashConfig, devConfig } from "dev"

const defaultConfig =
  process.env.NODE_ENV === "production" ? devConfig : devConfig

let config = defaultConfig

function setConfig(userConfig: Partial<FxHashConfig>): FxHashConfig {
  config = {
    ...config,
    ...userConfig,
  }
  return config
}

export { devConfig, defaultConfig, setConfig, config }
