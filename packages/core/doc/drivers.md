# Drivers

Drivers are utility modules which are used by different `@fxhash/core` components for handling side-effect operations independant of their implementation (persisting data, network calls, etc...).

`@fxhash/core` works with 3 kinds of drivers:

- [**GraphQL Wrapper**](#graphql-wrapper): Wraps a GraphQL client to alter its behaviour, notably for injecting credentials in the queries
- [**Storage Driver**](#storage-drivers): To store semi-persistent data (usually locally)
- [**Credentials Driver**](#credential-drivers): A driver which specifies how credentials should be stored, recovered, and more generally manipulated

::: info
The different `@fxhash/core` modules which need such drivers to work properly expect strict interfaces to be implemented. Any driver implementation supporting such interfaces can be passed, not only those provided by `@fxhash/core`. If you application has particular requirements you are free to implement your app-specific drivers.
:::

## GraphQL Wrapper

This GraphQL driver wraps a GraphQL client by providing interfaces to alter the http headers sent with every request. This is how `@fxhash/core` implements the authentication of queries using user crendentials. All the modules which require sending authenticated queries will require such a wrapper to be provided.

::: warning
It is highly recommended that a single GraphQL Wrapper instance is passed to core modules to ensure injection of crendentials in headers is spread across the app.
:::

In its current state, `@fxhash/core` provides an implementation of a wrapper around a [urql client](https://github.com/urql-graphql/urql). Under the hood, this module instanciates a GraphQL client using [**`@fxhash/gql-client`**](../../gql-client/) which provides some defaults based on the environment config.

```ts
const gql = new GraphqlWrapper()
```

::: info
We aim at improving this implementation in the future as right now the implementation expects a urql client, which is locking. Ideally there should be a in-between GraphQL interface with a library-agnostic abstraction.
:::

### References

- [**`IGraphqlWrapper`** interface](./reference/interfaces/IGraphqlWrapper)
- [**`GraphqlWrapper`** class](./reference/classes/GraphqlWrapper)

## Storage drivers

A storage driver provides an interface to store data on a storage, which is mainly meant for persisting user data locally.

There are 2 storage drivers implemented by this package:

### `localStorageDriver()`

A driver which uses the [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) API.

::: warning
If the `localStorage` API isn't available, it will throw at instanciation. This function shouldn't be called in a context when `localStorage` isn't available.
:::

```ts
const storage = localStorageDriver()
```

### `inMemoryStorageDriver()`

A driver which stores data in-memory. Data will be lost when application restarts.

```ts
const storage = inMemoryStorageDriver()
```

### Intanciate based on available APIs

This package also provides a `defaultStorageDriver()` function which either calls `localStorageDriver` or `inMemoryStorageDriver` based on the APIs available in the runtime. `localStorageDriver` is preferred.

::: info
This is the function called internally to instanciate a storage driver when none is provided.
:::

```ts
const storage = defaultStorageDriver()
```

### References

- [**`IStorageDriver`** interface](./reference/interfaces/IStorageDriver.md)
- [**`localStorageDriver()`**](./reference/functions/localStorageDriver.md)
- [**`inMemoryStorageDriver()`**](./reference/functions/inMemoryStorageDriver.md)
- [**`defaultStorageDriver()`**](./reference/functions/defaultStorageDriver.md)

## Credential drivers

A driver which implements how to manipulate credentials, called at various points of the authentication lifecycle.

This package provides 2 drivers for credentials: jwt and cookie. The cookie driver can only be used by applications hosted under `.fxhash.xyz` domains, as such for your use case you will want to use the `jwtCredentials`.

### `jwtCredentials()`

This driver implements:

- storage/retrieval of JWT tokens
- refresh JWT when expired
- injection of credentials in the GraphQL driver

```ts
const gql = new GraphqlWrapper()
const credentialsDriver = jwtCredentials(gql)
```

### `cookieCredentials()`

This driver doesn't do anything, as cookies returned by the fxhash API is http-only and is injected on every request.

```ts
const credentialsDriver = cookieCredentials()
```

::: warning
This strategy can only be used on `*.fxhash.xyz` domains as fxhash cookies are restricted to this domain. If an attempt to use `cookieCredentials()` on a non-compatible domain a warning will be issued by the function.
:::

### References

- [**`ICredentialsDriver`** interface](./reference/interfaces/ICredentialsDriver.md)
- [**`jwtCredentials()`**](./reference/functions/jwtCredentials.md)
- [**`cookieCredentials()`**](./reference/functions/cookieCredentials.md)
