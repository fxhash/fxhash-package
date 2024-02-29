import { existsSync, readFileSync, writeFileSync } from "fs"
import { readLockFile } from "../lockfile"
import { readFilesFromPackageTarball } from "../tarball"
import { ModuleUpdater } from "./toolkit"
import { getSha256 } from "./utils"

const PROJECT_SDK_SHA_KEY = "project-sdk"
const PROJECT_SDK_DIST_ENTRY = "dist/fxhash.min.js"
const PROJECT_SDK_DIST_ENTRY_OLD = "dist/fxhash.js"

export const projectSdkUpdateConfig: ModuleUpdater = {
  requiresUpdate: async ({ fxhashSdkPath }) => {
    const files = await readFilesFromPackageTarball("@fxhash/project-sdk", [
      PROJECT_SDK_DIST_ENTRY,
      PROJECT_SDK_DIST_ENTRY_OLD,
    ])
    let currentSha = ""
    if (existsSync(fxhashSdkPath)) {
      currentSha = getSha256(fxhashSdkPath)
    }
    const latestSha = getSha256(files.files[0])
    if (currentSha === latestSha) {
      return null
    }
    return {
      [PROJECT_SDK_SHA_KEY]: latestSha,
    }
  },
  update: async (latestVersion, { fxhashSdkPath }) => {
    const files = await readFilesFromPackageTarball("@fxhash/project-sdk", [
      PROJECT_SDK_DIST_ENTRY,
    ])
    const sdkFile = readFileSync(files.files[0])
    writeFileSync(fxhashSdkPath, sdkFile)
    return latestVersion
  },
}
