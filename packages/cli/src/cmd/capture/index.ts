import type { CommandModule } from "yargs"
import { existsSync, readFileSync, writeFileSync } from "fs"
import path, { isAbsolute } from "path"
import chalk from "chalk"
import { devConfig } from "@fxhash/config"
import { CaptureTriggerMode, CaptureMode, fetchExtract, DEFAULT_CAPTURE_SETTINGS } from "../../capture/index.js"
import { getRandomFxhash, getRandomTezosAddress } from "../../capture/math.js"
import { urlWithHashAndParams } from "../../capture/url.js"
import { CWD_PATH } from "../../constants.js"
import { logger } from "../../utils/logger.js"

export const commandCapture: CommandModule = {
  command: "capture",
  describe: "Capture a snapshot of your project.",
  builder: yargs =>
    yargs
      .option("zip", {
        type: "string",
        default: "upload.zip",
        describe: "The path to the zip file to create the capture.",
      })
      .option("hash", {
        type: "string",
        default: getRandomFxhash(),
        describe: "Hash you want to use for the capture",
      })
      .option("minter", {
        type: "string",
        default: getRandomTezosAddress,
        describe: "Minter address you want to use for the capture",
      })
      .option("iteration", {
        type: "number",
        default: 1,
        describe: "Iteration number you want to use for the capture",
      })
      .option("inputBytes", {
        type: "string",
        default: null,
        describe: "Inputbytes you want to use for the capture",
      })
      .option("x", {
        type: "number",
        default: 800,
        describe: "The width in pixels. Capped at 2560",
      })
      .option("y", {
        type: "number",
        default: 800,
        describe: "The height in pixels. Capped at 2560",
      })
      .option("trigger", {
        type: "string",
        default: "DELAY",
        describe: "The trigger mode. Either DELAY or FN_TRIGGER",
      })
      .option("delay", {
        type: "number",
        default: 3000,
        describe: "The delay in ms for the trigger mode DELAY",
      })
      .option("selector", {
        type: "string",
        default: null,
        describe: "The id of the canvas element to capture",
      }),
  handler: async yargs => {
    const zipFileArg = yargs.zip as string
    const hashArg = yargs.hash as string
    const minterArg = yargs.minter as string
    const iterationArg = yargs.iteration as number
    const inputBytesArg = yargs.inputBytes as string
    const xArg = yargs.x as number
    const yArg = yargs.y as number
    const triggerArg = yargs.trigger as CaptureTriggerMode
    const delayArg = yargs.delay as number
    const selectorArg = yargs.selector as string
    if (Object.keys(CaptureTriggerMode).every(mode => mode !== triggerArg)) {
      throw new Error(
        `Argument 'trigger' must be either DELAY or FN_TRIGGER. Got: ${triggerArg}`
      )
    }

    if ((xArg || yArg) && selectorArg) {
      logger.errorExit(
        "Cannot specify viewport dimensions and a canvas selector at the same time. Please choose one or the other."
      )
    }
    const mode = selectorArg ? CaptureMode.CANVAS : CaptureMode.VIEWPORT

    try {
      let zipPath = zipFileArg
      if (!isAbsolute(zipPath)) {
        zipPath = path.join(CWD_PATH, zipPath)
      }
      if (!existsSync(zipPath)) {
        logger.errorExit(
          `Could not find ${zipFileArg}. Maybe you forget to create the bundle of your project?`
        )
      }

      console.log(chalk.dim("Start capture project"))
      const uploadZip = readFileSync(zipPath)
      const buffer = Buffer.from(uploadZip)

      const formData = new FormData()
      formData.append("file", new Blob([buffer]))

      const response = await fetch(`${devConfig.apis.fsEmulator}/upload`, {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      const previewResponse = await logger.step(
        "Capturing screenshot of project",
        async () =>
          await fetchExtract({
            ...DEFAULT_CAPTURE_SETTINGS,
            mode,
            triggerMode: triggerArg,
            delay: delayArg,
            resX: Math.min(xArg, 2560),
            resY: Math.min(yArg, 2560),
            canvasSelector: selectorArg,
            cid: urlWithHashAndParams(
              data.projectCid,
              {
                fxhash: hashArg,
                fxiteration: iterationArg,
                fxminter: minterArg,
                fxparams: inputBytesArg,
                fxParamsAsQueryParams: false,
              },
              cid => cid
            ),
          }),
        async () => {
          logger.clear()
          logger.success("Screenshot captured")
        }
      )
      const preview = await (previewResponse as any).json()
      const imgResponse = await fetch(preview.capture)
      const imgBuffer = await imgResponse.arrayBuffer()
      const imageName = `capture-${new Date().getTime()}.jpg`
      const imagePath = path.join(CWD_PATH, imageName)
      writeFileSync(imagePath, Buffer.from(imgBuffer))
      console.log(chalk.dim(`${imagePath} saved!`))
    } catch (err) {
      logger.error("Error trying to capture project")
      logger.errorExit(err as Error)
    }
  },
}
