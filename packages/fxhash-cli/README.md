# `@fxhash/cli`

The fx(hash) CLI exposes all toolkit features through a single CLI. 

> The usage of the CLI is totally optional for publishing art on the fx(hash) platform. 
> The CLI is only provides a few tools that should help you in the development process.

## Usage

```
npx fxhash <command> [args]
```

You can run all commands via `npx` if you don't want to install the `@fxhash/cli` package manually.


## Installation

```
npm install @fxhash/cli
```

Will install the cli into your local environment making all commands accessible through script tags. Optionally you can install the cli with `-g` flag to make it globally available in your terminal.


## API


### `$ fxhash create`

Create a new project in a single step. The terminal will ask you to provide a name and you can choose one of the predefined templates.


### `fxhash build [options]`

Creates a bundled version the artwork. 

#### Options

`--srcPath` The path to the source of the project. Default: `/src`
`--noMinify` Disable minification when creating the bundle
`--noZip` Disable the zip file creation


### `$ fxhash dev [options]`

Starts a development environment for the artwork. Each time `fxhash dev` is run the environment will check for updates and will keep itself up-to-date.

#### Options

`--srcPath` The path to the source of the project. Default: `/src`
`--portStudio` The port fxlens is served on. Default: `3300` 
`--portProject` The port the project is served on. Default: `3301` 


### `$ fxhash update [options]`

Will update the whole fxhash environment. It will download the latest version of fxlens and the fxhash-snippet. Optionally you can inject the latest snippet into your html file.

#### Options

`--inject` Inject the latest snippet into the html file. Default: `false`
