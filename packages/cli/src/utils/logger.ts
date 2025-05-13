import chalk from "chalk";

// Create and display a loader in the console.
function logLoader(text: string = "", delay: number = 100) {
  let x = 0;
  const chars = ["⠙", "⠘", "⠰", "⠴", "⠤", "⠦", "⠆", "⠃", "⠋", "⠉"];
  const interval = setInterval(() => {
    process.stdout?.write?.("\r" + chars[x++] + " " + text);
    x = x % chars.length;
  }, delay);
  return {
    stop: (noClearLine?: boolean) => {
      clearInterval(interval);
      if (!noClearLine) {
        process.stdout?.clearLine?.(0);
        process.stdout?.cursorTo?.(0);
      }
    },
  };
}

function logSuccess(message: string | number): void {
  console.log(chalk.red.bold(`✅  ${chalk.green.bold(message)}`));
}

function logError(error: string | Error, icon: boolean = true): void {
  const errorMessage = error instanceof Error ? error.message : error;
  console.log(chalk.red.bold(`${icon ? "❌ " : ""}${errorMessage}`));
}

function exitError(error: string | Error): never {
  logError(error);
  process.exit(0);
}

interface LoaderInstance {
  stop: (noClearLine?: boolean) => void;
}

interface Logger {
  clear: () => void;
  startStep: (name: string) => void;
  step: <T>(name: string, fn: () => Promise<T>, onSuccess?: (result: T) => void) => Promise<T>;
  success: (customMessage?: string) => void;
  successC: typeof chalk.bold.green;
  progress: (message: string) => void;
  error: (errorMessage?: string | Error) => void;
  errorExit: (error: string | Error) => never;
  log: (msg: string) => void;
  url: typeof chalk.bold.blue;
}

/**
 * Generic-purpose logger for executing steps
 * Calling this function does not instantiate anything but instead returns a
 * list of functions which can be called to inform about the progress in a
 * stylistic fashion
 */
export function loggerFactory(): Logger {
  let loader: LoaderInstance | null = null,
    message: string | null = null;

  const clear = (): void => {
    if (loader) loader.stop();
    loader = null;
  };

  const start = (name: string): void => {
    loader?.stop();
    message = name;
    loader = logLoader(message);
  };

  const success = (customMessage?: string): void => {
    clear();
    logSuccess(customMessage || message || "");
  };

  const progress = (progressMessage: string): void => {
    if (loader) loader.stop(true);
    loader = logLoader(progressMessage);
  };

  const error = (errorMessage?: string | Error): void => {
    clear();
    logError(message ? `error on: ${message}` : "error");
    console.error(errorMessage);
  };

  const step = async <T>(
    name: string,
    fn: () => Promise<T>,
    onSuccess?: (result: T) => void
  ): Promise<T> => {
    start(name);
    try {
      const res = await fn();
      if (onSuccess) {
        onSuccess(res);
      } else {
        // Default behavior when no onSuccess is provided
        success();
      }
      return res;
    } catch (err) {
      error(err instanceof Error ? err : String(err));
      throw err;
    }
  };

  return {
    clear,
    startStep: start,
    step,
    success,
    successC: chalk.bold.green,
    progress,
    error,
    errorExit: exitError,
    log: (msg: string) => console.log(chalk.white(msg)),
    url: chalk.bold.blue,
  };
}

export const logger = loggerFactory();
