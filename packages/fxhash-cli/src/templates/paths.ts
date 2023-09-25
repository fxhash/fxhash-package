import path from "path"
import { CWD_PATH, JS_ENTRY_FILE_NAME } from "../constants"
import { isEjectedProject } from "../validate/index"

export interface FxhashProjectStructure {
  rootPath: string
  jsEntryPath: string
  htmlEntryPath: string
  staticPath: string
}

export function getProjectPaths(srcPath: string): FxhashProjectStructure {
  const isEjected = isEjectedProject(srcPath)
  const rootPath = path.resolve(CWD_PATH, isEjected ? srcPath : "")
  const jsEntryPath = path.resolve(rootPath, `${JS_ENTRY_FILE_NAME}.js`)
  const htmlEntryPath = path.resolve(rootPath, "index.html")
  const staticPath = path.resolve(rootPath)

  return {
    rootPath,
    jsEntryPath,
    htmlEntryPath,
    staticPath,
  }
}
