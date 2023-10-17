import { defineConfig } from "tsup"

export default defineConfig([
  {
    entry: {
      fxhash: "src/index.ts",
    },
    outExtension({ format }) {
      return {
        js: `.js`,
      }
    },
    outDir: "dist",
    format: ["iife"],
    platform: "browser",
    dts: true,
    splitting: true,
    sourcemap: true,
    clean: true,
    bundle: true,
  },
])
