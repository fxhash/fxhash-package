import { existsSync } from "fs"
import path from "path"
import { CWD_PATH } from "../constants"
import { logger } from "../updates/logger"

export function validateProjecStructure({ srcPath }) {
  try {
    const projectPath = path.resolve(CWD_PATH, srcPath)
    if (!existsSync(projectPath))
      throw new Error(`Src folder not found: ${projectPath}`)
    const mainScriptPath = path.resolve(projectPath, "index.js")
    if (!existsSync(mainScriptPath))
      throw new Error(`Main js file not found: ${mainScriptPath}`)
    const mainHtmlFile = path.resolve(projectPath, "public", "index.html")
    if (!existsSync(mainHtmlFile))
      throw new Error(`Main html file not found: ${mainHtmlFile}`)
  } catch (e: any) {
    logger.errorExit(e.message)
  }
  return true
}
