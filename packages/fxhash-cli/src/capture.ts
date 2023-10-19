#!/usr/bin/env node

import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { commandCapture } from "./cmd/capture/index"

export default yargs(["capture", ...hideBin(process.argv)])
  .scriptName("fxhash-add")
  .usage("Usage: $0 [options]")
  .command(commandCapture)
  .help().argv
