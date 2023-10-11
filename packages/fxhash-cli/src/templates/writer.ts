import { STATIC_PATH } from "../constants"
import { writeFileSync, rmSync, mkdirSync, cpSync } from "fs"
import path from "path"
import { TemplateUserConfig } from "./types"

export async function writeProjectToDisk({
  template,
  name,
}: TemplateUserConfig): Promise<void> {
  const {
    files = [],
    staticFiles = [],
    folders = [],
  } = await template({ name })
  const rootDir = path.join(process.cwd(), name)
  rmSync(rootDir, { force: true, recursive: true })
  mkdirSync(rootDir)
  folders.forEach(folder => mkdirSync(path.join(rootDir, folder)))
  files.forEach(([fileName, fileContent]) => {
    writeFileSync(path.join(rootDir, fileName), fileContent)
  })
  staticFiles.forEach(([fileName, staticFile]) => {
    cpSync(
      path.join(STATIC_PATH, "..", staticFile),
      path.join(rootDir, fileName),
      {
        recursive: true,
      }
    )
  })
}
