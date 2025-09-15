import fs from "node:fs"
import chalk from "chalk"
import { PACKAGES } from "./manifest"
import cliProgress from "cli-progress"
import { PKGS_OUTPUT_PATH, generatePackage } from "./lib"

async function main() {
  const progress = new cliProgress.SingleBar(
    {
      format:
        "progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} | Task: {task}",
    },
    cliProgress.Presets.shades_classic
  )
  progress.start(PACKAGES.length, 0, {
    task: "cleanup",
  })

  // cleanup the output folder
  if (fs.existsSync(PKGS_OUTPUT_PATH)) {
    fs.rmSync(PKGS_OUTPUT_PATH, { recursive: true, force: true })
  }

  // generate each package typedoc
  for (let i = 0; i < PACKAGES.length; i++) {
    const PACKAGE = PACKAGES[i]

    progress.update(i, {
      task: `generate @fxhash/${PACKAGE} doc`,
    })

    await generatePackage(PACKAGE)

    progress.update(i + 1)
  }
  progress.stop()
}

main().catch(err => {
  console.log("")
  console.log(chalk.bold.red("❌ Error when generating packages doc"))
  if (err?.message) console.log(err.message)
  else console.error(err)
  console.log("")
  console.log(err)
  process.exit(1)
})
