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
    head: `<link rel="stylesheet" href="./style.css">`,
    entry: `<!-- WEBPACK will inject the bundle.js here -->`,
  })
  const pHtml = format(html, { parser: "html" })
  const pkgJson = JSON.stringify({ ...packageJson, name }, null, 2)
  return {
    name,
    folders: ["src", "src/public"],
    files: [
      ["src/public/index.html", pHtml],
      ["src/public/styles.css", ""],
      ["package.json", pkgJson],
    ],
    staticFiles: [
      ["src/index.js", "static/examples/params.js"],
      [".gitignore", "static/.gitignore"],
      ["LICENSE", "static/LICENSE"],
    ],
  }
}
