import type { CommandModule } from "yargs"
import chalk from "chalk"
import env from "../../constants"
import { autoUpdateTooklit } from "../../updates/changes"
import { logger } from "../../utils/logger"
import { readFileSync, writeFileSync } from "fs"
import { latest, replaceSnippet } from "@fxhash/fxhash-snippet"
import { format } from "prettier"
import { isEjectedProject, validateProjecStructure } from "../../validate/index"
import { getProjectPaths } from "../../templates/paths"

export const commandUpdate: CommandModule = {
  command: "update",
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
    const inject = yargs.inject as boolean
    const srcPathArg = yargs.srcPath as string

    const isEjected = isEjectedProject(srcPathArg)
    const srcPath = isEjected ? srcPathArg : ""

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
      validateProjecStructure(srcPath)
      const { htmlEntryPath } = getProjectPaths(srcPath)
      try {
        const indexHtml = readFileSync(htmlEntryPath)
        const html = indexHtml.toString()
        const newHtml = replaceSnippet(html, latest)
        const pNewHtml = format(newHtml, { parser: "html" })
        writeFileSync(htmlEntryPath, pNewHtml)

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
