import { DIST_PATH } from "../constants"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { WebpackConfiguration } from "webpack-dev-server"
import { InjectHead } from "./plugins/InjectHead"
import { getProjectPaths } from "../templates/paths"

export interface WebpackConfigFactoryOptions {
  srcPath: string
  portStudio?: number
  portProject?: number
  minify?: boolean
  zippify?: boolean
}

export type WebpackConfigFactory = (
  options: WebpackConfigFactoryOptions
) => WebpackConfiguration

export const createBaseConfig: WebpackConfigFactory = ({ srcPath }) => {
  const { jsEntryPath, htmlEntryPath } = getProjectPaths(srcPath)
  return {
    entry: jsEntryPath,
    output: {
      path: DIST_PATH,
      filename: "bundle.js",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: htmlEntryPath,
        inject: "body",
        publicPath: "./",
        minify: false,
      }),
      new InjectHead(),
    ],
  }
}
