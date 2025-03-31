import { defineConfig, type Options } from "tsup"
import unpluginIsolatedDecl from "unplugin-isolated-decl/esbuild"

export default defineConfig((options: Options) => ({
  esbuildPlugins: [unpluginIsolatedDecl()],
  entry: ["src/index.ts"],
  outDir: "dist",
  format: "esm",
  sourcemap: true,
  clean: !options.watch,
}))
