import AdmZip from "adm-zip"
import chalk from "chalk"
import { rmSync } from "fs"
import { basename } from "path"
import { logger } from "../../utils/logger.js"

interface ZipperPluginOptions {
  zipPath: string
}

/**
 * The zipper plugin hooks to the end of compilation event, and it creates a ZIP file of
 * all the files within the ./dist folder into the ./dist-zipped folder to create a file
 * ready to be deployed on fxhash.
 * https://webpack.js.org/contribute/writing-a-plugin/
 */
export class ZipperPlugin {
  options: ZipperPluginOptions | undefined = undefined
  constructor(options: ZipperPluginOptions) {
    if (options) {
      this.options = options
    }
  }

  apply(compiler: any) {
    // Specify the event hook to attach to
    compiler.hooks.done.tapAsync("ZipperPlugin", (stats: any, callback: any) => {
      const zipPath = this.options?.zipPath
      if (!zipPath) throw new Error("No zipPath provided to ZipperPlugin")
      const outputPath = stats.compilation.outputOptions.path
      rmSync(zipPath, { force: true, recursive: true })
      const zip = new AdmZip()
      zip.addLocalFolder(outputPath)
      zip.toBuffer()
      zip.writeZip(zipPath)
      logger.log(chalk.dim(`${zipPath} created`))
      logger.log(
        `Upload the ${basename(zipPath)} on ${logger.url(
          "fxhash.xyz"
        )} to mint your project.`
      )
      rmSync(outputPath, { force: true, recursive: true })
      callback()
    })
  }
}
