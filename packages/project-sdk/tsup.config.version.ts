import { defineConfig } from "tsup"

export default defineConfig([
  {
    entry: {
      version: "src/version.ts",
    },
    outDir: "dist",
    format: ["esm"],
    dts: true,
    bundle: true,
    splitting: true,
    sourcemap: true,
  },
])
