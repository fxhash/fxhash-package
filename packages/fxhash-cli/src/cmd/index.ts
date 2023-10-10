import type { CommandModule } from "yargs"
import { commandDev } from "./dev/index"
import { commandCreate } from "./create/index"
import { commandUpdate } from "./update/index"
import { commandBuild } from "./build/index"
import { commandEject } from "./eject/index"
import { commandAdd } from "./add/index"
import { commandCapture } from "./capture/index"

export const commands: CommandModule[] = [
  commandCreate,
  commandDev,
  commandUpdate,
  commandBuild,
  commandEject,
  commandAdd,
  commandCapture,
]
