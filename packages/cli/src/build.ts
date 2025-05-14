#!/usr/bin/env node

import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { commandBuild } from "./cmd/build/index.js"

export default yargs(["build", ...hideBin(process.argv)])
  .scriptName("fxhash-build")
  .usage("Usage: $0 [options]")
  .command(commandBuild)
  .help().argv
