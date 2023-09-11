import type { CommandModule } from "yargs"
import { createInterface } from "readline"
import { simpleTemplate } from "../../templates/simple/index"
import { writeProjectToDisk } from "../../templates/writer"
import { logger } from "../../updates/logger"

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
  logger.log("Available project templates:")
  templateChoices.forEach((choice, index) => {
    logger.log(`${index + 1}. ${choice}`)
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
    logger.error("Invalid template choice.")
    return chooseTemplate()
  }

  return templateChoices[selectedIndex - 1]
}

export const commandCreate: CommandModule = {
  command: "create",
  describe: "Create a new fx(hash) project",
  handler: async () => {
    const name = await prompt("Project name: ")
    if (!/^([\w\d\s#-])+$/.test(name)) {
      logger.error(
        "Project name may only include letters, numbers, spaces, underscores, hashes, and dashes"
      )
      return
    }

    // const template = await chooseTemplate()

    try {
      writeProjectToDisk({
        name,
        template: simpleTemplate,
      })

      logger.success("New fx(hash) project created successfully!")
    } catch (error: any) {
      logger.error(error.message)
    }
  },
}
