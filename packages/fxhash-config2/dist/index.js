// src/index.ts
var tezosTestnetContracts = {
  allowed_mint: "KT1QwfqMUDRYVyxo9KhunY5YCx9qQ9LWcswr",
  allowed_mint_issuer: "KT1WDByFKQmgVynxSr2rzdijs5aSs7mo7eBM",
  allowed_mint_issuer_v3: "KT1S3UqrLgMpVivNWWmBUnkPCaSFHDJ4HYvb",
  allowed_mint_v3: "KT1HUE2A6CHNw4NZZBWjJyG38nysWWfusagu",
  articles: "KT1HV8NXUCKWC1tWNHSD8LPPiKPshQuXvb8r",
  collaboration_factory: "KT1WFXts7jwxpD9uGDKzyqTUTFaG222xmjoZ",
  consumable_database: "KT1FP9y1PJpJkXhdJCgYZhVbj9UBpxnA57Bx",
  cycles: "KT1BJBcvtgZM2Kf4rUapmp4AhXtWCmznxd6F",
  gentk_v1: "KT1ExHjELnDuat9io3HkDcrBhHmek7h8EVXG",
  gentk_v1_data: "KT1SquPSN9oiMUWHG9coKRJAwz8Afe4c6izT",
  gentk_v2: "KT1NkZho1yRkDdQnN4Mz93sDYyY2pPrEHTNs",
  gentk_v3: "KT1TtVAyjh4Ahdm8sLZwFnL7tqoLf59XrK2h",
  issuer_tickets: "KT19PBsvmB2CwFqXftzb5gNJfxrEDFdSxGKZ",
  issuer_v0: "KT1PyfrDD85RxUWz8dMHoC92MxdPzecSQ5t9",
  issuer_v1: "KT1QwWVZogqPZZtGSVxGpLkEWar7LFvAsMdd",
  issuer_v2: "KT1Sy7X6TubmZ39G8CHVrUcxjc3jiF68P8oB",
  issuer_v3: "KT1DfymMp3qD5Pd5ujPjp7UsQbppY9yY1Hbf",
  marketplace_v1: "KT1DbivePcuUzCp5RaAQWxPSLV9G2Ys4faUR",
  marketplace_v2: "KT1HFYtf4vNCr4xRDZxLKc5asUdCsPUTTW9R",
  marketplace_v3: "KT1J6rt4d9U785DZWYEPvQ2fR1e71gxP42Lj",
  moderation_articles: "KT1Qg78fa81Xyjh65yNqUgVucubHUyq6VmgL",
  moderation_team: "KT1RsfyWzHs1EEWMzFLmKnJTQwPqRzsnF3Dp",
  moderation_token: "KT1PokFR36CcXKh3jUnjncabcuPWm5BMiqjt",
  moderation_token_v3: "KT1C1J38YR6eDvRBDEDaypptCFda9aH7FRbJ",
  moderation_user: "KT1Q3s7mYpscCnwsyndrVZg9WqBCmw99n37g",
  pricing_dutch_auction: "KT1BqikbUisiBBd9WvPiqnTwLY8Pm68p2Aua",
  pricing_dutch_auction_v3: "KT1QCboxZ28SqsfyZWTDrkSpZzU6xjZXBsFb",
  pricing_fixed: "KT1PAsf9Zc9FGJA9iLE1Ab2vPkMDsh4hyZVi",
  pricing_fixed_v3: "KT1Mqyy5JPknNzNJtgF93SHpFHv4VcYrNZry",
  randomizer: "KT1QmdsrJWJgK3VXid8q7D4sPipVoc9jh12x",
  token_moderation: "KT1BHfPDMRp2q48ZkmmnK7TRzQRdFnp6XVKq",
  treasury: "KT1MbDbRhZPs5TzZEXkT142ePoccFHfohBoo",
  user_moderation: "KT1LmZjoitx2itnB1qCbHMrT3V64RbuSPf3a",
  user_register: "KT1XaikgmBDQANBvkFqyFhSpgAZJAXpiDFGE"
};
var tezosTestnetApis = {
  tzkt: "https://api.ghostnet.tzkt.io/v1/",
  tzktWebsite: "https://ghostnet.tzkt.io/",
  rpcs: [
    "https://ghostnet.ecadinfra.com",
    "https://ghostnet.smartpy.io",
    "https://ghostnet.tezos.marigold.dev/"
  ]
};
var tezosMainnetContracts = {
  allowed_mint: "KT1VDQwskdfHkSbA9W6CSEnxnh1u1XU8K8Gu",
  allowed_mint_issuer: "KT1Djz5ix2yEGmV7PMq3GYq17TvMMkd1anT2",
  allowed_mint_issuer_v3: "KT1LJ4R4xoEWMgTjrGrdHJAeHLYFaB4RsoVK",
  allowed_mint_v3: "KT1KgEjxqfRCMwtCGifT6fDPwC35RptTUEvE",
  articles: "KT1GtbuswcNMGhHF2TSuH1Yfaqn16do8Qtva",
  collaboration_factory: "KT1JrUPSCt1r2MB2J7Lk2KwiWSYr3Mr414ck",
  consumable_database: "KT1Wm3zZqRd6JBbZWuatKYZCmnqUMy2Y79BL",
  cycles: "KT1BgD9SPfysnMz3vkfm6ZEaGFKCVcE5ay91",
  gentk_v1: "KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE",
  gentk_v1_data: "KT1WRpPyXHSCbTfDQFWVXbMpxxvf7Y7KChxc",
  gentk_v2: "KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi",
  gentk_v3: "KT1EfsNuqwLAWDd3o4pvfUx1CAh5GMdTrRvr",
  issuer_tickets: "KT19etLCjCCzTLFFAxsxLFsVYMRPetr2bTD5",
  issuer_v0: "KT1AEVuykWeuuFX7QkEAMNtffzwhe1Z98hJS",
  issuer_v1: "KT1XCoGnfupWk7Sp8536EfrxcP73LmT68Nyr",
  issuer_v2: "KT1BJC12dG17CVvPKJ1VYaNnaT5mzfnUTwXv",
  issuer_v3: "KT1Xpmp15KfqoePNW9HczFmqaGNHwadV2a3b",
  marketplace_v1: "KT1Xo5B7PNBAeynZPmca4bRh6LQow4og1Zb9",
  marketplace_v2: "KT1GbyoDi7H1sfXmimXpptZJuCdHMh66WS9u",
  marketplace_v3: "KT1M1NyU9X4usEimt2f3kDaijZnDMNBu42Ja",
  moderation_articles: "KT1A36z7nG4zPDbhjyrzhYf9SCn5ipPZeRMQ",
  moderation_team: "KT1FvGQcPxzuJkJsdWFQiGkueSNT5mqpFDrf",
  moderation_token: "KT18tPu7uXy9PJ97i3qCLsr7an4X6sQ5qxU7",
  moderation_token_v3: "KT1UBWXN1KxTh4eurrCTCH7aEjqdrM3HjP6R",
  moderation_user: "KT1Wn2kkKmdbyLWBiLXWCkE7fKj1LsLKar2A",
  pricing_dutch_auction: "KT1EzLrXRCXij42pKfbZPn48PuxrnVki1aYY",
  pricing_dutch_auction_v3: "KT1MFgHKorMWXeVL6qrpgjZmemirafppSg9q",
  pricing_fixed: "KT1FHzHxuMaNLYG8LdniY45M6RCfkF3AoXFh",
  pricing_fixed_v3: "KT1V24J6FVuKPU3xy6gVF6wJ3zdRXBheQhaV",
  randomizer: "KT1XYgKrzBbzsckGvXTPgxFyN7KNZ9RPYVWf",
  token_moderation: "KT1HgVuzNWVvnX16fahbV2LrnpwifYKoFMRd",
  treasury: "KT1P2BXYb894MekrCcSrnidzQYPVqitLoVLc",
  user_moderation: "KT1TWWQ6FtLoosVfZgTKV2q68TMZaENhGm54",
  user_register: "KT1Ezht4PDKZri7aVppVGT4Jkw39sesaFnww"
};
var tezosMainnetApis = {
  tzkt: "https://api.tzkt.io/v1/",
  tzktWebsite: "https://tzkt.io/",
  rpcs: [
    "https://rpc1.fxhash.xyz",
    "https://mainnet.smartpy.io",
    "https://mainnet.api.tez.ie",
    "https://teznode.letzbake.com",
    "https://rpc.tzbeta.net"
  ]
};
var devApis = {
  website: "https://dev.fxhash-dev.xyz",
  main: "https://api.fxhash-dev.xyz/graphql",
  file: "https://file-api.fxhash-dev.xyz",
  fsEmulator: "https://fs-emulator.fxhash-dev.xyz",
  extract: "https://extract.fxhash-dev.xyz",
  media: "https://media.fxhash.xyz",
  ipfsGateway: "https://gateway.fxhash-dev.xyz",
  ipfsGatewaySafe: "https://gateway.fxhash-dev2.xyz",
  authority: {
    api: "NONE"
  },
  capture: {
    lambdas: {
      small: "https://u5not5l323zczuwnrzxwkt34ra0eyidj.lambda-url.us-east-1.on.aws/",
      medium: "https://jgfz7a6km7fsqonej2sp3lqwvu0utnyy.lambda-url.us-east-1.on.aws/",
      large: "https://fzezvbp2f74yturkj4akjyrq3e0zswhb.lambda-url.us-east-1.on.aws/"
    }
  },
  dashboard: {
    backend: "https://live-minting.fxhash-dev.xyz",
    aggregator: "_NONE"
  },
  events: {
    liveBackend: "_NONE"
  }
};
var prdApis = {
  website: "https://fxhash.xyz",
  main: "https://api.fxhash.xyz/graphql",
  file: "https://file-api.fxhash.xyz",
  fsEmulator: "https://fs-emulator.fxhash.xyz",
  // placeholder
  extract: "https://extract.fxhash.xyz",
  media: "https://media.fxhash.xyz",
  ipfsGateway: "https://gateway.fxhash.xyz",
  ipfsGatewaySafe: "https://gateway.fxhash2.xyz",
  authority: {
    api: "NONE"
  },
  capture: {
    lambdas: {
      small: "https://7sz7knaaw3obgqxjyv3m4e5myu0lsbdp.lambda-url.us-east-1.on.aws/",
      medium: "https://tuupcq6eesbfk4veuzdfrhu7zm0zwuqy.lambda-url.us-east-1.on.aws/",
      large: "https://bojj24y6ucxmsyfi4uccdmiliy0dzhji.lambda-url.us-east-1.on.aws/"
    }
  },
  dashboard: {
    backend: "https://events.fxhash.xyz",
    aggregator: "NONE"
  },
  events: {
    liveBackend: "_NONE"
  }
};
var FxhashConfig = {
  networks: {
    testnet: {
      tez: {
        contracts: tezosTestnetContracts,
        config: {
          network: "ghostnet"
        },
        apis: tezosTestnetApis
      },
      eth: {
        contracts: null,
        config: {
          network: "goerli"
        },
        apis: null
      }
    },
    mainnet: {
      tez: {
        contracts: tezosMainnetContracts,
        config: {
          network: "ghostnet"
        },
        apis: tezosMainnetApis
      },
      eth: {
        contracts: null,
        config: {
          network: "goerli"
        },
        apis: null
      }
    }
  },
  envs: {
    dev: {
      apis: devApis,
      config: {
        envName: "development"
      }
    },
    prd: {
      apis: prdApis,
      config: {
        envName: "production"
      }
    }
  }
};
var src_default = FxhashConfig;
export {
  FxhashConfig,
  src_default as default
};
//# sourceMappingURL=index.js.map