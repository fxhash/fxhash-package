#!/usr/bin/env node

import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { commandUpdate } from "./cmd/update/index.js"

export default yargs(["update", ...hideBin(process.argv)])
  .scriptName("fxhash-update")
  .usage("Usage: $0 [options]")
  .command(commandUpdate)
  .help().argv
