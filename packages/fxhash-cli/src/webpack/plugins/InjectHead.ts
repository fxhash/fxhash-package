import fs from "fs"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { SNIPPET_PATH } from "../../constants"

export class InjectHead {
  options = null
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.compilation.tap("InjectHead", compilation => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        "InjectHead",
        (data, callback) => {
          // load the snippet code from the file in lib
          const snippet = fs.readFileSync(SNIPPET_PATH, "utf-8")

          // find the position of the </head> characters
          const match = /<head>/.exec(data.html)
          if (!match) {
            throw new Error(
              'Missing "</head>" in your HTML. fxlens needs it to inject the fxhash snippet.'
            )
          }
          data.html = [
            data.html.slice(0, match.index + 6),
            "\n",
            '<script id="fxhash-snippet">\n',
            snippet,
            "</script>",
            data.html.slice(match.index + 6),
          ].join("")
          callback(null, data)
        }
      )
    })
  }
}
