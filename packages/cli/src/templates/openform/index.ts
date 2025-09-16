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

export async function openFormTemplate(): Promise<TemplateFactoryResponse> {
  const name = "open-form"
  const html = render(baseHtmlTemplate, {
    name,
    snippet: `<script src="./${SDK_FILE_NAME}.min.js"></script>`,
    head: `
    <style name="style">
      body,
      html {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      #app {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 10px;
      }
    </style>
`,
    entry: `<div id="app"></div><script src="./${JS_ENTRY_FILE_NAME}.js"></script>`,
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
      [`${SDK_FILE_NAME}.min.js`, sdkContent],
    ],
    staticFiles: [
      [`${JS_ENTRY_FILE_NAME}.js`, "static/examples/openform.js"],
      ["LICENSE", "static/LICENSE"],
    ],
  }
}
