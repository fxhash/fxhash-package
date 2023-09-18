import { defineConfig } from "tsup"

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    outDir: "dist",
    splitting: true,
    sourcemap: true,
    clean: true,
    dts: true,
    bundle: true,
  },
])
