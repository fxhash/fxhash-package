import { type Currency, currenciesDef } from "./currencies";
import { bigIntPow, getDecimalsNb } from "@fxhash/utils";

/**
 * Given a number in mutez, outputs a more readable format such as
 * 1.1K or 200.0K  etc...
 */
export function bigMutezFormatter(num: number, digits: number = 1) {
  if (num === 0) return "0";

  // turn mutez into tez
  num = num * 0.000001;
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
  ];
  const item = lookup
    .slice()
    .reverse()
    .find((item) => {
      return num >= item.value;
    });

  // we increase the number of digits if under 100 tez
  if (num < 100) {
    digits++;
  }

  const div = item ? item.value : 1;

  return (num / div).toFixed(digits) + (item?.symbol ?? "");
}

/**
 * Given a number in mutez, outputs a string with decimals provided, if any
 * Default to
 */
export function displayDecimals(
  mutez: number,
  maxDecimals?: number,
  exponent: number = 6,
): number {
  let decimals = getDecimalsNb(mutez, exponent);
  decimals = maxDecimals != null ? Math.min(maxDecimals, decimals) : decimals;
  const tez = mutez / Math.pow(10, exponent);
  const dec = tez - Math.floor(tez);
  return ((dec * 10 ** decimals) | 0) > 0
    ? Number(tez.toFixed(decimals))
    : Math.floor(tez);
}

/**
 * Options to display a Price.
 */
export type DisplayPriceOptions = {
  /**
   * Whether the number should be abbreviated if it's very big, such as 1K, 1M
   */
  abbreviateBig: boolean;
  /**
   * The number of decimal digits which should be displayed after the comma. If
   * those numbers are zeros, they will be left out. If undefined, all the
   * digits necessary for full precision will be outputted.
   */
  maxDecimals?: number;
};

const defaultDisplayPriceOptions: DisplayPriceOptions = {
  abbreviateBig: false,
  maxDecimals: undefined,
};

/**
 * Given a uint price, outputs a string in human-readable unit (ex 1 ETH, 1 XTZ)
 * with an output which can be configured using options. The default options
 * provide a full representation of the price value, to ensure it's properly
 * displayed and to avoid bad surprises.
 *
 * @param options Some options for the display. The default options
 * provide a full representation of the price value, to ensure it's properly
 * displayed and to avoid bad surprises.
 *
 * @see units.test.ts For examples on usage
 */
export function displayPrice(
  price: bigint,
  currency: Currency,
  options?: Partial<DisplayPriceOptions>,
): string {
  const currDef = currenciesDef[currency];
  const _opts = {
    ...defaultDisplayPriceOptions,
    ...options,
  };

  // we represent the target decimal value using
  // (int, decimals)
  // int -> a sequence of base 10 digits
  // decimals -> the number of integer digits on the decimal part
  // ex (1001, 3) -> 1.001
  const num = new BigIntDecimal(price, currDef.decimalDigits);
  num.optimizeDecimals();

  if (_opts.abbreviateBig) {
    return num.abbreviate(_opts.maxDecimals);
  } else {
    if (typeof _opts.maxDecimals !== "undefined") {
      num.ceil(_opts.maxDecimals);
    }
  }

  return num.toString();
}

const priceAbbrevSymbols = [
  {
    exponent: 6,
    symbol: "M",
  },
  {
    exponent: 3,
    symbol: "K",
  },
];

class BigIntDecimal {
  constructor(
    public int: bigint,
    public decimals: number,
  ) {}

  /**
   * Decrease the number of decimals as much as possible as long as the
   * full precision is kept. Effectively, remove as many 0 digits on the
   * right side of the decimal pointer.
   */
  optimizeDecimals() {
    const base = BigInt("10");
    const zero = BigInt("0");
    while (this.decimals > 0 && this.int % base === zero) {
      this.decimals--;
      this.int = this.int / base;
    }
  }

