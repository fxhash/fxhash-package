import chalk from "chalk"

const sep = "--------------------------------------"

// Create and display a loader in the console.
function logLoader(text = "", delay = 100) {
  let x = 0
  const chars = ["⠙", "⠘", "⠰", "⠴", "⠤", "⠦", "⠆", "⠃", "⠋", "⠉"]
  const interval = setInterval(() => {
    process.stdout?.write?.("\r" + chars[x++] + " " + text)
    x = x % chars.length
  }, delay)
  return {
    stop: noClearLine => {
      clearInterval(interval)
      if (!noClearLine) {
        process.stdout?.clearLine?.(null)
        process.stdout?.cursorTo?.(0)
      }
    },
  }
}

function logSuccess(message) {
  console.log(chalk.red.bold(`✅  ${chalk.green.bold(message)}`))
}

function logError(error, icon = true) {
  console.log(chalk.red.bold(`${icon ? "❌ " : ""}${error}`))
}

function exitError(error) {
  logError(error)
  process.exit(0)
}

const tag = text => chalk.bgWhite.black.bold(" " + text + " ")

/**
 * Generic-purpose logger for executing steps
 * Calling this function does not instanciate anything but instead returns a
 * list of functions which can be called to inform about the progress in a
 * styllistic fashion
 */
export function loggerFactory() {
  let loader = null,
    message = null

  const clear = () => {
    if (loader) loader.stop()
    loader = null
  }

  const start = name => {
    loader && loader.stop()
    message = name
    loader = logLoader(message)
  }

  const success = customMessage => {
    clear()
    logSuccess(customMessage || message)
  }

  const progress = message => {
    if (loader) loader.stop(true)
    loader = logLoader(message)
  }

  const error = errorMessage => {
    clear()
    logError(message ? `error on: ${message}` : "error")
    errorMessage && console.error(errorMessage)
  }

  const step = async (name, fn, onSuccess = success) => {
    start(name)
    try {
      const res = await fn()
      onSuccess?.(res)
      return res
    } catch (err) {
      error(err)
      throw err
    }
  }

  return {
    clear,
    startStep: start,
    step,
    success,
    successC: chalk.bold.green,
    progress,
    error,
    errorExit: exitError,
    log: msg => console.log(chalk.white(msg)),
    url: chalk.bold.blue,
  }
}

export const logger = loggerFactory()
