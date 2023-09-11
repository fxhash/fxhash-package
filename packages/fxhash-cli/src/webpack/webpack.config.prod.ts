import path from "path"
import CopyPlugin from "copy-webpack-plugin"
import { ZipperPlugin } from "./plugins/ZipperPlugin"
import { createBaseConfig, WebpackConfigFactory } from "./webpack.config"
import { CWD_PATH } from "../constants"

export const createProdConfig: WebpackConfigFactory = options => {
  const { projectPath } = options
  const baseConfig = createBaseConfig(options)
  return {
    ...baseConfig,
    mode: "production",
    // add the zipper plugin to the list of plugins
    plugins: [
      ...(baseConfig.plugins as any[]),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(CWD_PATH, projectPath, "public"),
            // prevents the index.html from being copied to the the public folder, as it's going to be
            // generated by webpack
            filter: async filePath => {
              return path.basename(filePath) !== "index.html"
            },
          },
        ],
      }),
      new ZipperPlugin(),
    ],
  }
}
