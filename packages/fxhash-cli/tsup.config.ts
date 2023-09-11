import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["cjs"],
  splitting: true,
  sourcemap: true,
  clean: true,
  dts: true,
  bundle: true,
})
