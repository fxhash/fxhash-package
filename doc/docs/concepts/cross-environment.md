# Cross-environment

There are many kind of modern applications built with javascript, which may run in various environments (server-side, client-side, edge runtime...). We designed the SDK such that all the APIs exposed by `@fxhash/sdk` can run on any environment.

However, some specific features are not meant to be instanciated in some environment (for instance, browser-extension wallets cannot run properly in a nodejs env) — if you attempt to use such a feature in the wrong environment, the SDK will warn you during the development, letting you adjust your implementation.
