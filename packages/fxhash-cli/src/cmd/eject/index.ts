import type { CommandModule } from "yargs"
import { logger } from "../../utils/logger"
import { isProjectEjectable } from "../../validate/index"
import env, { CWD_PATH, DIST_PATH } from "../../constants"
import {
  existsSync,
  mkdirSync,
  readdirSync,
  renameSync,
  writeFileSync,
} from "fs"
import path from "path"
import { packageJson } from "../../templates/ejected/packageJson"

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
      isProjectEjectable("")
      logger.log("Starting project eject")
      const srcPath = path.resolve(CWD_PATH, srcPathArg)
      if (!existsSync(srcPath)) mkdirSync(srcPath)
      // Move all the existing files into the /src folder
      const files = readdirSync(CWD_PATH)
      const exclusions = [DIST_PATH, srcPath]
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

      const pkgJson = JSON.stringify({ ...packageJson, name }, null, 2)
      const packageJsonPath = path.join(CWD_PATH, "package.json")
      writeFileSync(packageJsonPath, pkgJson)
      logger.log(`Created: ${packageJsonPath}`)
      logger.success("Your project was successfully ejected. Good Luck! 〠")
    } catch (error: any) {
      logger.log("Error ejecting project")
      logger.errorExit(error.message)
    }
  },
}
