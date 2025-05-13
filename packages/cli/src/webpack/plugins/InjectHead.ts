import { replaceSnippet } from "@fxhash/snippet"
import fs from "fs"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { format } from "prettier"
import { Compiler } from "webpack"
import { SNIPPET_PATH } from "../../constants.js"

export class InjectHead {
  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap("InjectHead", compilation => {
      // @ts-ignore
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        "InjectHead",
        async (data: any, callback: any) => {
          // load the snippet code from the file in lib
          const snippet = fs.readFileSync(SNIPPET_PATH, "utf-8")
          const newHtml = replaceSnippet(data.html, snippet)
          const pNewHtml = await format(newHtml, { parser: "html" })
          data.html = pNewHtml
          callback(null, data)
        }
      )
    })
  }
}
