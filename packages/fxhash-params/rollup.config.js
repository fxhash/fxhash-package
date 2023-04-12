import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "rollup-plugin-typescript2"
import postCSS from "rollup-plugin-postcss"
import peerDeps from "rollup-plugin-peer-deps-external"
import fs from "fs"

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

export default {
  input: [
    ...getFiles('./src', extensions, ['.d.ts']),
  ],
  output: {
    dir: "dist",
    format: "esm",
    preserveModules: true,
    preserveModulesRoot: "src",
    sourcemap: true,
  },
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
  ],
}
