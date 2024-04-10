export type MarketStatsV2Config = {
  cmcApiUrl: string
  logs: boolean
  modeSeed: boolean
}

export const marketStatsV2ConfigDev: MarketStatsV2Config = {
  cmcApiUrl:
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
  logs: false,
  modeSeed: false,
}

export const marketStatsV2ConfigLocal: MarketStatsV2Config = {
  ...marketStatsV2ConfigDev,
}

export const marketStatsV2ConfigProd: MarketStatsV2Config = {
  ...marketStatsV2ConfigDev,
}
