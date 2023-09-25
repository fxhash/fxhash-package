import { createBaseConfig, WebpackConfigFactory } from "./webpack.config"

export const createHeadlessConfig: WebpackConfigFactory = options => {
  const { portProject } = options
  const baseConfig = createBaseConfig(options)
  return {
    ...baseConfig,
    mode: "development",
    devServer: {
      port: portProject + 1,
    },
  }
}
