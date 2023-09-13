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
    head: `<link rel="stylesheet" href="./styles.css">`,
    entry: `<script src="./index.js"></script>`,
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
      ["index.js", "static/examples/params.js"],
      ["LICENSE", "static/LICENSE"],
    ],
  }
}
