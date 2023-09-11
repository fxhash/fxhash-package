import dotenv from "dotenv"
import path from "path"

dotenv.config()
const env = {
  PORT_FXSTUDIO: 3300,
  PORT_FXPROJECT: 3301,
  RUN_PROJECT: true,
  PROJECT_PATH: "project",
  ...process.env,
}

export default env

export const CWD_PATH = path.resolve(process.cwd())
export const ROOT_PATH = path.resolve(__dirname)
export const STATIC_PATH = path.resolve(ROOT_PATH, "..", "static")
export const FXSTUDIO_PATH = path.resolve(STATIC_PATH, "fxlens")
export const TMP_PATH = path.resolve(STATIC_PATH, "tmp")
export const SNIPPET_PATH = path.resolve(STATIC_PATH, "snippet.js")
