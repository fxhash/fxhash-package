import { BlockchainType } from "@/wallet/ContractOperation";
import { etherUnits } from "viem";

export interface CurrencyDefinition {
  /**
   * Short name (3 characters) for the blockchain, (ex: ETH, TEZ)
   */
  shortname: string;

  /**
   * The number of decimal digits for full-precision for the human adopted
   * exponent.
   */
  decimalDigits: number;

  /**
   * The base unit of the currency.
   */

  basename: string;
}

/**
 * The various supported blockchains as well as the default user currency, which
 * is (going to be) the FIAT currency they chose.
 */
export type Currency = BlockchainType | "FXH" | "_default";

/**
 * A map of every currency and its declarative definition.
 */
export const currenciesDef: Record<Currency, CurrencyDefinition> = {
  [BlockchainType.ETHEREUM]: {
    shortname: "ETH",
    decimalDigits: etherUnits.wei,
    basename: "ETH",
  },
  [BlockchainType.BASE]: {
    shortname: "ETH (Base)",
    decimalDigits: etherUnits.wei,
    basename: "ETH",
  },
  [BlockchainType.TEZOS]: {
    shortname: "TEZ",
    decimalDigits: 6,
    basename: "TEZ",
  },
  FXH: {
    shortname: "FXH",
    decimalDigits: 18,
    basename: "FXH",
  },
  _default: {
    shortname: "USD",
    decimalDigits: 2,
    basename: "USD",
  },
};
