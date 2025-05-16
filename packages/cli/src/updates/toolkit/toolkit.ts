import { i } from "../../../../params/dist/utils-jEvPb5wq.js"
import { FxhashProjectStructure } from "../../templates/paths.js"
import { logger } from "../../utils/logger.js"
import { updateLockFile } from "../lockfile.js"

type ModuleVersion = {
  [key: string]: string
} | null

export type ModuleUpdater = {
  requiresUpdate: (project?: FxhashProjectStructure) => Promise<ModuleVersion>
  update: (
    latestVersion: ModuleVersion,
    project?: FxhashProjectStructure
  ) => Promise<ModuleVersion>
}

export type UpdateManagerConfig = Record<string, ModuleUpdater>

export async function updateToolkit(
  config: UpdateManagerConfig,
  project: FxhashProjectStructure
): Promise<void[]> {
  return await Promise.all(
    Object.keys(config).map(async moduleName => {
      const moduleConfig = config[moduleName]
      const latestVersion = await logger.step(
        `checking update for ${moduleName}`,
        async () => await moduleConfig.requiresUpdate(project),
        async latestVersion => {
          logger.clear()
          if (!latestVersion) {
            logger.success(`${moduleName} already update to date.`)
          }
        }
      )
      if (latestVersion) {
        console.log(`need update for ${moduleName}`)

        const updatedVersion = await logger.step(
          `downloading update for ${moduleName}`,
          async () => await moduleConfig.update(latestVersion, project),
          async latestVersion => {
            logger.clear()
            if (!latestVersion) {
              logger.success(`${moduleName} updated successfully`)
            }
          }
        )

        //@ts-ignore
        updateLockFile(currentContent => ({
          ...currentContent,
          ...updatedVersion,
        }))
      }
    })
  )
}
