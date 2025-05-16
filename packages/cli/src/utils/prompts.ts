import { createInterface, clearScreenDown, moveCursor } from "readline"
//@ts-ignore
import keypress from "keypress"
import chalk from "chalk"
import { logger } from "./logger.js"

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

interface ChooseFromPromptOptions {
  title: string
  description: string
  hideIndex?: boolean
}

export async function chooseFromPrompt(
  choices: Record<string, any>,
  options: ChooseFromPromptOptions
): Promise<string> {
  return new Promise<string>(resolve => {
    const templateChoices = Object.keys(choices)
    let selectedIndex = 0

    function clearChoices() {
      clearScreenDown(process.stdout)
      moveCursor(process.stdout, -1, -1 * (2 + templateChoices.length))
    }

    function printChoices() {
      logger.log(options.title)
      templateChoices.forEach((choice, index) => {
        const num = !options.hideIndex ? `${index + 1}. ` : ""
        if (index === selectedIndex) {
          logger.log(chalk.cyan(`> ${num}${choice}`)) // Highlight the selected choice
        } else {
          logger.log(`${num}${choice}     `)
        }
      })
      logger.log(chalk.dim(options.description))
    }

    printChoices()

    keypress(process.stdin)

    process.stdin.on("keypress", function (_, key) {
      if (key && key.name === "up") {
        clearChoices()
        selectedIndex =
          (selectedIndex - 1 + templateChoices.length) % templateChoices.length
        printChoices()
      } else if (key && key.name === "down") {
        clearChoices()
        selectedIndex = (selectedIndex + 1) % templateChoices.length
        printChoices()
      } else if (key && key.name === "return") {
        process.stdin.pause()
        resolve(templateChoices[selectedIndex])
      }
    })

    process.stdin.setRawMode(true)
    process.stdin.resume()

    process.stdin.on("data", function (key) {
      if (key[0] === 3) {
        // Handle Ctrl+C (ETX)
        process.exit()
      }
    })
  })
}

const YESNO_CHOICES: Record<string, boolean> = {
  no: false,
  yes: true,
}
const YESNO_OPTIONS_DEFAULT: ChooseFromPromptOptions = {
  title: "Are you sure",
  description: "The change can't be reversed.",
}

export async function yesno(options = YESNO_OPTIONS_DEFAULT): Promise<boolean> {
  const choice = await chooseFromPrompt(YESNO_CHOICES, options)
  return YESNO_CHOICES[choice]
}
