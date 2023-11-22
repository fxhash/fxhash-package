export interface IFxhashApis {
  website: string
  main: string
  hasura: string
  hasuraGql: string
  file: string
  fsEmulator: string
  extract: string
  media: string
  ipfsGateway: string
  ipfsGatewaySafe: string
  onchfsProxy: string
  authority: {
    api: string
  }
  capture: {
    lambdas: {
      small: string
      medium: string
      large: string
    }
  }
  dashboard: {
    backend: string
    aggregator: string
  }
  events: {
    liveBackend: string
  }
}

// list of APIs dev leverages
export const fxhashDevApis: IFxhashApis = {
  website: "https://dev.fxhash-dev.xyz",
  main: "https://api.fxhash-dev.xyz/graphql",
  hasura: "https://api.v2.dev.fxhash-dev.xyz",
  hasuraGql: "https://api.v2.dev.fxhash-dev.xyz/v1/graphql",
  file: "https://file-api.fxhash-dev.xyz",
  fsEmulator: "https://fs-emulator.fxhash-dev.xyz",
  extract: "https://extract.fxhash-dev.xyz",
  media: "https://media.dev.fxhash-dev.xyz",
  ipfsGateway: "https://gateway.fxhash-dev.xyz",
  ipfsGatewaySafe: "https://gateway.fxhash-dev2.xyz",
  onchfsProxy: "https://onchfs.fxhash-dev2.xyz",
  authority: {
    api: "NONE",
  },
  capture: {
    lambdas: {
      small:
        "https://u5not5l323zczuwnrzxwkt34ra0eyidj.lambda-url.us-east-1.on.aws/",
      medium:
        "https://jgfz7a6km7fsqonej2sp3lqwvu0utnyy.lambda-url.us-east-1.on.aws/",
      large:
        "https://fzezvbp2f74yturkj4akjyrq3e0zswhb.lambda-url.us-east-1.on.aws/",
    },
  },
  dashboard: {
    backend: "https://live-minting.fxhash-dev.xyz",
    aggregator: "_NONE",
  },
  events: {
    liveBackend: "_NONE",
  },
}

// list of APIs for when fxhash is ran locally
export const fxhashLocalApis: IFxhashApis = {
  // todo: eventually, find a better way to inject the values from the
  //       docker-compose, maybe outside of this package idk
  ...fxhashDevApis,
  hasura: "http://host.docker.internal:8888",
  hasuraGql: "http://host.docker.internal:8888/v1/graphql",
}

// list of APIs prod leverages
export const fxhashPrdApis: IFxhashApis = {
  website: "https://fxhash.xyz",
  main: "https://api.fxhash.xyz/graphql",
  hasura: "https://api.v2.fxhash.xyz",
  hasuraGql: "https://api.v2.fxhash.xyz/v1/graphql",
  file: "https://file-api.fxhash.xyz",
  fsEmulator: "https://fs-emulator.fxhash.xyz", // placeholder
  extract: "https://extract.fxhash.xyz",
  media: "https://media.fxhash.xyz",
  ipfsGateway: "https://gateway.fxhash.xyz",
  ipfsGatewaySafe: "https://gateway.fxhash2.xyz",
  onchfsProxy: "https://onchfs.fxhash2.xyz",
  authority: {
    api: "NONE",
  },
  capture: {
    lambdas: {
      small:
        "https://7sz7knaaw3obgqxjyv3m4e5myu0lsbdp.lambda-url.us-east-1.on.aws/",
      medium:
        "https://tuupcq6eesbfk4veuzdfrhu7zm0zwuqy.lambda-url.us-east-1.on.aws/",
      large:
        "https://bojj24y6ucxmsyfi4uccdmiliy0dzhji.lambda-url.us-east-1.on.aws/",
    },
  },
  dashboard: {
    backend: "https://events.fxhash.xyz",
    aggregator: "NONE",
  },
  events: {
    liveBackend: "_NONE",
  },
}
