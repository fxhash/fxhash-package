import { CWD_PATH } from "../constants"
import HtmlWebpackPlugin from "html-webpack-plugin"
import path from "path"
import { WebpackConfiguration } from "webpack-dev-server"
import { InjectHead } from "./plugins/InjectHead"

export interface WebpackConfigFactoryOptions {
  projectPath: string
  portStudio: number
  portProject: number
}

export type WebpackConfigFactory = (
  options: WebpackConfigFactoryOptions
) => WebpackConfiguration

export const createBaseConfig: WebpackConfigFactory = ({
  projectPath = "project",
}) => ({
  entry: path.resolve(CWD_PATH, projectPath, "src", "index.js"),
  output: {
    path: path.resolve(CWD_PATH, "dist"),
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
      template: path.resolve(CWD_PATH, projectPath, "public", "index.html"),
      inject: "body",
      publicPath: "./",
      minify: false,
    }),
    new InjectHead({
      inject: "caca !!",
    }),
  ],
})
