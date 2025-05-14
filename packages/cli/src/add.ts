#!/usr/bin/env node

import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { commandAdd } from "./cmd/add/index.js"

export default yargs(["add", ...hideBin(process.argv)])
  .scriptName("fxhash-add")
  .usage("Usage: $0 [options]")
  .command(commandAdd)
  .help().argv
