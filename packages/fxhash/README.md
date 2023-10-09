# fxhash cli alias

This package works as an alias for the `@fxhash/cli`, so that it can be called via `npx fxhash`

## Prerequisits

- `node >= 18.18.0`
- `npm >= 9.8.1`

## Usage

```
npx fxhash <command> [args]
```

You can run all commands via `npx` if you don't want to install the `@fxhash/cli` package manually.


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

`--portStudio` The port fxlens is served on. Default: `3300`  
`--portProject` The port the project is served on. Default: `3301`  
`--srcPath` The path to the source of the project. This is just relevant for ejected projects that actually have a nested structure. Default: `/src` 


### `$ fxhash update [options]`

Will update the whole fxhash environment. It will download the latest version of fxlens and the fxhash-snippet. Optionally you can inject the latest snippet into your html file.

#### Options

`--inject` Inject the latest snippet into the html file. Default: `false`

### `$ fxhash eject`

`--srcPath` The path to eject the code into. If you set a custom path here you also must specify this path to the other commands.

Will eject your project into a nested struture. It will copy all your code into a `srcPath` (Default: `/src`) and create a `package.json` file in the root of your project. This will allow you to configure any custom tooling you like while still being able to use the `@fxhash/cli` in your ejected project.

### `$ fxhash add <package@version>`

`--list` Lists all existing libraries that can be imported
`--inject` Will also inject a <script /> tag into your projects html entry point pointing to the downloaded library

Install an existing libaries. Beside being a convenience feature. This ensure that you are reusing existing libraries from the onchfs, which reduces the costs of storing your project on-chain 😎.

## Configuration with .env 

The CLI accepts a `.env` file in the root folder. The `.env` file allows you to configure all options of the CLI an store them for your project, e.g.

```
PORT_PROJECT=3301
PORT_STUDIO=3300
SRC_PATH=/src
MINIFY=false
```

> ⚠️  Note: Arguments passed to the command will always override the variables set in the `.env` file

