#!/usr/bin/env node

import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { commandCreate } from "./cmd/create/index.js"

export default yargs(["create", ...hideBin(process.argv)])
  .scriptName("fxhash-create")
  .usage("Usage: $0 [options]")
  .command(commandCreate)
  .help().argv
