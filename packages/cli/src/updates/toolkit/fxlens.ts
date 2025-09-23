import axios from "axios"
import path from "path"
import fs from "fs"
import { getTmpPath, FXSTUDIO_PATH } from "../../constants.js"
import { GHDownloader } from "../ghDownloader.js"
import { readLockFile } from "../lockfile.js"
import { ModuleUpdater } from "./toolkit.js"

const ghDownloader = new GHDownloader({})

const FXLENS_SHA_KEY = "fxlens"

export const fxlensUpdateConfig: ModuleUpdater = {
  requiresUpdate: async () => {
    const { data } = await axios.get(
      `https://api.github.com/repos/fxhash/fxlens/commits?path=build&per_page=1`,
      {
        timeout: 3000,
      }
    )
    const latestSha = data[0].sha
    const lockFile = readLockFile()
    if (lockFile[FXLENS_SHA_KEY] === latestSha) {
      return null
    }
    return {
      [FXLENS_SHA_KEY]: latestSha,
    }
  },
  update: async latestVersion => {
    const tmpPath = getTmpPath()
    await ghDownloader.download("fxhash", "fxlens", "build", {
      output: tmpPath,
    })
    // if the folder fxlens already exists, clear it
    fs.rmSync(FXSTUDIO_PATH, {
      recursive: true,
      force: true,
    })
    // move download to ./lib/fxlens
    fs.renameSync(path.join(tmpPath, "build"), path.join(FXSTUDIO_PATH))
    return latestVersion
  },
}
