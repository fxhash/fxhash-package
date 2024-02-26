import path from "path"
import {
  CWD_PATH,
  JS_ENTRY_FILE_NAME,
  HTML_ENTRY_FILE_NAME,
  SDK_FILE_NAME,
  DIST_FOLDER_NAME,
} from "../constants"

export interface FxhashProjectStructure {
  rootPath: string
  jsEntryPath: string
  htmlEntryPath: string
  staticPath: string
  fxhashSdkPath: string
  fxhashSdkPathOld: string
  distPath: string
}

export function getProjectPaths(
  srcPath: string,
  rootPath?: string
): FxhashProjectStructure {
  const resolvedRootPath = path.resolve(CWD_PATH, rootPath || "")
  const distPath = path.resolve(resolvedRootPath, DIST_FOLDER_NAME)
  const resolvedSrcPath = path.resolve(resolvedRootPath, srcPath)
  const jsEntryPath = path.resolve(resolvedSrcPath, `${JS_ENTRY_FILE_NAME}.js`)
  const htmlEntryPath = path.resolve(
    resolvedSrcPath,
    `${HTML_ENTRY_FILE_NAME}.html`
  )
  const fxhashSdkPath = path.resolve(resolvedSrcPath, `${SDK_FILE_NAME}.min.js`)
  const fxhashSdkPathOld = path.resolve(resolvedSrcPath, `${SDK_FILE_NAME}.js`)
  const staticPath = path.resolve(resolvedSrcPath)

  return {
    rootPath: resolvedRootPath,
    jsEntryPath,
    htmlEntryPath,
    staticPath,
    fxhashSdkPath,
    fxhashSdkPathOld,
    distPath,
  }
}
