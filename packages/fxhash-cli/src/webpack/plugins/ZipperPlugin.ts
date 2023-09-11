import path from "path"
import AdmZip from "adm-zip"
import { CWD_PATH } from "../../constants"

const defaultOptions = {
  outputPath: path.resolve(CWD_PATH, "dist-zipped/project.zip"),
}

/**
 * The zipper plugin hooks to the end of compilation event, and it creates a ZIP file of
 * all the files within the ./dist folder into the ./dist-zipped folder to create a file
 * ready to be deployed on fxhash.
 * https://webpack.js.org/contribute/writing-a-plugin/
 */
export class ZipperPlugin {
  options = null
  constructor(options = {}) {
    this.options = {
      ...defaultOptions,
      ...options,
    }
  }

  apply(compiler) {
    // Specify the event hook to attach to
    compiler.hooks.done.tapAsync("ZipperPlugin", (stats, callback) => {
      const outputPath = stats.compilation.outputOptions.path
      const zip = new AdmZip()
      zip.addLocalFolder(outputPath)
      zip.toBuffer()
      zip.writeZip(this.options.outputPath)
      callback()
    })
  }
}
