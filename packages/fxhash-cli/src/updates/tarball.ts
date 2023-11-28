import { extract } from "tar"
import { glob } from "glob"
import { execSync } from "child_process"
import fs from "fs"
import path from "path"
import { ValidProjectSdkFiles } from "../validate/index"
import { getTmpPath } from "../constants"

export async function readFilesFromPackageTarball(
  packageName: string,
  filesToRead: string[]
): Promise<ValidProjectSdkFiles> {
  try {
    const tmpPath = getTmpPath()
    const tarball = execSync(`npm pack ${packageName}`, {
      cwd: tmpPath,
      stdio: [null, null, null],
    })
      .toString()
      .trim()
    const baseName = path.basename(tarball).replace(/\.[^.]+$/, "")
    const tarballPath = path.join(tmpPath, tarball)
    const extractionPath = path.join(tmpPath, baseName)
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
  } catch (e) {
    console.error(e)
    return null
  }
}
