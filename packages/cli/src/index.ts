#!/usr/bin/env node

import yargs from "yargs"
import { commands } from "./cmd/index.js"

export default yargs(process.argv.slice(2))
  .scriptName("fxhash")
  .usage("Usage: $0 <command> [options]")
  .command(commands)
  .demandCommand(1, "You need to provide one command")
  .help().argv
