# `fxhash`

This package works as an alias for the `@fxhash/cli`, so that it can be called via `npx fxhash`

> The usage of the CLI is totally optional for publishing art on the fx(hash) platform.
> The CLI only provides tools that should help you in the development process.

## Prerequisits

- `node >= 18.0.0`
- `npm >= 9.0.0`

## Usage

You can run all commands via `npx`.

```
npx fxhash <command> [args]
```

Alternatively you can install the package with `-g` flag to make it globally available in your terminal.

```
npm install -g fxhash
```

## API

### `$ fxhash create`

Create a new project in a single step. The terminal will ask you to provide a name and you can choose one of the predefined templates.

### `$ fxhash build [options]`

Creates a bundled version the artwork. The output file will be called `upload.zip` and can be uploaded as it is on fxhash.xyz.

#### Options

`--minify` Enable minification when creating the bundle. Default: `false`  
`--noZip` Disable the zip file creation. Default: `false`  
`--srcPath` The path to the source of the project. This is just relevant for ejected projects that actually have a nested structure. Default: `/src`

### `$ fxhash dev [options]`

Starts a development environment for the artwork. Each time `fxhash dev` is run the environment will check for updates and will keep itself up-to-date.

#### Options

`--portProject` The port the project is served on. Default: `3301`  
`--srcPath` The path to the source of the project. This is just relevant for ejected projects that actually have a nested structure. Default: `/src`
`--noUpdate` Prevent from running the update services. Keep what you got in case you want to work with a specific version of the project-sdk and fxlens. Default: `false`

### `$ fxhash update [options]`

Will update the whole fxhash environment. It will download the latest version of fxlens and the fxhash-snippet. Optionally you can inject the latest snippet into your html file.

#### Options

`--srcPath` The path to the source of the project. This is just relevant for ejected projects that actually have a nested structure. Default: `/src`
`--sdkVersion` Use a specific version of the `@fxhash/project-sdk` Default: `latest`

### `$ fxhash eject`

Will eject your project into a nested struture. It will copy all your code into a `srcPath` (Default: `/src`) and create a `package.json` file in the root of your project. This will allow you to configure any custom tooling you like while still being able to use the `@fxhash/cli` in your ejected project.

#### Options

`--srcPath` The path to eject the code into. If you set a custom path here you also must specify this path to the other commands.

### `$ fxhash add <package@version>`

Install an existing libaries. Beside being a convenience feature. This ensure that you are reusing existing libraries from the onchfs, which reduces the costs of storing your project on-chain 😎.

#### Options

`--list` Lists all existing libraries that can be imported  
`--inject` Will also inject a `<script />` tag into your projects html entry point pointing to the downloaded library

### `$ fxhash capture [args]`

With the capture command you can test your bundled project agains the fx(hash) capture module. For params token you currently **must** provide the inputBytes yourself. You can copy the inputBytes from the url when you are running the `fxhash dev` command.

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

## Configuration with .env

The CLI accepts a `.env` file in the root folder. The `.env` file allows you to configure all options of the CLI an store them for your project, e.g.

```
PORT_PROJECT=3301
PORT_STUDIO=3300
SRC_PATH=/src
MINIFY=false
```

> ⚠️ Note: Arguments passed to the command will always override the variables set in the `.env` file
