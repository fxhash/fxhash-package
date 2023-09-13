import CopyPlugin from "copy-webpack-plugin"
import path from "path"
import { DIST_PATH } from "../constants"
import { ZipperPlugin } from "./plugins/ZipperPlugin"
import { createBaseConfig, WebpackConfigFactory } from "./webpack.config"
import { getProjectPaths } from "../templates/paths"

export const createProdConfig: WebpackConfigFactory = options => {
  const { srcPath, minify, zippify } = options
  const baseConfig = createBaseConfig(options)
  const { staticPath, jsEntryPath, htmlEntryPath } = getProjectPaths(srcPath)
  const zipFilePath = baseConfig.output.path + ".zip"
  return {
    ...baseConfig,
    mode: "production",
    optimization: {
      minimize: minify,
    },
    // add the zipper plugin to the list of plugins
    plugins: [
      ...baseConfig.plugins,
      staticPath !== baseConfig.output.path &&
        new CopyPlugin({
          patterns: [
            {
              from: staticPath,
              filter: async filePath => {
                const filesNotToCopy = [jsEntryPath, htmlEntryPath, zipFilePath]
                const foldersNotToCopy = [DIST_PATH]
                if (filesNotToCopy.some(file => filePath === file)) return false
                if (
                  foldersNotToCopy.some(
                    folder => path.dirname(filePath) === folder
                  )
                )
                  return false
                return true
              },
            },
          ],
        }),
      zippify && new ZipperPlugin({ zipPath: zipFilePath }),
    ].filter(p => !!p),
  }
}
