#!/usr/bin/env node

import { latest, replaceSnippet } from "@fxhash/fxhash-snippet"
import { readFileSync, writeFileSync } from "fs"
import path from "path"
import { format } from "prettier"

async function main() {
  const i = (await import("inquirer")).default
  i.registerPrompt("fuzzypath", require("inquirer-fuzzy-path"))

  const { htmlFile } = await i.prompt<{ htmlFile: string }>([
    {
      name: "htmlFile",
      type: "fuzzypath",
      itemType: "file",
      excludeFilter: (filePath: string) =>
        !path.basename(filePath).includes(".html"),
      message: "Relative path to your project's html file:",
    },
  ])
  try {
    const htmlFilePath = path.join(process.cwd(), htmlFile)

    const indexHtml = readFileSync(htmlFilePath)
    const html = indexHtml.toString()
    const newHtml = replaceSnippet(html, latest)
    const pNewHtml = format(newHtml, { parser: "html" })
    console.log(pNewHtml)
    writeFileSync(htmlFilePath, pNewHtml)

    console.log("Your project was updated with the latest fxhash-snippet!")
  } catch (error: any) {
    console.error(error.message)
  }
}

main()
