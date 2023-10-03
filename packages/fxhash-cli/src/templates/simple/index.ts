import { render } from "ejs"
import { format } from "prettier"
import { readFileSync } from "fs"
import { JS_ENTRY_FILE_NAME } from "../../constants"
import { baseHtmlTemplate } from "../baseHtml"
import { TemplateFactoryResponse } from "../types"

export async function simpleTemplate(): Promise<TemplateFactoryResponse> {
  const name = "simple"
  const html = render(baseHtmlTemplate, {
    name,
    snippet: `<script src="./fxhash.js"></script>`,
    head: `<link rel="stylesheet" href="./styles.css">`,
    entry: `<script src="./${JS_ENTRY_FILE_NAME}.js"></script>`,
  })
  const pHtml = format(html, { parser: "html" })
  const sdkPath = require.resolve("@fxhash/sdk")
  const sdkContent = readFileSync(sdkPath, "utf-8")
  return {
    name,
    folders: [],
    files: [
      ["index.html", pHtml],
      ["styles.css", ""],
      ["fxhash.js", sdkContent],
    ],
    staticFiles: [
      [`${JS_ENTRY_FILE_NAME}.js`, "static/examples/params.js"],
      ["LICENSE", "static/LICENSE"],
    ],
  }
}
