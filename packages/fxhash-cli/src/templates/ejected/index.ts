import { render } from "ejs"
import { readFileSync } from "fs"
import { format } from "prettier"
import {
  HTML_ENTRY_FILE_NAME,
  JS_ENTRY_FILE_NAME,
  SDK_FILE_NAME,
} from "../../constants"
import { baseHtmlTemplate } from "../baseHtml"
import { TemplateFactoryResponse } from "../types"
import { packageJson } from "./packageJson"

export async function ejectedTemplate({
  name = "ejected",
}): Promise<TemplateFactoryResponse> {
  const html = render(baseHtmlTemplate, {
    name,
    snippet: `<script src="./${SDK_FILE_NAME}.js"></script>`,
    head: `<link rel="stylesheet" href="./styles.css">`,
    entry: `<script src="./${JS_ENTRY_FILE_NAME}.js"></script>`,
  })
  const pHtml = format(html, { parser: "html" })
  const pkgJson = JSON.stringify({ ...packageJson, name }, null, 2)
  const sdkPath = require.resolve("@fxhash/sdk")
  const sdkContent = readFileSync(sdkPath, "utf-8")
  return {
    name,
    folders: ["src"],
    files: [
      [`src/${HTML_ENTRY_FILE_NAME}.html`, pHtml],
      ["src/styles.css", ""],
      ["package.json", pkgJson],
      [`${SDK_FILE_NAME}.js`, sdkContent],
    ],
    staticFiles: [
      [`src/${JS_ENTRY_FILE_NAME}.js`, "static/examples/params.js"],
      [".gitignore", "static/.gitignore"],
      ["LICENSE", "static/LICENSE"],
    ],
  }
}
