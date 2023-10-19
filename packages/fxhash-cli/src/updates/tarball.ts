import { extract } from "tar"
import { glob } from "glob"
import { execSync } from "child_process"
import { TMP_PATH } from "../constants"
import fs from "fs"
import path from "path"

export type ValidProjectSdkFiles = {
  packageJson: string
  files: string[]
}

export async function readFilesFromPackageTarball(
  packageName: string,
  filesToRead: string[]
): Promise<ValidProjectSdkFiles> {
  if (!fs.existsSync(TMP_PATH)) {
    fs.mkdirSync(TMP_PATH, { recursive: true })
  }
  const tarball = execSync(`npm pack ${packageName}`, {
    cwd: TMP_PATH,
    stdio: [null, null, null],
  })
    .toString()
    .trim()
  const baseName = path.basename(tarball).replace(/\.[^.]+$/, "")
  const tarballPath = path.join(TMP_PATH, tarball)
  const extractionPath = path.join(TMP_PATH, baseName)
  if (!fs.existsSync(extractionPath)) {
    fs.mkdirSync(extractionPath, { recursive: true })
  }
  await extract({
    file: tarballPath,
    cwd: extractionPath,
  })
  const packagePath = path.join(extractionPath, "package")
  const files = await glob(filesToRead, {
    cwd: packagePath,
  })
  return {
    packageJson: path.join(packagePath, "package.json"),
    files: files.map(file => path.resolve(packagePath, file)),
  }
}
