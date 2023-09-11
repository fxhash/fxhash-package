import type { CommandModule } from "yargs"
import Webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"
import open from "open"
import chalk from "chalk"
import express from "express"
import env, { FXSTUDIO_PATH } from "../../constants"
import { createDevConfig } from "../../webpack/webpack.config.dev"
import { createHeadlessConfig } from "../../webpack/webpack.config.headless"
import { autoUpdateTooklit } from "../../updates/changes"
import { logger } from "../../updates/logger"
import { validateProjecStructure } from "../../validate/index"

function padn(n: number, len = 2, char = "0"): string {
  return n.toString().padStart(len, char)
}

export const commandDev: CommandModule = {
  command: "dev",
  describe: "Start the dev environment",
  builder: yargs =>
    yargs
      .option("portStudio", {
        type: "number",
        default: env.PORT_FXSTUDIO,
        describe: "The port the studio will be served on",
      })
      .option("portProject", {
        type: "number",
        default: env.PORT_FXPROJECT,
        describe: "The port the projcet will be served on",
      })
      .option("srcPath", {
        type: "string",
        default: env.SRC_PATH,
        describe: "The path to the src of the project",
      }),
  handler: async yargs => {
    const portProject = yargs.portProject as number
    const portStudio = yargs.portStudio as number
    const srcPath = yargs.srcPath as string

    validateProjecStructure({ srcPath })

    // commonly used variable for ease
    const URL_FXLENS = `http://localhost:${portStudio}`
    const URL_PROJECT = `http://localhost:${portProject}`

    try {
      await autoUpdateTooklit({
        onStartAnyways: () => {
          console.log(chalk.dim("Starting anyways...\n\n"))
        },
        clearValidationMessage: true,
      })
    } catch (err) {
      console.log(chalk.red.bold(`❗ ${err.message}`))
      console.log(chalk.dim("Starting anyways...\n\n"))
    }

    // do some checkups to see if fxlens is available, otherwise throw?
    // verifyFxlens(PATH_FXLENS)

    const webpackConfigFactoryOptions = {
      srcPath,
      portStudio,
      portProject,
    }

    // the environment config
    const webpackConfig =
      env.RUN_PROJECT == true
        ? createDevConfig(webpackConfigFactoryOptions)
        : createHeadlessConfig(webpackConfigFactoryOptions)

    // instanciate compiler and server
    const compiler = Webpack({
      ...webpackConfig,
      // instructions to remove annoying webpack logs, except errors
      // we implement our own minimal logger for a cleaner experience
      infrastructureLogging: {
        level: "error",
      },
      stats: "errors-only",
    })
    const server = new WebpackDevServer(webpackConfig.devServer, compiler)

    if (env.RUN_PROJECT === true) {
      // hook the compilation done event to print custom logs
      compiler.hooks.done.tap("project", stats => {
        const hasErrors = stats.hasErrors()
        if (hasErrors) {
          console.log(logger.error("[project] compilation has failed"))
        } else {
          const date = new Date()
          const time = `${padn(date.getHours())}:${padn(
            date.getMinutes()
          )}:${padn(date.getSeconds())}`
          console.log(
            `${logger.success("[project] compiled successfully")} @ ${time}`
          )
        }
      })
    }

    // start fxlens
    const app = express()
    app.use(express.static(FXSTUDIO_PATH))
    app.listen(portStudio, () => {
      console.log(
        `${logger.success("[fxlens] fx(lens) is running on")} ${logger.url(
          URL_FXLENS
        )}`
      )
    })

    server.startCallback(() => {
      const target = `${URL_FXLENS}/?target=${URL_PROJECT}`
      const l =
        env.RUN_PROJECT === true
          ? `${logger.success(
              "[project] your project is running on"
            )} ${logger.url(URL_PROJECT)}`
          : `${logger.success(
              "[project] your project might be running on, "
            )} ${logger.url(URL_PROJECT)} ${logger.success(
              "but this is user specified so we don't really know"
            )}`
      console.log(l)
      console.log()
      console.log(
        `opening fxlens with project as target: ${logger.url(target)}`
      )
      console.log()
      open(target)
    })
  },
}
