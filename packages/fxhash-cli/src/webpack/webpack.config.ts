import { DIST_PATH, JS_ENTRY_FILE_NAME } from "../constants"
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
  const { jsEntryPath } = getProjectPaths(srcPath)
  return {
    entry: { [JS_ENTRY_FILE_NAME]: jsEntryPath },
    output: {
      path: DIST_PATH,
      filename: "[name].js",
      clean: true,
    },
    plugins: [new InjectHead()],
  }
}
