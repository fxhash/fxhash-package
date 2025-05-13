import type { CommandModule } from "yargs"
import env from "../../constants"
import { logger } from "../../utils/logger"
import {
  isEjectedProject,
  validateProjectStructure,
} from "../../validate/index"
import { getProjectPaths } from "../../templates/paths"
import { updateToolkit } from "../../updates/toolkit/toolkit"
import { fxlensUpdateConfig } from "../../updates/toolkit/fxlens"
import { createProjectSdkUpdateConfig } from "../../updates/toolkit/projectSdk"

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
      .option("sdkVersion", {
        type: "string",
        default: null,
        describe: "The version of the fxhash project-sdk to use",
      }),
  handler: async yargs => {
    const srcPathArg = yargs.srcPath as string
    const sdkVersionArg = yargs.sdkVersion as string

    const isEjected = isEjectedProject(srcPathArg)
    const srcPath = isEjected ? srcPathArg : ""
    await validateProjectStructure(srcPath)
    const project = getProjectPaths(srcPath)
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
    } catch (err) {
      logger.error("Error upgrading fx(hash) environment")
      logger.errorExit(err)
    }
  },
}
