import { logger } from "./logger"
import { createInterface } from "readline"

export async function prompt(question: string): Promise<string> {
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

export async function chooseFromPrompt(
  choices: Record<string, any>
): Promise<string> {
  const templateChoices = Object.keys(choices)
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
    return chooseFromPrompt(choices)
  }

  return templateChoices[selectedIndex - 1]
}
