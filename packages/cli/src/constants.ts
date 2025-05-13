import dotenv from "dotenv"
import path from "path"
import os from "os"
import fs from "fs"
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))

dotenv.config()
const env = {
  PORT_FXSTUDIO: 3300,
  PORT_FXPROJECT: 3301,
  NO_LENS: false,
  SRC_PATH: "src",
  NO_ZIP: false,
  ...process.env,
}

export default env

export const JS_ENTRY_FILE_NAME = "index"
export const SDK_FILE_NAME = "fxhash"
export const HTML_ENTRY_FILE_NAME = "index"
export const WEBPACK_CONFIG_DEV_FILE_NAME = "webpack.config.dev"
export const WEBPACK_CONFIG_PROD_FILE_NAME = "webpack.config.prod"
export const DIST_FOLDER_NAME = "upload"

// User folders (where the CLI is run)
export const CWD_PATH = path.resolve(process.cwd())

// CLI Internal folders
export const ROOT_PATH = path.resolve(__dirname)
export const STATIC_PATH = path.resolve(ROOT_PATH, "..", "static")
export const FXSTUDIO_PATH = path.resolve(STATIC_PATH, "fxlens")

const TMP_PATH = path.join(os.tmpdir(), "fxhash-cli")
export function getTmpPath(): string {
  if (!fs.existsSync(TMP_PATH)) {
    fs.mkdirSync(TMP_PATH, { recursive: true })
  }
  return TMP_PATH
}
export const SNIPPET_PATH = path.resolve(STATIC_PATH, "snippet.js")
