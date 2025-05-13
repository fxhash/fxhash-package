import { type CommandModule } from "yargs"
import { ejectedTemplate } from "../../templates/ejected/index.js"
import { simpleTemplate } from "../../templates/simple/index.js"
import { TemplateFactoryResponse } from "../../templates/types.js"
import { writeProjectToDisk } from "../../templates/writer.js"
import { logger } from "../../utils/logger.js"
import { chooseFromPrompt, prompt } from "../../utils/prompts.js"

const TEMPLATE_CHOICES: Record<
  string,
  (options: { name?: string }) => Promise<TemplateFactoryResponse>
> = {
  "simple (recommended)": simpleTemplate,
  ejected: ejectedTemplate,
}

export const commandCreate: CommandModule = {
  command: "create",
  describe: "Create a new fx(hash) project",
  handler: async () => {
    const name = await prompt("Project name: ")
    if (!name) throw new Error("Project name is required")
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
