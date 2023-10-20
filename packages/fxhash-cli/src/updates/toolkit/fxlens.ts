import axios from "axios"
import path from "path"
import fs from "fs"
import { FXSTUDIO_PATH, TMP_PATH } from "../../constants"
import { readLockFile } from "../lockfile"
import { ModuleUpdater } from "./toolkit"
import { GHDownloader } from "../ghDownloader"

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
    await ghDownloader.download("fxhash", "fxlens", "build", {
      output: TMP_PATH,
    })
    // if the folder fxlens already exists, clear it
    fs.rmSync(FXSTUDIO_PATH, {
      recursive: true,
      force: true,
    })
    // move download to ./lib/fxlens
    fs.renameSync(path.join(TMP_PATH, "build"), path.join(FXSTUDIO_PATH))
    return latestVersion
  },
}
