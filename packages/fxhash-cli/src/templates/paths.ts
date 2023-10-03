import path from "path"
import {
  CWD_PATH,
  JS_ENTRY_FILE_NAME,
  HTML_ENTRY_FILE_NAME,
  SDK_FILE_NAME,
} from "../constants"
import { isEjectedProject } from "../validate/index"

export interface FxhashProjectStructure {
  rootPath: string
  jsEntryPath: string
  htmlEntryPath: string
  staticPath: string
  fxhashSdkPath: string
}

export function getProjectPaths(srcPath: string): FxhashProjectStructure {
  const isEjected = isEjectedProject(srcPath)
  const rootPath = path.resolve(CWD_PATH, isEjected ? srcPath : "")
  const jsEntryPath = path.resolve(rootPath, `${JS_ENTRY_FILE_NAME}.js`)
  const htmlEntryPath = path.resolve(rootPath, `${HTML_ENTRY_FILE_NAME}.html`)
  const fxhashSdkPath = path.resolve(rootPath, `${SDK_FILE_NAME}.js`)
  const staticPath = path.resolve(rootPath)

  return {
    rootPath,
    jsEntryPath,
    htmlEntryPath,
    staticPath,
    fxhashSdkPath,
  }
}
