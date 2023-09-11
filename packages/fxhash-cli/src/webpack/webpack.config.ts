import { CWD_PATH, DIST_PATH } from "../constants"
import HtmlWebpackPlugin from "html-webpack-plugin"
import path from "path"
import { WebpackConfiguration } from "webpack-dev-server"
import { InjectHead } from "./plugins/InjectHead"

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

export const createBaseConfig: WebpackConfigFactory = ({ srcPath }) => ({
  entry: path.resolve(CWD_PATH, srcPath, "index.js"),
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
      template: path.resolve(CWD_PATH, srcPath, "public", "index.html"),
      inject: "body",
      publicPath: "./",
      minify: false,
    }),
    new InjectHead({
      inject: "caca !!",
    }),
  ],
})
