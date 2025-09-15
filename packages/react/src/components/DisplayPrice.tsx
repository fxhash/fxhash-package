"use client"

import {
  BlockchainType,
  BlockchainTypes,
  currenciesDef,
  Currency,
  displayPrice,
} from "@fxhash/shared"
import { useMemo } from "react"

type SupportedPriceTypes = bigint | number | string

function bigintPrice(price: SupportedPriceTypes): bigint {
  if (typeof price === "bigint") return price
  try {
    return BigInt(price)
  } catch (e) {
    console.error(e)
  }
  return BigInt(0)
}

type Props = {
  /**
   * The currency in which the given price is.
   */
  currency: Currency

  /**
   * The integer price with all the precision, using the smallest price unit.
   * The number of digits after the decimal pointer for the human-readable
   * format is inferred from the currency.
   */
  price: SupportedPriceTypes

  /**
   * Whether "K", "M" abbreviations should be used for the given price.
   * Abbreviations will default the number of decimals digits to 2 if the option
   * is not provided. If the option is provided, it will be clamped to 3.
   *
   * @default false
   */
  abbreviateBig?: boolean

  /**
   * Maximum number of decimal values to display. If some precision is lost,
   * the price is rounded **up** as a safety guard.
   * **⚠️ This option can show imprecise values and should only be used when
   * the price precision is not important.**
   */
  maxDecimals?: number

  /**
   * Can be used to avoid any conversion,
   * only display the raw price value
   */
  raw?: boolean

  /**
   * Will display the currency using its basename property
   *
   * @default false
   */
  displayCurrency?: boolean
}

export function DisplayPrice({
  currency,
  price,
  abbreviateBig = false,
  maxDecimals,
  raw = false,
  displayCurrency = false,
}: Props) {
  const formatted = useMemo(() => {
    if (raw)
      return <>{maxDecimals ? Number(price).toFixed(maxDecimals) : price}</>
    const bigint = bigintPrice(price)
    return (
      <>
        {displayPrice(bigint, currency, {
          abbreviateBig,
          maxDecimals,
        })}
        {displayCurrency && BlockchainTypes.includes(currency as any)
          ? ` ${currenciesDef[currency as BlockchainType].basename}`
          : ""}
      </>
    )
  }, [currency, price, abbreviateBig, maxDecimals, raw, displayCurrency])

  return formatted
}
