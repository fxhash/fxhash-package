export type AlgoliaConfig = {
  appId: string
  enabled: boolean
  indexGenerativeTokens: string
  indexOffers: string
  indexUsers: string
  indexArticles: string
  indexAccounts: string
}

const algoliaConfig = {
  enabled: true,
  indexGenerativeTokens: "generative-tokens",
  indexOffers: "listings",
  indexUsers: "users",
  indexArticles: "articles",
  indexAccounts: "accounts",
}

export const algoliaConfigDev: AlgoliaConfig = {
  appId: "T4XRS2LFQK",
  ...algoliaConfig,
}

export const algoliaConfigProd: AlgoliaConfig = {
  appId: "F7M6D8T095",
  ...algoliaConfig,
}
