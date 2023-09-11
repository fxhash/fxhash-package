import type { CommandModule } from "yargs"
import chalk from "chalk"
import env, { CWD_PATH } from "../../constants"
import { autoUpdateTooklit } from "../../updates/changes"
import { logger } from "../../utils/logger"
import { readFileSync, writeFileSync } from "fs"
import { latest, replaceSnippet } from "@fxhash/fxhash-snippet"
import path from "path"
import { format } from "prettier"
import { validateProjecStructure } from "../../validate/index"

export const commandUpdate: CommandModule = {
  command: "upgrade",
  describe: "Upgrade the fx(hash) environment",
  builder: yargs =>
    yargs
      .option("srcPath", {
        type: "string",
        default: env.SRC_PATH,
        describe: "The path to the src of the project",
      })
      .option("inject", {
        type: "boolean",
        default: false,
        describe: "Inject the snippet into the html file",
      }),
  handler: async yargs => {
    const srcPath = yargs.srcPath as string
    const inject = yargs.inject as boolean

    try {
      await autoUpdateTooklit({
        onStartAnyways: () => {
          console.log(chalk.dim("Starting anyways...\n\n"))
        },
        clearValidationMessage: false,
      })
    } catch (err) {
      logger.error("Error upgrading fx(hash) environment")
      logger.errorExit(err)
    }

    if (inject) {
      validateProjecStructure({ srcPath })
      try {
        const htmlFilePath = path.resolve(
          CWD_PATH,
          srcPath,
          "public",
          "index.html"
        )

        const indexHtml = readFileSync(htmlFilePath)
        const html = indexHtml.toString()
        const newHtml = replaceSnippet(html, latest)
        const pNewHtml = format(newHtml, { parser: "html" })
        writeFileSync(htmlFilePath, pNewHtml)

        logger.success(
          "Your project was updated with the latest fxhash-snippet!"
        )
      } catch (error: any) {
        logger.error("Error injecting fxhash-snippet into")
        logger.errorExit(error.message)
      }
    }
  },
}
