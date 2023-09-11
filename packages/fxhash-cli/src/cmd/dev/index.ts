import type { CommandModule } from "yargs"
import Webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"
import open from "open"
import chalk from "chalk"
import express from "express"
import fs from "fs"
import env, { FXSTUDIO_PATH } from "../../constants"
import { createDevConfig } from "../../webpack/webpack.config.dev"
import { createHeadlessConfig } from "../../webpack/webpack.config.headless"
import { autoUpdateTooklit } from "updates/changes"

// very simple logger interface:
const logger = {
  error: chalk.red.bold,
  success: chalk.green.bold,
  command: (txt: string) => chalk.bgWhite.bold(` ${txt} `),
  infos: chalk.gray,
  url: chalk.bold.blue,
}

function padn(n: number, len = 2, char = "0"): string {
  return n.toString().padStart(len, char)
}

function verifyFxlens(path: string): void {
  const files = fs.readdirSync(path)
  // if no index.html, fxlens has not yet been initialized, throw an error
  if (!files.includes("index.html")) {
    console.log(logger.error("[error] fxlens is not installed\n"))
    console.log(
      `Have you tried running ${logger.command(
        "npm install"
      )} before ${logger.command("npm start")} ?`
    )
    console.log(
      logger.infos(
        "fxlens is pulled from its repository after npm install is called"
      )
    )
    console.log()
    process.exit(1)
  }
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
      .option("projectPath", {
        type: "string",
        default: env.PROJECT_PATH,
        describe: "The port the projcet will be served on",
      }),
  handler: async yargs => {
    const portProject = yargs.portProject as number
    const portStudio = yargs.portStudio as number
    const projectPath = yargs.projectPath as string

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
      projectPath,
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
