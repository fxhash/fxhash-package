import { latest } from "@fxhash/fxhash-snippet"
import { baseHtmlTemplate } from "templates/baseHtml"
import { render } from "ejs"
import { TemplateFactoryResponse, TemplateUserConfig } from "templates/types"
import { format } from "prettier"
import { packageJson } from "./packageJson"

export function webpackTemplate({ name = "webpack" }): TemplateFactoryResponse {
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
    folders: ["project", "project/public", "project/src", "lib"],
    files: [
      ["project/public/index.html", pHtml],
      ["project/public/styles.css", ""],
      ["package.json", pkgJson],
    ],
    staticFiles: [
      ["project/src/index.js", "static/examples/params.js"],
      ["lib", "static/webpack/lib"],
      [".gitignore", "static/webpack/.gitignore"],
      ["LICENSE", "static/LICENSE"],
    ],
  }
}
