import type { CommandModule } from "yargs"
import { getProjectPaths } from "../../templates/paths.js"
import { fxlensUpdateConfig } from "../../updates/toolkit/fxlens.js"
import { createProjectSdkUpdateConfig } from "../../updates/toolkit/projectSdk.js"
import { updateToolkit } from "../../updates/toolkit/toolkit.js"
import { logger } from "../../utils/logger.js"
import {
  isEjectedProject,
  validateProjectStructure,
} from "../../validate/index.js"
import env from "../../constants.js"

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
      logger.errorExit(err as Error)
    }
  },
}
