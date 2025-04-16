import { defineConfig, type Options } from "tsup"
import unpluginIsolatedDecl from "unplugin-isolated-decl/esbuild"

export default defineConfig((options: Options) => ({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: "esm",
  sourcemap: true,
  clean: !options.watch,
  esbuildPlugins: [unpluginIsolatedDecl()],
}))
