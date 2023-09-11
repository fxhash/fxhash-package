import path from "path"
import { createBaseConfig, WebpackConfigFactory } from "./webpack.config"
import { CWD_PATH } from "../constants"

export const createDevConfig: WebpackConfigFactory = options => {
  const { srcPath, portProject } = options
  const baseConfig = createBaseConfig(options)
  return {
    ...baseConfig,
    mode: "development",
    devServer: {
      // disables the Hot Module Replacement feature because probably not ideal
      // in the context of generative art
      // https://webpack.js.org/concepts/hot-module-replacement/
      hot: false,
      port: portProject,
      // server resources from the public folder, located in /project
      static: {
        directory: path.resolve(CWD_PATH, srcPath, "public"),
      },
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
    },
    plugins: [...(baseConfig.plugins as any[])],
  }
}
