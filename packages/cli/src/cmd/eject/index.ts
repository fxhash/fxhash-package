import type { CommandModule } from "yargs"
import { render } from "ejs"
import { format } from "prettier"
import {
  existsSync,
  mkdirSync,
  readdirSync,
  renameSync,
  writeFileSync,
} from "fs"
import path from "path"
import { env } from "process"
import yesno from "yesno"
import {
  CWD_PATH,
  WEBPACK_CONFIG_DEV_FILE_NAME,
  WEBPACK_CONFIG_PROD_FILE_NAME,
} from "../../constants.js"
import { baseWebpackTemplate } from "../../templates/baseWebpackConfig.js"
import { packageJson } from "../../templates/ejected/packageJson.js"
import { getProjectPaths } from "../../templates/paths.js"
import { logger } from "../../utils/logger.js"
import { isProjectEjectable } from "../../validate/index.js"

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
        // @ts-ignore
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

      const pWebpackDevConfig = await format(
        render(baseWebpackTemplate, {
          mode: `"dev"`,
        }),
        { parser: "babel" }
      )
      writeFileSync(
        path.join(CWD_PATH, WEBPACK_CONFIG_DEV_FILE_NAME + ".js"),
        pWebpackDevConfig
      )
      const pWebpackProdConfig = await format(
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
