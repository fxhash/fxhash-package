import dotenv from "dotenv"
import path from "path"

dotenv.config()
const env = {
  PORT_FXSTUDIO: 3300,
  PORT_FXPROJECT: 3301,
  RUN_PROJECT: true,
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
export const TMP_PATH = path.resolve(STATIC_PATH, "tmp")
export const SNIPPET_PATH = path.resolve(STATIC_PATH, "snippet.js")
