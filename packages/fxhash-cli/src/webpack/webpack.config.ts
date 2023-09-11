import HtmlWebpackPlugin from "html-webpack-plugin"
import path from "path"
import {WebpackConfiguration} from "webpack-dev-server"
import { InjectHead} from "./plugins/InjectHead"

export const baseConfig: WebpackConfiguration = {
  entry: "./project/src/index.js",
  output: {
    path: path.resolve(__dirname, "../../dist"),
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
      template: "./project/public/index.html",
      inject: "body",
      publicPath: "./",
      minify: false,
    }),
    new InjectHead({
      inject: "caca !!",
    }),
  ],
}