  /**
   * Round the number up so that it gets to a certain number of decimals,
   * loosing some precision in the process. If the number of decimals is
   * already lower than the given precision number, will not round further.
   * Once this function is done it runs an decimal optimization to remove
   * eventual zeros on the right side of the decimal.
   * @param precision Number of decimals to round the number to
   */
  ceil(precision: number) {
    if (precision < 0) throw new Error("decimal precision < 0 !!");
    if (this.decimals === 0) return;
    if (this.decimals <= precision) {
      this.optimizeDecimals();
      return;
    }
    const base = BigInt("10");
    // decrease the number of decimals until it gets to precision, while
    // rounding up whenever a rest is found
    while (this.decimals > precision) {
      // compute the rest after the loss of the next decimal, if it's > 1
      // round ip (by adding 10)
      const r = this.int % base;
      if (r > 0) this.int = this.int + base;
      this.decimals--;
      this.int = this.int / base;
    }
    this.optimizeDecimals();
  }

  /**
   * A string representation of the number, conserving all the precision
   * defined by the decimal.
   */
  toString() {
    let full = this.int.toString();
    if (this.decimals === 0) return full;
    if (this.decimals >= full.length)
      full = full.padStart(this.decimals + 1, "0");
    const decIdx = full.length - this.decimals;
    return full.slice(0, decIdx) + "." + full.slice(decIdx);
  }

  /**
   * 100K, 100M, etc
   * Adds the abbreviation at the end of the number, by rounding the lower
   * orders.
   * @param maxDecimals the maximum number of decimals to display, def: 3
   * @remark The implementation isn't really great, as it mutates the current
   * number for processing. Can be improved.
   */
  abbreviate(maxDecimals = 3) {
    const base = this.int / bigIntPow(BigInt(10), this.decimals);
    // If amount is < 1, we don't abbreviate
    if (base < BigInt(1)) {
      return this.toString();
    }
    for (const abbrv of priceAbbrevSymbols) {
      const exp = bigIntPow(BigInt(10), abbrv.exponent);
      if (base > exp) {
        this.decimals += abbrv.exponent;
        this.ceil(maxDecimals);
        return this.toString() + abbrv.symbol;
      }
    }
    this.ceil(maxDecimals);
    return this.toString();
  }
}

/**
 * Takes some normalized royalties as input, and serialize it to a string ready
 * to be displayed on the front-end. **It expects the royalty amount to be
 * normalized, and will throw if not the case.**
 * @param royalties A normalized value between [0; 1], ex: 0.1 = 10%, 0.01 = 1%
 * @returns A text string ready to display on the front
 */
export function displayRoyalties(royalties: number): string {
  if (royalties < 0 || royalties > 1)
    throw new Error(
      `The royalties passed (${royalties}) are not normalized, the value should be between 0 and 1`,
    );
  return (royalties * 100).toFixed(1) + "%";
}

/**
 * Given a number in the [0; 1] range, displays the percentage in an elegant manner
 */
export function displayPercentage(
  x: number,
  prettifyLow: boolean = true,
): string {
  if (x < 0 || x > 1)
    throw new Error(
      `The x passed for displaying percentage (${x}) are not normalized, the value should be between 0 and 1`,
    );

  const x100 = x * 100;
  // if x100 < precision, return like it
  if (x100 < 0.0001 && prettifyLow) return "< 0.0001";

  let fixed = x100.toFixed(1);
  // check if right part is made of 0's only
  let right = fixed.split(".").pop();
  if (right && parseInt(right) === 0) {
    return fixed.split(".")[0];
  } else {
    return fixed;
  }
}

export function prettyPrintBytes(size: number): string {
  const units = ["B", "KB", "MB"];
  let s = size;
  for (const unit of units) {
    if (s < 1000) {
      return s.toFixed(0) + unit;
    }
    s /= 1024;
  }
  return s.toFixed(0) + "GB";
}
