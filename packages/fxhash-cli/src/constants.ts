import dotenv from "dotenv"
import path from "path"

dotenv.config()
const env = {
  PORT_FXSTUDIO: 3300,
  PORT_FXPROJECT: 3301,
  RUN_PROJECT: true,
  ...process.env,
}

export default env

export const ROOT_PATH = path.resolve(__dirname)
export const STATIC_PATH = path.resolve(ROOT_PATH, "..", "static")
