import { render } from "ejs"
import { readFileSync } from "fs"
import { format } from "prettier"
import {
  HTML_ENTRY_FILE_NAME,
  JS_ENTRY_FILE_NAME,
  SDK_FILE_NAME,
  WEBPACK_CONFIG_DEV_FILE_NAME,
  WEBPACK_CONFIG_PROD_FILE_NAME,
} from "../../constants"
import { baseHtmlTemplate } from "../baseHtml"
import { baseWebpackTemplate } from "../baseWebpackConfig"
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
  const sdkPath = require.resolve("@fxhash/project-sdk")
  const sdkContent = readFileSync(sdkPath, "utf-8")

  const pWebpackDevConfig = format(
    render(baseWebpackTemplate, {
      mode: `"dev"`,
    }),
    { parser: "babel" }
  )
  const pWebpackProdConfig = format(
    render(baseWebpackTemplate, {
      mode: `"prd"`,
    }),
    { parser: "babel" }
  )

  return {
    name,
    folders: ["src"],
    files: [
      [`src/${HTML_ENTRY_FILE_NAME}.html`, pHtml],
      ["src/styles.css", ""],
      ["package.json", pkgJson],
      [`src/${SDK_FILE_NAME}.js`, sdkContent],
      [`${WEBPACK_CONFIG_DEV_FILE_NAME}.js`, pWebpackDevConfig],
      [`${WEBPACK_CONFIG_PROD_FILE_NAME}.js`, pWebpackProdConfig],
    ],
    staticFiles: [
      [`src/${JS_ENTRY_FILE_NAME}.js`, "static/examples/params.js"],
      ["LICENSE", "static/LICENSE"],
    ],
  }
}
