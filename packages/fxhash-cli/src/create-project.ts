#!/usr/bin/env node

import { snippet_v1, snippet_v2 } from "@fxhash/fxhash-snippet"
import { simpleTemplate } from "templates/simple/index"
import { webpackTemplate } from "templates/webpack/index"
import { writeProjectToDisk } from "templates/writer"

const TEMPLATE_CHOICES = {
  simple: simpleTemplate,
  webpack: webpackTemplate,
}

async function main() {
  const i = (await import("inquirer")).default

  const { template, name } = await i.prompt<{ template: string; name: string }>(
    [
      {
        name: "name",
        type: "input",
        message: "Project name:",
        default: "new-project",
        validate: function (input) {
          if (/^([\w\d\s#-])+$/.test(input)) return true
          else
            return "Project name may only include letters, numbers, spaces, underscores, hashes and dashes"
        },
      },
      {
        name: "template",
        type: "list",
        message: "What project template would you like to generate?",
        choices: Object.keys(TEMPLATE_CHOICES),
      },
    ]
  )

  writeProjectToDisk({
    name,
    template: TEMPLATE_CHOICES[template],
  })
}

main()
