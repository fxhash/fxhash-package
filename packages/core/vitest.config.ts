import { defineConfig } from "vitest/config"
import { resolve } from "path"

export default defineConfig({
  test: {
    globals: true,
    environment: "node", // or 'jsdom' if you're testing DOM elements
    // If you need to ignore transforming some dependencies:
    exclude: ["dist", "node_modules"],
    alias: {
      "@": resolve(__dirname, "src"), // Adjust the path as needed
      // dedupe @airgap/beacon-sdk
      // I almost have no idea why it needs `cjs` but this is how it works
      // taken from: https://github.com/ecadlabs/taquito/issues/882#issuecomment-999753605
      "@airgap/beacon-sdk": resolve(
        __dirname,
        `./node_modules/@airgap/beacon-sdk/dist/cjs/index.js`
      ),
    },
    setupFiles: ["./test/mock/globals.ts", "./test/mock/handlers.ts"],
  },
})
