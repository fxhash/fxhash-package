import { latest } from "@fxhash/fxhash-snippet"
import { render } from "ejs"
import { format } from "prettier"
import { baseHtmlTemplate } from "../baseHtml"
import { TemplateFactoryResponse } from "../types"
import { packageJson } from "./packageJson"

export function ejectedTemplate({ name = "ejected" }): TemplateFactoryResponse {
  const html = render(baseHtmlTemplate, {
    name,
    snippet: latest,
    head: `<link rel="stylesheet" href="./styles.css">`,
    entry: `<script src="./index.js"></script>`,
  })
  const pHtml = format(html, { parser: "html" })
  const pkgJson = JSON.stringify({ ...packageJson, name }, null, 2)
  return {
    name,
    folders: ["src"],
    files: [
      ["src/index.html", pHtml],
      ["src/styles.css", ""],
      ["package.json", pkgJson],
    ],
    staticFiles: [
      ["src/index.js", "static/examples/params.js"],
      [".gitignore", "static/.gitignore"],
      ["LICENSE", "static/LICENSE"],
    ],
  }
}
