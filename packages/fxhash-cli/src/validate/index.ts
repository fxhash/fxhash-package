import { existsSync, renameSync, readFileSync, writeFileSync } from "fs"
import path from "path"
import parse, { HTMLElement } from "node-html-parser"
import {
  CWD_PATH,
  WEBPACK_CONFIG_DEV_FILE_NAME,
  WEBPACK_CONFIG_PROD_FILE_NAME,
} from "../constants"
import { getProjectPaths } from "../templates/paths"
import { format } from "prettier"
import { logger } from "../utils/logger"

// Utility function to read and parse HTML
function readAndParseHtml(filePath: string): Promise<HTMLElement> {
  return new Promise((resolve, reject) => {
    try {
      const indexHtml = readFileSync(filePath)
      const html = indexHtml.toString()
      const root = parse(html)
      resolve(root)
    } catch (error) {
      reject(error)
    }
  })
}

// Utility function to format and write HTML
function formatAndWriteHtml(root: any, filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const newHtml = root.toString()
      const pNewHtml = format(newHtml, { parser: "html" })
      writeFileSync(filePath, pNewHtml)
      resolve(pNewHtml)
    } catch (error) {
      reject(error)
    }
  })
}

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

export async function isProjectEjectable(srcPath: string): Promise<boolean> {
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
  return await validateProjectStructure(srcPath)
}

export async function validateProjectStructure(
  srcPath: string
): Promise<boolean> {
  try {
    const {
      rootPath,
      jsEntryPath,
      htmlEntryPath,
      fxhashSdkPath,
      fxhashSdkPathOld,
    } = getProjectPaths(srcPath)
    if (!existsSync(rootPath))
      throw new Error(`Main src folder not found: ${rootPath}`)
    if (!existsSync(jsEntryPath))
      throw new Error(`Main js file not found: ${jsEntryPath}`)
    if (!existsSync(htmlEntryPath))
      throw new Error(`Main html file not found: ${htmlEntryPath}`)
    if (existsSync(fxhashSdkPathOld)) {
      logger.log(
        "Found old sdk file 'fxhash.js' will rename to 'fxhash.min.js'"
      )
      renameSync(fxhashSdkPathOld, fxhashSdkPath)
      const htmlRoot = await readAndParseHtml(htmlEntryPath)
      const scriptExists = htmlRoot.querySelector(
        `script[src="./${path.basename(fxhashSdkPathOld)}"]`
      )
      scriptExists.setAttribute("src", `./${path.basename(fxhashSdkPath)}`)
      await formatAndWriteHtml(htmlRoot, htmlEntryPath)
      logger.success("Renamed sdk file and updated script tag in html file")
    }
    if (!existsSync(fxhashSdkPath))
      throw new Error(`fxhash.min.js file not found: ${fxhashSdkPath}`)
  } catch (e: any) {
    logger.errorExit(e.message)
  }
  return true
}
