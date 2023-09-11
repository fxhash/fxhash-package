import { baseHtmlTemplate } from "templates/baseHtml"
import { snippet_v2 } from "@fxhash/fxhash-snippet"
import { render } from "ejs"
import { TemplateFactoryResponse } from "templates/types"
import { format } from "prettier"
import { STATIC_PATH } from "constants"

export function simpleTemplate(): TemplateFactoryResponse {
  const name = "simple"
  const html = render(baseHtmlTemplate, {
    name,
    snippet: snippet_v2,
    head: `<link rel="stylesheet" href="./style.css">`,
    entry: `<script src="./index.js"></script>`,
  })
  const pHtml = format(html, { parser: "html" })
  return {
    name,
    files: [
      ["index.html", pHtml],
      ["styles.css", ""],
    ],
    staticFiles: [
      ["index.js", "static/examples/params.js"],
      ["LICENSE", "static/LICENSE"],
    ],
  }
}
