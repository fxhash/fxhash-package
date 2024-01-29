import type { CommandModule } from "yargs"
import Webpack, { Configuration, Stats, WebpackError } from "webpack"
import env, { CWD_PATH, WEBPACK_CONFIG_PROD_FILE_NAME } from "../../constants"
import { createProdConfig } from "../../webpack/webpack.config.prod"
import { logger } from "../../utils/logger"
import { isEjectedProject, validateProjecStructure } from "../../validate/index"
import { existsSync } from "fs"
import path from "path"

export function commandBuildBuilder(yargs) {
  return yargs
    .option("minify", {
      type: "boolean",
      default: false,
      describe: "Enable minification when creating the bundle",
    })
    .option("srcPath", {
      type: "string",
      default: env.SRC_PATH,
      describe: "The path to the project",
    })
    .option("noZip", {
      type: "boolean",
      default: env.NO_ZIP,
      describe: "The path to the project",
    })
}

export const commandBuild: CommandModule = {
  command: "build",
  describe: "Create a build of the project that can be published on fx(hash)",
  builder: commandBuildBuilder,
  handler: async yargs => {
    const minify = yargs.minify as boolean
    const noZip = yargs.noZip as boolean
    const srcPathArg = yargs.srcPath as string

    const isEjected = isEjectedProject(srcPathArg)

    const srcPath = isEjected ? srcPathArg : ""

    validateProjecStructure(srcPath)

    const webpackConfigFactoryOptions = {
      srcPath,
      minify,
      zippify: !noZip,
    }

    let webpackConfig: Configuration

    // If the project is ejected we want to use the webpack config local to the project
    if (isEjected) {
      const localProdConfigPath = path.resolve(
        CWD_PATH,
        WEBPACK_CONFIG_PROD_FILE_NAME + ".js"
      )
      if (!existsSync(localProdConfigPath)) {
        throw new Error(`Could not find webpack config: ${localProdConfigPath}`)
      }
      webpackConfig = (await import(localProdConfigPath)).default
    } else {
      // otherwise we load the cli internal webpack configuration
      webpackConfig = createProdConfig(webpackConfigFactoryOptions)
    }

    // instanciate compiler and server
    const compiler = Webpack(
      webpackConfig,
      (err: WebpackError, stats: Stats) => {
        if (err || stats.hasErrors()) {
          // Handle errors here
          if (err) {
            logger.error(err.stack || err)
            if (err.details) {
              logger.error(err.details)
            }
          }

          if (stats && stats.hasErrors()) {
            const info = stats.toJson()
            info.errors.forEach(error => logger.error(error))
          }
        } else {
          // Compilation was successful
          logger.success("Project compilation successful.")
        }
      }
    )
  },
}
