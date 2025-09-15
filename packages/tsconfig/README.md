# @fxhash/tsconfig

This package contains tsconfigs used with the @fxhash organisation tuned for different contexts.

## Installation

```sh
pnpm add -D -E @fxhash/tsconfig
```

## Configs

All configs can be imported via `@fxhash/tsconfig/<config-name>` or `@fxhash/tsconfig/<alias>`. Additionally there are aliases available to import the configs.

- `tsconfig.base.json` use for universal (client + backend) projects
  - alias: `@fxhash/tsconfig/base`
- `tsconfig.node.json` use for backend only projects
  - alias: `@fxhash/tsconfig/node`
- `tsconfig.react.json` use for react / dom projects
  - alias: `@fxhash/tsconfig/react` and `@fxhash/tsconfig/dom`
