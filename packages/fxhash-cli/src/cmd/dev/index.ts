import type { CommandModule } from "yargs"
import Webpack, { Configuration } from "webpack"
import WebpackDevServer from "webpack-dev-server"
import open from "open"
import chalk from "chalk"
import express from "express"
import env, {
  CWD_PATH,
  FXSTUDIO_PATH,
  WEBPACK_CONFIG_DEV_FILE_NAME,
} from "../../constants"
import { createDevConfig } from "../../webpack/webpack.config.dev"
import { logger } from "../../utils/logger"
import { isEjectedProject, validateProjecStructure } from "../../validate/index"
import path from "path"
import { existsSync } from "fs"
import { updateToolkit } from "../../updates/toolkit/toolkit"
import { fxlensUpdateConfig } from "../../updates/toolkit/fxlens"
import { projectSdkUpdateConfig } from "../../updates/toolkit/projectSdk"
import { getProjectPaths } from "../../templates/paths"

function padn(n: number, len = 2, char = "0"): string {
  return n.toString().padStart(len, char)
}

export function devCommandBuilder(yargs) {
  return yargs
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
      describe:
        "The path to the src of the project. This setting is only relevant when your project is ejected.",
    })
}

export const commandDev: CommandModule = {
  command: "dev",
  describe: "Start the dev environment",
  builder: devCommandBuilder,
  handler: async yargs => {
    const portProject = yargs.portProject as number
    const portStudio = yargs.portStudio as number
    const srcPathArg = yargs.srcPath as string

    const isEjected = isEjectedProject(srcPathArg)

    const srcPath = isEjected ? srcPathArg : ""

    validateProjecStructure(srcPath)
    const project = getProjectPaths(srcPath)

    // commonly used variable for ease
    const URL_FXLENS = `http://localhost:${portStudio}`
    const URL_PROJECT = `http://localhost:${portProject}`

    try {
      await updateToolkit(
        {
          fxlens: fxlensUpdateConfig,
          "@fxhash/project-sdk": projectSdkUpdateConfig,
        },
        project
      )
    } catch (err) {
      console.log(chalk.red.bold(`❗ ${err.message}`))
      console.log(chalk.dim("Starting anyways...\n\n"))
    }

    // TODO:do some checkups to see if fxlens is available, otherwise throw?
    // verifyFxlens(PATH_FXLENS)

    const webpackConfigFactoryOptions = {
      srcPath,
      portStudio,
      portProject,
    }

    let webpackConfig: Configuration

    // If the project is ejected we want to use the webpack config local to the project
    if (isEjected) {
      const localDevConfigPath = path.resolve(
        CWD_PATH,
        WEBPACK_CONFIG_DEV_FILE_NAME + ".js"
      )
      if (!existsSync(localDevConfigPath)) {
        throw new Error(`Could not find webpack config: ${localDevConfigPath}`)
      }
      webpackConfig = (await import(localDevConfigPath)).default
    } else {
      // otherwise we load the cli internal webpack configuration
      webpackConfig = createDevConfig(webpackConfigFactoryOptions)
    }

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
          `${logger.successC("[project] compiled successfully")} @ ${time}`
        )
      }
    })

    // start fxlens
    const app = express()
    app.use(express.static(FXSTUDIO_PATH))
    app.listen(portStudio, () => {
      console.log(
        `${logger.successC("[fxlens] fx(lens) is running on")} ${logger.url(
          URL_FXLENS
        )}`
      )
    })

    server.startCallback(() => {
      const target = `${URL_FXLENS}/?target=${URL_PROJECT}`
      const l =
        env.RUN_PROJECT === true
          ? `${logger.successC(
              "[project] your project is running on"
            )} ${logger.url(URL_PROJECT)}`
          : `${logger.successC(
              "[project] your project might be running on, "
            )} ${logger.url(URL_PROJECT)} ${logger.successC(
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
