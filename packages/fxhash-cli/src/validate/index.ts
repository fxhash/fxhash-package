import { existsSync } from "fs"
import path from "path"
import {
  CWD_PATH,
  WEBPACK_CONFIG_DEV_FILE_NAME,
  WEBPACK_CONFIG_PROD_FILE_NAME,
} from "../constants"
import { getProjectPaths } from "../templates/paths"
import { logger } from "../utils/logger"

export type ValidProjectSdkFiles = {
  packageJson: string
  files: string[]
}

export function isEjectedProject(srcPath: string): boolean {
  const projectPath = path.resolve(CWD_PATH, srcPath)
  return (
    existsSync(projectPath) &&
    existsSync(path.resolve(CWD_PATH, "package.json")) &&
    existsSync(path.resolve(CWD_PATH, `${WEBPACK_CONFIG_DEV_FILE_NAME}.js`)) &&
    existsSync(path.resolve(CWD_PATH, `${WEBPACK_CONFIG_PROD_FILE_NAME}.js`))
  )
}

export function isProjectEjectable(srcPath: string): boolean {
  const packageJsonExists = existsSync(path.resolve(CWD_PATH, "package.json"))
  if (packageJsonExists) throw new Error("Project already has a package.json")
  const devWebpackConfig = existsSync(
    path.resolve(CWD_PATH, WEBPACK_CONFIG_DEV_FILE_NAME + ".js")
  )
  if (devWebpackConfig)
    throw new Error("Project already has a webpack.dev.config")
  const prodWebpackConfig = existsSync(
    path.resolve(CWD_PATH, WEBPACK_CONFIG_PROD_FILE_NAME + ".js")
  )
  if (prodWebpackConfig)
    throw new Error("Project already has a webpack.prod.config")
  return validateProjecStructure(srcPath)
}

export function validateProjecStructure(srcPath: string): boolean {
  try {
    const { rootPath, jsEntryPath, htmlEntryPath, fxhashSdkPath } =
      getProjectPaths(srcPath)
    if (!existsSync(rootPath))
      throw new Error(`Main src folder not found: ${rootPath}`)
    if (!existsSync(jsEntryPath))
      throw new Error(`Main js file not found: ${jsEntryPath}`)
    if (!existsSync(htmlEntryPath))
      throw new Error(`Main html file not found: ${htmlEntryPath}`)
    if (!existsSync(fxhashSdkPath))
      throw new Error(`fxhash.js file not found: ${fxhashSdkPath}`)
  } catch (e: any) {
    logger.errorExit(e.message)
  }
  return true
}
