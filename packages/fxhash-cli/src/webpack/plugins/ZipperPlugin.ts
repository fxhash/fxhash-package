import AdmZip from "adm-zip"
import { rmSync } from "fs"
import { logger } from "../../updates/logger"

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
  options = null
  constructor(options: ZipperPluginOptions) {
    this.options = options
  }

  apply(compiler) {
    // Specify the event hook to attach to
    compiler.hooks.done.tapAsync("ZipperPlugin", (stats, callback) => {
      const zipPath = this.options.zipPath
      const outputPath = stats.compilation.outputOptions.path
      rmSync(zipPath, { force: true, recursive: true })
      const zip = new AdmZip()
      zip.addLocalFolder(outputPath)
      zip.toBuffer()
      zip.writeZip(zipPath)
      logger.log(`${zipPath} created`)
      callback()
    })
  }
}
