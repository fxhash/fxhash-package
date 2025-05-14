import { defineConfig, type Options } from "tsup"
import unpluginIsolatedDecl from "unplugin-isolated-decl/esbuild"

export default defineConfig((options: Options) => ({
  entry: ["src/**/*.{ts,tsx}"],
  outDir: "dist",
  format: "esm",
  jsx: "react",
  splitting: true,
  sourcemap: true,
  clean: !options.watch,
  esbuildPlugins: [unpluginIsolatedDecl()],
}))
