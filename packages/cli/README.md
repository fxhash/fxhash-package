# `@fxhash/cli`

The fx(hash) CLI exposes all toolkit features through a single CLI.

> The usage of the CLI is totally optional for publishing art on the fx(hash) platform.
> The CLI only provides tools that should help you in the development process.

## Prerequisits

- `node >= 18.0.0`
- `npm >= 9.0.0`

## Installation

```
npm install -g @fxhash/cli
```

Will install the package into your local environment making all commands accessible through script tags. Optionally you can install the package with `-g` flag to make it globally available in your terminal.

## API

### `$ fxhash-create`

Create a new project in a single step. The terminal will ask you to provide a name and you can choose one of the predefined templates.

### `$ fxhash-build [options]`

Creates a bundled version the artwork. The output file will be called `upload.zip` and can be uploaded as it is on fxhash.xyz.

#### Options

`--minify` Enable minification when creating the bundle. Default: `false`  
`--noZip` Disable the zip file creation. Default: `false`  
`--srcPath` The path to the source of the project. This is just relevant for ejected projects that actually have a nested structure. Default: `/src`

### `$ fxhash-dev [options]`

Starts a development environment for the artwork. Each time `fxhash dev` is run the environment will check for updates and will keep itself up-to-date.

#### Options

`--portProject` The port the project is served on. Default: `3301`  
`--srcPath` The path to the source of the project. This is just relevant for ejected projects that actually have a nested structure. Default: `/src`  
`--noLens` Only serve the project. Don't start fxlens.

### `$ fxhash-update [options]`

Will update the whole fxhash environment. It will download the latest version of fx(lens) and will also update the `@fxhash/project-sdk` inside of your project.

#### Options

`--srcPath` The path to the source of the project. This is just relevant for ejected projects that actually have a nested structure. Default: `/src`

### `$ fxhash-eject`

Will eject your project into a nested struture. It will copy all your code into a `srcPath` (Default: `/src`) and create a `package.json` file in the root of your project. This will allow you to configure any custom tooling you like while still being able to use the `@fxhash/cli` in your ejected project.

#### Options

`--srcPath` The path to eject the code into. If you set a custom path here you also must specify this path to the other commands.

### `$ fxhash-add <package@version>`

Install an existing libaries. Beside being a convenience feature. This ensure that you are reusing existing libraries from the onchfs, which reduces the costs of storing your project on-chain 😎.

#### Options

`--list` Lists all existing libraries that can be imported  
`--inject` Will also inject a `<script />` tag into your projects html entry point pointing to the downloaded library

### `$ fxhash-capture [args]`

With the capture command you can test your bundled project agains the fx(hash) capture module. For params token you currently **must** provide the inputBytes yourself. You can copy the inputBytes from the url when you are running the `fxhash-dev` command.

#### Options

`--zip` The path (absolute or relative) to the project's zip file you want to create the capture of. Default: `upload.zip`  
`--hash` The hash that is injected when the capture is taken. Default: random value  
`--minter` The minter address that is injected when the capture is taken. Default: random value  
`--iteration` The iteration number that is injeted when the capture is taken. Default: 1  
`--inputBytes` The inputBytes that are injected when the capture is taken. Default: `undefined`  
`--x` The width in pixels. Capped at 2560. Default: `800`  
`--y` The height in pixels. Capped at 2550. Default: `800`  
`--trigger` The trigger mode. Either DELAY or FN_TRIGGER. Default: `delay`  
`--delay` The delay in ms for the trigger mode DELAY. Default: `3000`  
`--selector` The id of the canvas element to capture.

### `$ @fxhash/cli <command> [args]`

The package also exposes a main entry-point where you can access each command respectively. Please note that you only write the actually command name when using the main entry point. So instead of `$ fxhash-dev` you can use `$ @fxhash/cli dev`.

Beside there is also the npx alias you can use with `npx fxhash` or install globally too. For more information see this [link](https://github.com/fxhash/fxhash-package/tree/main/packages/fxhash).

## Configuration with .env

The CLI accepts a `.env` file in the root folder. The `.env` file allows you to configure all options of the CLI an store them for your project, e.g.

```
PORT_PROJECT=3301
PORT_STUDIO=3300
SRC_PATH=/src
MINIFY=false
```

> ⚠️ Note: Arguments passed to the command will always override the variables set in the `.env` file
