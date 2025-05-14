import type { CommandModule } from "yargs"
import { commandAdd } from "./add/index.js"
import { commandBuild } from "./build/index.js"
import { commandCapture } from "./capture/index.js"
import { commandCreate } from "./create/index.js"
import { commandDev } from "./dev/index.js"
import { commandEject } from "./eject/index.js"
import { commandUpdate } from "./update/index.js"

export const commands: CommandModule[] = [
  commandCreate,
  commandDev,
  commandUpdate,
  commandBuild,
  commandEject,
  commandAdd,
  commandCapture,
]
