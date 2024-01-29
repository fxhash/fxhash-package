import type { CommandModule } from "yargs"
import { render } from "ejs"
import { format } from "prettier"
import { logger } from "../../utils/logger"
import { isProjectEjectable } from "../../validate/index"
import env, {
  CWD_PATH,
  WEBPACK_CONFIG_DEV_FILE_NAME,
  WEBPACK_CONFIG_PROD_FILE_NAME,
} from "../../constants"
import {
  existsSync,
  mkdirSync,
  readdirSync,
  renameSync,
  writeFileSync,
} from "fs"
import path from "path"
import { packageJson } from "../../templates/ejected/packageJson"
import { getProjectPaths } from "../../templates/paths"
import { baseWebpackTemplate } from "../../templates/baseWebpackConfig"
import { yesno } from "../../utils/prompts"

export const commandEject: CommandModule = {
  command: "eject",
  describe: "Eject your the simple project for custom configuration",
  builder: yargs =>
    yargs.option("srcPath", {
      type: "string",
      default: env.SRC_PATH,
      describe: "The path to the src of the project",
    }),
  handler: async yargs => {
    const srcPathArg = yargs.srcPath as string
    try {
      await isProjectEjectable("")
      const wantToEject = await yesno({
        title: "Are you sure you want to eject the project?",
        description: "The change can't be reversed.",
        hideIndex: true,
      })
      if (!wantToEject) {
        logger.log("Abort project eject ʕ•ᴥ•ʔ")
        return
      }
      logger.log("Starting project eject")
      const srcPath = path.resolve(CWD_PATH, srcPathArg)
      const { distPath } = getProjectPaths(srcPath)
      if (!existsSync(srcPath)) mkdirSync(srcPath)
      // Move all the existing files into the /src folder
      const files = readdirSync(CWD_PATH)
      const exclusions = [distPath, srcPath]
      const name = path.basename(CWD_PATH)
      files.forEach(file => {
        const sourceFilePath = path.join(CWD_PATH, file)
        const targetFilePath = path.join(srcPath, file)

        if (
          !exclusions.includes(file) &&
          !exclusions.includes(sourceFilePath)
        ) {
          renameSync(sourceFilePath, targetFilePath)
          logger.log(`Moved: ${sourceFilePath} -> ${targetFilePath}`)
        }
      })

      logger.log(`Exporting webpack configurations`)

      const pWebpackDevConfig = format(
        render(baseWebpackTemplate, {
          mode: `"dev"`,
        }),
        { parser: "babel" }
      )
      writeFileSync(
        path.join(CWD_PATH, WEBPACK_CONFIG_DEV_FILE_NAME + ".js"),
        pWebpackDevConfig
      )
      const pWebpackProdConfig = format(
        render(baseWebpackTemplate, {
          mode: `"prd"`,
        }),
        { parser: "babel" }
      )
      writeFileSync(
        path.join(CWD_PATH, WEBPACK_CONFIG_PROD_FILE_NAME + ".js"),
        pWebpackProdConfig
      )
      const pkgJson = JSON.stringify({ ...packageJson, name }, null, 2)
      const packageJsonPath = path.join(CWD_PATH, "package.json")
      writeFileSync(packageJsonPath, pkgJson)
      logger.log(`Created: ${packageJsonPath}`)
      logger.success(
        "Your project was successfully ejected. Good Luck! (｡◕‿◕｡)"
      )
    } catch (error: any) {
      logger.log("Error ejecting project")
      logger.errorExit(error.message)
    }
  },
}
