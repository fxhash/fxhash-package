import { render } from "ejs"
import { format } from "prettier"
import { readFileSync } from "fs"
import {
  SDK_FILE_NAME,
  JS_ENTRY_FILE_NAME,
  HTML_ENTRY_FILE_NAME,
} from "../../constants.js"
import { baseHtmlTemplate } from "../baseHtml.js"
import { TemplateFactoryResponse } from "../types.js"
import { createRequire } from "module"

export async function simpleTemplate(): Promise<TemplateFactoryResponse> {
  const name = "simple"
  const html = render(baseHtmlTemplate, {
    name,
    snippet: `<script src="./${SDK_FILE_NAME}.min.js"></script>`,
    head: `<link rel="stylesheet" href="./styles.css">`,
    entry: `<script src="./${JS_ENTRY_FILE_NAME}.js"></script>`,
  })
  const pHtml = await format(html, { parser: "html" })
  const require = createRequire(import.meta.url)
  const sdkPath = require.resolve("@fxhash/project-sdk")
  const sdkContent = readFileSync(sdkPath, "utf-8")
  return {
    name,
    folders: [],
    files: [
      [`${HTML_ENTRY_FILE_NAME}.html`, pHtml],
      ["styles.css", ""],
      [`${SDK_FILE_NAME}.min.js`, sdkContent],
    ],
    staticFiles: [
      [`${JS_ENTRY_FILE_NAME}.js`, "static/examples/params.js"],
      ["LICENSE", "static/LICENSE"],
    ],
  }
}
