#!/usr/bin/env node

import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { commandDev } from "./cmd/dev/index.js"

export default yargs(["dev", ...hideBin(process.argv)])
  .scriptName("fxhash-dev")
  .usage("Usage: $0 [options]")
  .command(commandDev)
  .help().argv
