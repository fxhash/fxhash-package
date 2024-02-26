import type { CommandModule } from "yargs"
import { simpleTemplate } from "../../templates/simple/index"
import { writeProjectToDisk } from "../../templates/writer"
import { logger } from "../../utils/logger"
import { ejectedTemplate } from "../../templates/ejected/index"
import { chooseFromPrompt, prompt } from "../../utils/prompts"

const TEMPLATE_CHOICES = {
  "simple (recommended)": simpleTemplate,
  ejected: ejectedTemplate,
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

    const template = await chooseFromPrompt(TEMPLATE_CHOICES, {
      title: "Available project templates:",
      description:
        "Select a project template (use arrow keys, press Enter, or Ctrl+C to exit)",
    })

    try {
      await writeProjectToDisk({
        name,
        template: TEMPLATE_CHOICES[template],
      })

      logger.success("New fx(hash) project created successfully! ♥‿♥")
    } catch (error: any) {
      logger.error(error.message)
    }
  },
}
