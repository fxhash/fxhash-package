# fxhash-config

`@fxhash/config` contains all variables used within all modules of fx(package)

For you application you usually want to use the config like this:

```ts
import { config } from "@fxhash/config"
```

This singleton will expose variables for testnet/mainnet based on the `FXHASH_ENV` .env variable.

- Set `FXHASH_ENV=dev` to expose the config for testnet/dev environments
- Set `FXHASH_ENV=prd` or `FXHASH_ENV=production` to expose the config for mainnet/production environments
