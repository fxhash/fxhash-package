import { JS_ENTRY_FILE_NAME } from "../constants"
import { WebpackConfiguration } from "webpack-dev-server"
import { getProjectPaths } from "../templates/paths"

export interface WebpackConfigFactoryOptions {
  srcPath: string
  portProject?: number
  minify?: boolean
  zippify?: boolean
  rootPath?: string
  noLens?: boolean
}

export type WebpackConfigFactory = (
  options: WebpackConfigFactoryOptions
) => WebpackConfiguration

export const createBaseConfig: WebpackConfigFactory = ({
  srcPath,
  rootPath,
}) => {
  const { jsEntryPath, distPath } = getProjectPaths(srcPath, rootPath)
  return {
    entry: { [JS_ENTRY_FILE_NAME]: jsEntryPath },
    output: {
      path: distPath,
      filename: "[name].js",
      clean: true,
    },
    plugins: [],
  }
}
