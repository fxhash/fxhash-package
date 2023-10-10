import type { CommandModule } from "yargs"
import { CWD_PATH } from "../../constants"
import { existsSync, readFileSync, writeFileSync } from "fs"
import path, { isAbsolute } from "path"
import { DEFAULT_CAPTURE_SETTINGS, fetchExtract } from "../../capture/index"
import { urlWithHashAndParams } from "../../capture/url"
import { getRandomFxhash, getRandomTezosAddress } from "../../capture/math"
import { logger } from "../../utils/logger"
import chalk from "chalk"

// TODO: use config
const fsEmulator = "https://fs-emulator.fxhash-dev.xyz"

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
      }),
  handler: async yargs => {
    const zipFileArg = yargs.zip as string
    const hashArg = yargs.hash as string
    const minterArg = yargs.minter as string
    const iterationArg = yargs.iteration as number
    const inputBytesArg = yargs.inputBytes as string
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

      const response = await fetch(`${fsEmulator}/upload`, {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      const previewResponse = await logger.step(
        "Capturing screenshot of project",
        async () =>
          await fetchExtract({
            ...DEFAULT_CAPTURE_SETTINGS,
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
      const preview = await previewResponse.json()
      const imgResponse = await fetch(preview.capture)
      const imgBuffer = await imgResponse.arrayBuffer()
      const imageName = `capture-${new Date().getTime()}.jpg`
      const imagePath = path.join(CWD_PATH, imageName)
      writeFileSync(imagePath, Buffer.from(imgBuffer))
      console.log(chalk.dim(`${imagePath} saved!`))
    } catch (err) {
      logger.error("Error trying to capture project")
      logger.errorExit(err)
    }
  },
}
