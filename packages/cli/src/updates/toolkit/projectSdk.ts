import { existsSync, readFileSync, writeFileSync } from "fs"
import { readFilesFromPackageTarball } from "../tarball.js"
import { ModuleUpdater } from "./toolkit.js"
import { getSha256 } from "./utils.js"

const PROJECT_SDK_SHA_KEY = "project-sdk"
const PROJECT_SDK_DIST_ENTRY = "dist/fxhash.min.js"
const PROJECT_SDK_DIST_ENTRY_OLD = "dist/fxhash.js"

interface UpdateProjectSdkOptions {
  version?: string
}

export function createProjectSdkUpdateConfig(
  options: UpdateProjectSdkOptions = {}
) {
  const updater: ModuleUpdater = {
    requiresUpdate: async project => {
      const fxhashSdkPath = project?.fxhashSdkPath || ""
      const files = await readFilesFromPackageTarball(
        "@fxhash/project-sdk",
        [PROJECT_SDK_DIST_ENTRY, PROJECT_SDK_DIST_ENTRY_OLD],
        { version: options.version }
      )
      let currentSha = ""
      if (existsSync(fxhashSdkPath)) {
        currentSha = getSha256(fxhashSdkPath)
      }
      const latestSha = getSha256(files?.files[0] || "")
      if (currentSha === latestSha) {
        return null
      }
      return {
        [PROJECT_SDK_SHA_KEY]: latestSha,
      }
    },
    update: async (latestVersion, project) => {
      const fxhashSdkPath = project?.fxhashSdkPath || ""
      const files = await readFilesFromPackageTarball(
        "@fxhash/project-sdk",
        [PROJECT_SDK_DIST_ENTRY, PROJECT_SDK_DIST_ENTRY_OLD],
        { version: options.version }
      )
      const sdkFile = readFileSync(files?.files[0] || "")
      writeFileSync(fxhashSdkPath, sdkFile)
      return latestVersion
    },
  }
  return updater
}
