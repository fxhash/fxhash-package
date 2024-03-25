# @fxhash/config

This contains all variables used within all modules of fx(package)

## Installation

```
pnpm add @fxhash/config
```

## Usage

For you application you usually want to use the config like this:

```ts
import { config } from "@fxhash/config"
```

This singleton will expose variables for testnet/mainnet based on the `FXHASH_ENV` .env variable.

- Set `FXHASH_ENV=dev` to expose the config for testnet/dev environments
- Set `FXHASH_ENV=prd` or `FXHASH_ENV=production` to expose the config for mainnet/production environments

> Note: If the `@fxhash/config` package is used on the client side you also have to set the `NEXT_PUBLIC_FXHASH_ENV` or `REACT_APP_FXHASH_ENV` environment variable.

### Local development

Additional to the testnet and mainnet specific configuration there is the 3rd option for `local` development. This option is designed to be used within the fxhash monorepository. You can use it by setting the `FXHASH_ENV=local` environment variable. Since all services are dockerised there is an additional `localDocker` configuration. This configuration is automatically used when the `@fxhash/config` package is used inside a docker container and the `FXHASH_ENV` is set to `local`. The `localDocker` configuration basically just replaces all "localhost" urls with "host.docker.internal".

- Set `FXHASH_ENV=local` to expose the config for local development within the fxhash monorepository
