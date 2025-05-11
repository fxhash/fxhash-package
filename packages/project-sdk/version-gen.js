#!/usr/bin/env node

const fs = require("fs")

const content = `export const version = '${process.env.npm_package_version}';\n`
fs.writeFileSync("./src/version.ts", content)
