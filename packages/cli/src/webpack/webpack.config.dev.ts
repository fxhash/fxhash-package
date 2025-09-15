import { createBaseConfig, WebpackConfigFactory } from "./webpack.config.js"
import { getProjectPaths } from "../templates/paths.js"
import { FXSTUDIO_PATH } from "../constants.js"

export const createDevConfig: WebpackConfigFactory = (options: any) => {
  const { srcPath, portProject, rootPath, noLens } = options
  const baseConfig = createBaseConfig(options)
  const { staticPath } = getProjectPaths(srcPath, rootPath)
  const _static = [
    {
      directory: staticPath,
      publicPath: "/",
    },
  ]

  if (!noLens) {
    _static.push({
      directory: FXSTUDIO_PATH,
      publicPath: "/fxlens/",
    })
  }
  return {
    ...baseConfig,
    mode: "development",
    devServer: {
      // disables the Hot Module Replacement feature because probably not ideal
      // in the context of generative art
      // https://webpack.js.org/concepts/hot-module-replacement/
      hot: false,
      port: portProject,
      static: _static,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
    },
    plugins: [...(baseConfig.plugins || [])],
  }
}
