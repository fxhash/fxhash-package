import type { CommandModule } from "yargs"
import Webpack, { Configuration } from "webpack"
import WebpackDevServer from "webpack-dev-server"
import open from "open"
import chalk from "chalk"
import path from "path"
import { existsSync } from "fs"
import env, { CWD_PATH, WEBPACK_CONFIG_DEV_FILE_NAME } from "../../constants.js"
import { getProjectPaths } from "../../templates/paths.js"
import { fxlensUpdateConfig } from "../../updates/toolkit/fxlens.js"
import { createProjectSdkUpdateConfig } from "../../updates/toolkit/projectSdk.js"
import { updateToolkit } from "../../updates/toolkit/toolkit.js"
import { logger } from "../../utils/logger.js"
import {
  isEjectedProject,
  validateProjectStructure,
} from "../../validate/index.js"
import { createDevConfig } from "../../webpack/webpack.config.dev.js"

function padn(n: number, len = 2, char = "0"): string {
  return n.toString().padStart(len, char)
}

export function devCommandBuilder(yargs: any) {
  return yargs
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
    .option("noLens", {
      type: "boolean",
      default: env.NO_LENS,
      describe: "Only serve the project. Don't start fxlens.",
    })
    .option("skip", {
      type: "boolean",
      default: env.NO_LENS,
      describe: "Only serve the project. Don't start fxlens.",
    })
    .option("sdkVersion", {
      type: "string",
      default: undefined,
      describe: "The version of the fxhash project-sdk to use",
    })
    .option("noUpdate", {
      type: "boolean",
      default: false,
      describe: "Prevent any updates to be downloaded",
    })
}

export const commandDev: CommandModule = {
  command: "dev",
  describe: "Start the dev environment",
  builder: devCommandBuilder,
  handler: async yargs => {
    const portProject = yargs.portProject as number
    const srcPathArg = yargs.srcPath as string
    const noLensArg = yargs.noLens as boolean
    const sdkVersionArg = yargs.sdkVersion as string
    const noUpdateArg = yargs.noUpdate as boolean

    const isEjected = isEjectedProject(srcPathArg)

    const srcPath = isEjected ? srcPathArg : ""

    await validateProjectStructure(srcPath)
    const project = getProjectPaths(srcPath)

    // commonly used variable for ease
    const URL_FXLENS = `http://localhost:${portProject}/fxlens`
    const URL_PROJECT = `http://localhost:${portProject}`

    if (!noUpdateArg) {
      try {
        await updateToolkit(
          {
            fxlens: fxlensUpdateConfig,
            "@fxhash/project-sdk": createProjectSdkUpdateConfig({
              version: sdkVersionArg,
            }),
          },
          project
        )
      } catch (err: any) {
        console.log(chalk.red.bold(`❗ ${err.message}`))
        console.log(chalk.dim("Starting anyways...\n\n"))
      }
    } else {
      console.log("skipping updates")
    }

    // TODO:do some checkups to see if fxlens is available, otherwise throw?
    // verifyFxlens(PATH_FXLENS)

    const webpackConfigFactoryOptions = {
      srcPath,
      portProject,
      noLens: noLensArg,
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

    server.startCallback(() => {
      let target = `${URL_FXLENS}/?target=${URL_PROJECT}`
      console.log()
      console.log(
        `${logger.successC(
          "[project] your project is running on"
        )} ${logger.url(URL_PROJECT)}`
      )
      console.log()
      if (noLensArg) {
        target = URL_PROJECT
        console.log(`noLens argument found; starting project only`)
        console.log(`opening project: ${logger.url(target)}`)
      } else {
        console.log(
          `opening fxlens with project as target: ${logger.url(target)}`
        )
      }
      console.log()
      open(target)
    })
  },
}
