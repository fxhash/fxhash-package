# @fxhash/project-sdk

The `@fxhash/project-sdk` is the library to create generatives artworks on fx(hash).

This packages is intended to be used in the browser and therefore exposes a IIFE (Immediately Invoked Function Expression) that exposes the `$fx` API on the window.


## API

The `window.$fx` exposes the following API.

```
{
  hash: String, // a random 64 characters hexadecimal string. This particular variable will be hardcoded with a static hash when someone mints a token from your GT
  rand: () => Number, // a PRNG function seeded with the hash, that generates deterministic PRN between 0 and 1
  minter: String, // The string of the wallet address of the minter injected into the iteration
  randminter: () => Number, // a PRNG function seeded with the minter address that generates deterministic PRN between 0 and 1
  preview: () => void, // trigger for capture module
  isPreview: Boolean, // is TRUE when capture module is running the project
  params: (definitions) => void, // sets your projects fx(params) definitions
  getParam: (id: String) => any, // get transformed fx(params) value by id
  getParams: () => any, // get all transformed fx(params) values
  getRawParam: (id: String) => any, // get raw fx(params) value by id
  getRawParams: () => any, // get all raw fx(params) values
  getDefinitions: () => any, // get all fx(params) definitions
  features: (features) => void, // sets your projects features
  getFeature: (id: String) => any, // get feature by id
  getFeatures: () => any, // get all features
  stringifyParams: (definitions) => string, // JSON.stringify that can handle bigint
}
```
## fx(params)

The following fx(params) types are available. All types share the same attributes but have different options available to e.g. constrain your parameters to your needs.

The available fx(params) types are:

- `number`: `Number` aka float64
- `bigint`: `BigInt` aka int64
- `boolean`: `boolean`
- `color`: Color in 8-hexdigit and abbreviations
- `string`: String with max 64 characters
- `select`: Selection of provided options options

_The index.js of this boilerplate quickly demonstrates a meaningfull configuration for each fx(params) type_.

### Base Attributes

All param share a few base attributes and have each param has a type specific options attribute to adjust the param to your needs.

```typescript
{
  id: string, // required
  name?: string, // optional, if not defined name == id
  type: "number" | "bigint" | "boolean" | "color" | "string" | "select", // required
  default?: string | number | bigint | boolean, // optional (see Randomization)
  options: TYPE_SPECIFIC_OPTIONS, // different options per type (see below)
}
```

### Randomization

The fxhash snippet generates a random value for each parameter. The random value generation happens within the defined constrains of the parameter definition. Each parameter has the possibility to define a `default` value. Setting the default will prevent the parameter to be initialised with a random value. This can be relevant during the development stage but is also relevant to consider for the final minting flow, when the user will define the final parameter configuration for the uniquely minted token.

### Type specific options

#### `number`

All options are optional.

Options:

```typescript
{
  min?: number,
  max?: number,
  step?: number,
}
```

#### `bigint`

All options are optional.

Options:

```typescript
{
  min?: number | bigint,
  max?: number | bigint,
}
```

#### `boolean`

No options.

Options:

```typescript
undefined;
```

#### `color`

No options.

Options:

```typescript
undefined;
```

#### `string`

All options are optional.

Options:

```typescript
{
  minLength?: number,
  maxLength?: number,
}
```

#### `select`

Options are required. They define the options of the select

Options:

```typescript
{
  options: string[],
}
```

### Transformation

For ease of usage the fx(params) are being transformed into their type specific representation.

#### `number`

[getFloat64](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getFloat64)

#### `bigint`

[getBigInt64](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getBigInt64)

#### `boolean`

_not transformed_

#### `string`

_not transformed_

#### `color`

```typescript
{
 hex: {
  rgb: '#ff0000',
  rgba: '#ff0000ff',
 },
 obj: {
  rgb: { r, g, b},
  rgba: { r, g, b, a },
 },
 arr: {
  rgb: [r,g,b],
  rgba: [r,g,b,a],
 },
}
```

The fx(snippet) exposes two different way to retrieve fx(params) values:

- `getParam` and `getParams` will return the transformed values as described above
- `getRawParam` and `getRawParams` will return the raw values after being serialized from the bytestring and without any transformation
