import { logger } from "./logger"
import { createInterface, clearScreenDown, moveCursor } from "readline"
import keypress from "keypress"
import chalk from "chalk"

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
        if (index === selectedIndex) {
          logger.log(chalk.cyan(`> ${index + 1}. ${choice}`)) // Highlight the selected choice
        } else {
          logger.log(`  ${index + 1}. ${choice}`)
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

function hideCursor() {
  process.stdout.write("\u001b[?25l")
}

function showCursor() {
  process.stdout.write("\u001b[?25h")
}
