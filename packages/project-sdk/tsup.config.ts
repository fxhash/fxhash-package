import { defineConfig } from "tsup"

export default defineConfig([
  {
    entry: {
      fxhash: "src/index.ts",
    },
    outExtension() {
      return {
        js: `.min.js`,
      }
    },
    outDir: "dist",
    format: ["iife"],
    platform: "browser",
    minify: true,
    dts: true,
    splitting: true,
    sourcemap: false,
    clean: true,
    bundle: true,
  },
])
