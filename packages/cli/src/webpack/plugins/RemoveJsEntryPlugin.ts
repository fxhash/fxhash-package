import HtmlWebpackPlugin from "html-webpack-plugin"
import { Compiler } from "webpack"
import { JSDOM } from "jsdom"
import path from "path"

interface RemoveJsEntryPluginOptions {
  jsEntryPath: string
  rootPath: string
}
export class RemoveJsEntryScriptPlugin {
  options: RemoveJsEntryPluginOptions
  constructor(options: RemoveJsEntryPluginOptions) {
    this.options = options
  }

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap("RemoveJsEntryScriptPlugin", compilation => {
      // @ts-ignore
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        "RemoveJsEntryScriptPlugin",
        // @ts-ignore
        (data, cb) => {
          // Create a DOM from the generated HTML
          const { window } = new JSDOM(data.html)

          // Get all script tags in the HTML
          const scriptTags = Array.from(
            window.document.querySelectorAll("script")
          )

          // Filter out script tags with files that do not exist locally
          scriptTags.forEach(scriptTag => {
            if (scriptTag.hasAttribute("src")) {
              const scriptSrc = scriptTag.getAttribute("src")
              const localScriptPath = path.resolve(
                this.options.rootPath,
                // @ts-ignore
                scriptSrc
              )
              if (localScriptPath === this.options.jsEntryPath) {
                scriptTag.remove()
              }
            }
          })

          // Update the HTML content with the modified DOM
          data.html = window.document.documentElement.outerHTML

          cb(null, data)
        }
      )
    })
  }
}
