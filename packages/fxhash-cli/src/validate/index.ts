import { existsSync } from "fs"
import path from "path"
import { CWD_PATH } from "../constants"
import { getProjectPaths } from "../templates/paths"
import { logger } from "../utils/logger"

export function isEjectedProject(srcPath: string): boolean {
  const projectPath = path.resolve(CWD_PATH, srcPath)
  return (
    existsSync(projectPath) &&
    existsSync(path.resolve(CWD_PATH, "package.json"))
  )
}

export function isProjectEjectable(srcPath: string): boolean {
  const packageJsonExists = existsSync(path.resolve(CWD_PATH, "package.json"))
  if (packageJsonExists)
    throw new Error("Project seems to already have a package.json")
  return validateProjecStructure(srcPath)
}

export function validateProjecStructure(srcPath: string): boolean {
  try {
    const { rootPath, jsEntryPath, htmlEntryPath } = getProjectPaths(srcPath)
    if (!existsSync(rootPath))
      throw new Error(`Main src folder not found: ${rootPath}`)
    if (!existsSync(jsEntryPath))
      throw new Error(`Main js file not found: ${jsEntryPath}`)
    if (!existsSync(htmlEntryPath))
      throw new Error(`Main html file not found: ${htmlEntryPath}`)
  } catch (e: any) {
    logger.errorExit(e.message)
  }
  return true
}
