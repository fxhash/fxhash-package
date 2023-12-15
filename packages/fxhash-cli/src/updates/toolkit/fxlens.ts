import axios from "axios"
import path from "path"
import fs from "fs"
import { FXSTUDIO_PATH, getTmpPath } from "../../constants"
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
    const tmpPath = getTmpPath()
    await ghDownloader.download("fxhash", "fxlens", "build", {
      output: tmpPath,
    })
    // if the folder fxlens already exists, clear it
    fs.rmSync(FXSTUDIO_PATH, {
      recursive: true,
      force: true,
    })
    // copy download to ./lib/fxlens then rm src
    // linux /tmp usually on separate tmpfs device mount
    // and nodejs will complain about cross-device EXDEV error if moving
    fs.cpSync(path.join(tmpPath, "build"), path.join(FXSTUDIO_PATH), {
      recursive: true,
    })
    fs.rmSync(tmpPath,{recursive:true})
    return latestVersion
  },
}
