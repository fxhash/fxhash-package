import type { CommandModule } from "yargs"
import Webpack, { Stats, WebpackError } from "webpack"
import chalk from "chalk"
import env from "../../constants"
import { createProdConfig } from "../../webpack/webpack.config.prod"

// very simple logger interface:
const logger = {
  error: chalk.red.bold,
  success: chalk.green.bold,
  command: (txt: string) => chalk.bgWhite.bold(` ${txt} `),
  infos: chalk.gray,
  url: chalk.bold.blue,
}

export const commandBuild: CommandModule = {
  command: "build",
  describe: "Create a build of the project that can be published on fx(hash)",
  builder: yargs =>
    yargs
      .option("no-minify", {
        type: "boolean",
        default: false,
        describe: "Minify the code of the project",
      })
      .option("projectPath", {
        type: "string",
        default: env.PROJECT_PATH,
        describe: "The port the projcet will be served on",
      }),
  handler: async yargs => {
    const noMinify = yargs.noMinify as boolean
    const projectPath = yargs.projectPath as string

    const webpackConfigFactoryOptions = {
      projectPath,
      minify: !noMinify,
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
            console.error(err.stack || err)
            if (err.details) {
              console.error(err.details)
            }
          }

          if (stats && stats.hasErrors()) {
            const info = stats.toJson()
            info.errors.forEach(error => console.error(error))
          }
        } else {
          // Compilation was successful
          console.log("Webpack compilation successful.")
        }
      }
    )
  },
}
