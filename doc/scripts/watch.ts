import { PACKAGES } from "./manifest"
import path from "path"
import fs from "fs"
import chalk from "chalk"
import { PKGS_OUTPUT_PATH, generatePackage } from "./lib"

let logged = false
function log(txt: string) {
  if (!logged) {
    txt = "\n" + txt
    logged = true
  }
  console.log(txt)
}

/**
 * This script watches for changes made to all the packages which are generated
 * and generates a package when a file is saved, to improve the writing
 * experience and avoid generating the whole doc on each package doc change.
 */
;(async () => {
  for (const PACKAGE of PACKAGES) {
    const pkgRootPath = path.join("..", "packages", PACKAGE)
    const pkgOutputPath = path.join(PKGS_OUTPUT_PATH, PACKAGE)
    const pkgDocPath = path.join(pkgRootPath, "doc")

    fs.watch(
      pkgDocPath,
      {
        recursive: true,
      },
      (_, filename) => {
        // cleanup the package output folder
        if (fs.existsSync(pkgOutputPath)) {
          fs.rmSync(pkgOutputPath, { recursive: true, force: true })
        }
        const time = new Date().toLocaleTimeString()
        log(
          `${chalk.dim(time)} ${chalk.cyan.bold("[fxhash doc]")} ${chalk.green(`updated ${PACKAGE}`)} ${chalk.dim(filename)}`
        )
        generatePackage(PACKAGE)
      }
    )
  }
})()
