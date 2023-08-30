import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/**/*.ts"],
  outDir: "dist",
  format: ["cjs", "esm"],
  splitting: true,
  sourcemap: true,
  clean: true,
  dts: true,
  bundle: false,
})
