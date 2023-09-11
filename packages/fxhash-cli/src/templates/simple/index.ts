import { latest } from "@fxhash/fxhash-snippet"
import { render } from "ejs"
import { format } from "prettier"
import { baseHtmlTemplate } from "../baseHtml"
import { TemplateFactoryResponse } from "../types"

export function simpleTemplate(): TemplateFactoryResponse {
  const name = "simple"
  const html = render(baseHtmlTemplate, {
    name,
    snippet: latest,
    head: `<link rel="stylesheet" href="./style.css">`,
    entry: `<script src="./index.js"></script>`,
  })
  const pHtml = format(html, { parser: "html" })
  return {
    name,
    folders: ["src", "src/public"],
    files: [
      ["src/public/index.html", pHtml],
      ["src/public/styles.css", ""],
    ],
    staticFiles: [
      ["src/index.js", "static/examples/params.js"],
      ["LICENSE", "static/LICENSE"],
    ],
  }
}
