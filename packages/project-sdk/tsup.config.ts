import { defineConfig } from "tsup"

export default defineConfig([
  {
    entry: ["src/index.ts"],
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
