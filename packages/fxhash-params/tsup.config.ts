import { defineConfig } from "tsup"
import { sassPlugin, postcssModules } from "esbuild-sass-plugin"

export default defineConfig({
  entry: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
  outDir: "dist",
  format: ["cjs", "esm"],
  splitting: true,
  sourcemap: true,
  clean: true,
  dts: true,
  bundle: true,
  esbuildPlugins: [
    sassPlugin({
      transform: postcssModules({}),
    }) as any,
  ],
})
