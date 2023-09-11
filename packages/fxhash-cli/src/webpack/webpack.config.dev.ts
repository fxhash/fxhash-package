import path from "path"
import {baseConfig} from "./webpack.config"
import env from "../constants"
import {WebpackConfiguration} from "webpack-dev-server"

export const devConfig: WebpackConfiguration = {
  ...baseConfig,
  mode: "development",
  devServer: {
    // disables the Hot Module Replacement feature because probably not ideal
    // in the context of generative art
    // https://webpack.js.org/concepts/hot-module-replacement/
    hot: false,
    port: env.PORT_FXPROJECT,
    // server resources from the public folder, located in /project
    static: {
      directory: path.join(__dirname, "..", "..", "project", "public"),
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  plugins: [
    ...baseConfig.plugins as any[],
  ]
}
