#!/usr/bin/env node

import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { commandEject } from "./cmd/eject/index.js"

export default yargs(["eject", ...hideBin(process.argv)])
  .scriptName("fxhash-eject")
  .usage("Usage: $0 [options]")
  .command(commandEject)
  .help().argv
