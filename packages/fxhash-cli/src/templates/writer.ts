import {STATIC_PATH, ROOT_PATH} from "../constants"
import { writeFileSync, rmSync, mkdirSync, existsSync, cpSync } from "fs"
import path from "path"
import { TemplateFactory, TemplateType, TemplateUserConfig } from "templates/types"

export function writeProjectToDisk({
  template,
  name,
}: TemplateUserConfig): void {
  const { files = [], staticFiles = [], folders = [] } = template({ name })
  const rootDir = path.join(process.cwd(), name)
  rmSync(rootDir, { force: true, recursive: true })
  mkdirSync(rootDir)
  folders.forEach((folder) => mkdirSync(path.join(rootDir, folder)))
  files.forEach(([fileName, fileContent]) => {
    console.log("files", rootDir, fileName)
    writeFileSync(path.join(rootDir, fileName), fileContent)
  })
  staticFiles.forEach(([fileName, staticFile]) => {
    console.log(STATIC_PATH, ROOT_PATH)
    cpSync(path.join(STATIC_PATH, '..', staticFile), path.join(rootDir, fileName), {
      recursive: true,
    })
  })
}
