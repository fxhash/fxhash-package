# Fxhash packages documentation

This application handles the documentation of the fxhash packages. It's using [vitepress](https://vitepress.dev/) for the SSG.

## Overview

This app aggregates the documentation of all the packages. We use this methodology because it allows keeping a separation of concerns between the packages (each package handles its implementation & its documentation). Moreover, this also provides compatibility with github where each documentation can be browser from the github website. Each package has a `/doc` directory at its root, which is copied into the `/docs` folder of this application using scripts.

There are a few rules to mention:

- [`./scripts/manifest.ts`](./scripts/manifest.ts) defines the list of packages aggregated by this doc
- typedoc is used to generate the types of all the packages; such types will be available in the sidebar with a `reference` folder in the package sidebar folder
- all of these packages must have a `/doc` folder at their root, with a `/doc/README.md` file in it which will act as the documentation index
- such `README.md` file can have a content table, which will be removed from the file when moved into this doc and will be used to generate the package sidebar on this application: this ensures there is a table of contents on github as well

```md
# `@fxhash/some-package`

Here a description

## Contents

- [link A](./page.md)
- [link B](./pageB.md)
- folder
  - [page inside folder](./link-to-other-page.md)
- [folder with link](./folder2/README.md)
  - [inside A](./folders2/insideA.md)
  - [inside B](./folders2/insideB.md)

## The doc

Then comes the package doc...
```

## Commands

Generate the documentation by aggregating all the packages

```sh
$ pnpm generate
```

Run the development environment (watches for changes in the packages to generate the package doc & runs `vitepress dev`)

```sh
$ pnpm dev
```

Build (first calls `pnpm generate` and then `vitepress build`)

```sh
$ pnpm build
```

## Important notes

If the watcher is running and you update the table of contents of a package documentation, it will not reflect automatically on the doc website. You can save the [`./docs/.vitepress/config.mts`](./docs/.vitepress/config.mts) file to propagate the changes.
