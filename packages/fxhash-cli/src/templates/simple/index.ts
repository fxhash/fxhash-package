import { baseHtmlTemplate } from "templates/baseHtml"
import { snippet_v2 } from "@fxhash/fxhash-snippet"
import { render } from "ejs"
import { TemplateFactoryResponse } from "templates/types"
import { format } from "prettier"

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
      ["project/public/index.html", pHtml],
      ["project/public/styles.css", ""],
    ],
    staticFiles: [
      ["project/src/index.js", "static/examples/params.js"],
      ["project/public/LICENSE", "static/LICENSE"],
    ],
    folders: ["project", "project/public", "project/src"],
  }
}
