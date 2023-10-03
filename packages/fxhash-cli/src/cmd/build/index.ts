import type { CommandModule } from "yargs"
import Webpack, { Stats, WebpackError } from "webpack"
import env from "../../constants"
import { createProdConfig } from "../../webpack/webpack.config.prod"
import { logger } from "../../utils/logger"
import { isEjectedProject, validateProjecStructure } from "../../validate/index"

export const commandBuild: CommandModule = {
  command: "build",
  describe: "Create a build of the project that can be published on fx(hash)",
  builder: yargs =>
    yargs
      .option("minify", {
        type: "boolean",
        default: false,
        describe: "Enable minification when creating the bundle",
      })
      .option("srcPath", {
        type: "string",
        default: env.SRC_PATH,
        describe: "The path to the project",
      }),
  handler: async yargs => {
    const minify = yargs.minify as boolean
    const srcPathArg = yargs.srcPath as string

    const isEjected = isEjectedProject(srcPathArg)

    const srcPath = isEjected ? srcPathArg : ""

    validateProjecStructure(srcPath)

    const webpackConfigFactoryOptions = {
      srcPath,
      minify,
      zippify: true,
    }

    // the environment config
    const webpackConfig = createProdConfig(webpackConfigFactoryOptions)

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