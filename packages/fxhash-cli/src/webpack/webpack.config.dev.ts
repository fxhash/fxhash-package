import { createBaseConfig, WebpackConfigFactory } from "./webpack.config"
import { getProjectPaths } from "../templates/paths"
import { RemoveJsEntryScriptPlugin } from "./plugins/RemoveJsEntryPlugin"

export const createDevConfig: WebpackConfigFactory = options => {
  const { srcPath, portProject } = options
  const baseConfig = createBaseConfig(options)
  const { staticPath, jsEntryPath, rootPath } = getProjectPaths(srcPath)
  return {
    ...baseConfig,
    mode: "development",
    devServer: {
      // disables the Hot Module Replacement feature because probably not ideal
      // in the context of generative art
      // https://webpack.js.org/concepts/hot-module-replacement/
      hot: false,
      port: portProject,
      static: {
        directory: staticPath,
      },
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
    },
    plugins: [
      ...baseConfig.plugins,
      new RemoveJsEntryScriptPlugin({ jsEntryPath, rootPath }),
    ],
  }
}
