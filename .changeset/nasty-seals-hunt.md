---
"@fxhash/params": patch
"@fxhash/project-sdk": patch
"@fxhash/cli": patch
"fxhash": patch
---

- Fix `fxhash create` with ejected template
- Fix `fxhash build --minify` would bundle 3rd party code, e.g. fxhash.js
- Fix `@fxhash/project-sdk` wouldn't provide snippet version to definitions
- Export `@fxhash/project-sdk` as `fxhash.js`
- Include dist folder for `@fxhash/project-sdk`
