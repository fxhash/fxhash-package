import type { CommandModule } from "yargs"
import { createInterface } from "readline"
import {simpleTemplate} from "templates/simple"
import {webpackTemplate} from "templates/webpack"
import {writeProjectToDisk} from "templates/writer"

const TEMPLATE_CHOICES = {
  simple: simpleTemplate,
}

async function prompt(question: string): Promise<string> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise<string>(resolve => {
    rl.question(question, answer => {
      rl.close()
      resolve(answer)
    })
  })
}

async function chooseTemplate(): Promise<string> {
  const templateChoices = Object.keys(TEMPLATE_CHOICES)

  console.log("Available project templates:")
  templateChoices.forEach((choice, index) => {
    console.log(`${index + 1}. ${choice}`)
  })

  const choiceIndex = await prompt(
    "Select a project template (enter the number): "
  )
  const selectedIndex = parseInt(choiceIndex, 10)

  if (
    isNaN(selectedIndex) ||
    selectedIndex < 1 ||
    selectedIndex > templateChoices.length
  ) {
    console.error("Invalid template choice.")
    return chooseTemplate()
  }

  return templateChoices[selectedIndex - 1]
}

export const commandCreate: CommandModule = {
  command: "create",
  describe:
    "Create a new fx(hash) project",
  handler: async () => {
    const name = await prompt("Project name: ")
    if (!/^([\w\d\s#-])+$/.test(name)) {
      console.error(
        "Project name may only include letters, numbers, spaces, underscores, hashes, and dashes"
      )
      return
    }

    // const template = await chooseTemplate()

    try {
      writeProjectToDisk({
        name,
        template: TEMPLATE_CHOICES[0],
      })

      console.log("New fx(hash) project created successfully!")
    } catch (error: any) {
      console.error(error.message)
    }
  },
}
