import type { CommandModule } from "yargs"
import { commandDev } from "./dev/index"
import { commandCreate } from "./create/index"
import { commandUpdate } from "./update/index"
import { commandBuild } from "./build/index"

export const commands: CommandModule[] = [
  commandCreate,
  commandDev,
  commandUpdate,
  commandBuild,
]
