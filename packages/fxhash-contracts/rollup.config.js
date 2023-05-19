import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "rollup-plugin-typescript2"
import postCSS from "rollup-plugin-postcss"
import peerDeps from "rollup-plugin-peer-deps-external"
import json from '@rollup/plugin-json';
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

export const getFiles = (entry, extensions = [], excludeExtensions = []) => {
  let fileNames = []
  const dirs = fs.readdirSync(entry)

  dirs.forEach((dir) => {
    const path = `${entry}/${dir}`

    if (fs.lstatSync(path).isDirectory()) {
      fileNames = [
        ...fileNames,
        ...getFiles(path, extensions, excludeExtensions),
      ]

      return
    }

    if (
      !excludeExtensions.some((exclude) => dir.endsWith(exclude)) &&
      extensions.some((ext) => dir.endsWith(ext))
    ) {
      fileNames.push(path)
    }
  })

  return fileNames
}

const extensions = ['.js', '.ts', '.jsx', '.tsx'];
const excludes = ['.d.ts', '.test.js', '.test.ts', '.test.jsx', '.test.tsx']

const files = getFiles('./src', extensions, excludes).reduce((acc, f) => {
  const p = path.relative(
    'src',
    f.slice(0, f.length - path.extname(f).length)
  );
  console.log(f, p)
  acc[p] = fileURLToPath(new URL(f, import.meta.url))
  return acc
}, {})

export default {
  input: files,
  output: {
    dir: "dist",
    format: "esm",
    preserveModules: true,
    preserveModulesRoot: "src",
    sourcemap: true,
  },
  external: [
    "@taquito/beacon-wallet",
    "@taquito/taquito",
    "next"
  ],
  plugins: [
    peerDeps(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    postCSS({
      plugins: [require("autoprefixer")],
    }),
    json(),
  ],
}
