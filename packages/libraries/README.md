# @fxhash/libraries

A repertoire of the libraries which are known to be available onchain using fxhash On-Chain File System.

## Folder structure

```txt
.
└── src/
    ├── libs/
    │   ├── lib_name/
    │   │   ├── version1.lib
    │   │   └── version2.lib
    │   └── lib_name2.js/
    │       ├── version1.lib
    │       └── version2.lib
    └── index.ts
```

The libraries are imported as text using a raw loader which targets `.lib` files. This ensures we don't mess up somes bytes and can use the raw files.
