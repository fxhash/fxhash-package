import HtmlWebpackPlugin from "html-webpack-plugin"
import { Compiler } from "webpack"
import { JSDOM } from "jsdom"
import fs from "fs"
import { format } from "prettier"
import path from "path"
import { CWD_PATH } from "../../constants"

export class RemoveEntryJsPlugin {
  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap("RemoveNotFoundScripts", compilation => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        "RemoveNotFoundScripts",
        (data, cb) => {
          // Create a DOM from the generated HTML
          const { window } = new JSDOM(data.html)

          // Get all script tags in the HTML
          const scriptTags = Array.from(
            window.document.querySelectorAll("script")
          )

          // Function to check if a file exists locally
          const fileExists = (filePath: string) => {
            try {
              return fs.existsSync(filePath)
            } catch (err) {
              return false
            }
          }

          // Filter out script tags with files that do not exist locally
          scriptTags.forEach(scriptTag => {
            if (scriptTag.hasAttribute("src")) {
              const scriptSrc = scriptTag.getAttribute("src")
              const localScriptPath = path.resolve(CWD_PATH, scriptSrc)
              console.log(localScriptPath)
              if (!fileExists(localScriptPath)) {
                scriptTag.remove()
              }
            }
          })

          // Update the HTML content with the modified DOM
          data.html = format(window.document.documentElement.outerHTML)

          cb(null, data)
        }
      )
    })
  }
}
