import { latest } from "@fxhash/fxhash-snippet"
import { render } from "ejs"
import { format } from "prettier"
import { JS_ENTRY_FILE_NAME } from "../../constants"
import { baseHtmlTemplate } from "../baseHtml"
import { TemplateFactoryResponse } from "../types"

export function simpleTemplate(): TemplateFactoryResponse {
  const name = "simple"
  const html = render(baseHtmlTemplate, {
    name,
    snippet: latest,
    head: `<link rel="stylesheet" href="./styles.css">`,
    entry: `<script src="./${JS_ENTRY_FILE_NAME}.js"></script>`,
  })
  const pHtml = format(html, { parser: "html" })
  return {
    name,
    folders: [],
    files: [
      ["index.html", pHtml],
      ["styles.css", ""],
    ],
    staticFiles: [
      [`${JS_ENTRY_FILE_NAME}.js`, "static/examples/params.js"],
      ["LICENSE", "static/LICENSE"],
    ],
  }
}
