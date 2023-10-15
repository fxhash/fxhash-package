export const packageJson = {
  name: "fxhash-project",
  version: "1.0.0",
  description: "A generative artwork",
  license: "MIT",
  scripts: {
    postinstall: "fxhash update",
    update: "fxhash update --inject",
    start: "fxhash dev",
    build: "fxhash build",
  },
  devDependencies: {
    "@fxhash/cli": "1.0.0",
  },
}
