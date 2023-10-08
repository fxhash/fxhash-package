#!/usr/bin/env node

import yargs from "yargs"
import { commands } from "./cmd"

export default yargs(process.argv.slice(2))
  .scriptName("@fxhash/cli")
  .usage("Usage: $0 <command> [options]")
  .command(commands)
  .demandCommand(1, "You need to provide one command")
  .help().argv
