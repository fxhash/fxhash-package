const stringToHex = s => {
  let rtn = ""
  for (let i = 0; i < s.length; i++) {
    rtn += s.charCodeAt(i).toString(16).padStart(4, "0")
  }
  return rtn
}

const completeHexColor = hexCode => {
  let hex = hexCode.replace("#", "")
  if (hex.length === 6) {
    hex = `${hex}ff`
  }
  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}ff`
  }
  return hex
}

// the parameter processor, used to parse fxparams
export const processors = {
  number: {
    serialize: input => {
      const view = new DataView(new ArrayBuffer(8))
      view.setFloat64(0, input)
      return view.getBigUint64(0).toString(16).padStart(16, "0")
    },
    deserialize: input => {
      const view = new DataView(new ArrayBuffer(8))
      for (let i = 0; i < 8; i++) {
        view.setUint8(i, parseInt(input.substring(i * 2, i * 2 + 2), 16))
      }
      return view.getFloat64(0)
    },
    bytesLength: () => 8,
    constrain: (value, definition) => {
      let min = Number.MIN_SAFE_INTEGER
      if (typeof definition.options?.min !== "undefined")
        min = Number(definition.options.min)
      let max = Number.MAX_SAFE_INTEGER
      if (typeof definition.options?.max !== "undefined")
        max = Number(definition.options.max)
      max = Math.min(max, Number.MAX_SAFE_INTEGER)
      min = Math.max(min, Number.MIN_SAFE_INTEGER)
      const v = Math.min(Math.max(value, min), max)
      if (definition?.options?.step) {
        const t = 1.0 / definition?.options?.step
        return Math.round(v * t) / t
      }
      return v
    },
    random: definition => {
      let min = Number.MIN_SAFE_INTEGER
      if (typeof definition.options?.min !== "undefined")
        min = Number(definition.options.min)
      let max = Number.MAX_SAFE_INTEGER
      if (typeof definition.options?.max !== "undefined")
        max = Number(definition.options.max)
      max = Math.min(max, Number.MAX_SAFE_INTEGER)
      min = Math.max(min, Number.MIN_SAFE_INTEGER)
      const v = Math.random() * (max - min) + min
      if (definition?.options?.step) {
        const t = 1.0 / definition?.options?.step
        return Math.round(v * t) / t
      }
      return v
    },
  },
  bigint: {
    serialize: input => {
      const view = new DataView(new ArrayBuffer(8))
      view.setBigInt64(0, BigInt(input))
      return view.getBigUint64(0).toString(16).padStart(16, "0")
    },
    deserialize: input => {
      const view = new DataView(new ArrayBuffer(8))
      for (let i = 0; i < 8; i++) {
        view.setUint8(i, parseInt(input.substring(i * 2, i * 2 + 2), 16))
      }
      return view.getBigInt64(0)
    },
    bytesLength: () => 8,
    random: definition => {
      const MIN_SAFE_INT64 = -9223372036854775808n
      const MAX_SAFE_INT64 = 9223372036854775807n
      let min = MIN_SAFE_INT64
      let max = MAX_SAFE_INT64
      if (typeof definition.options?.min !== "undefined")
        min = BigInt(definition.options.min)
      if (typeof definition.options?.max !== "undefined")
        max = BigInt(definition.options.max)
      const range = max - min
      const bits = range.toString(2).length
      let random
      do {
        random = BigInt(
          "0b" +
            Array.from(
              crypto.getRandomValues(new Uint8Array(Math.ceil(bits / 8)))
            )
              .map(b => b.toString(2).padStart(8, "0"))
              .join("")
        )
      } while (random > range)
      return random + min
    },
  },
  boolean: {
    serialize: input =>
      (typeof input === "boolean" && input) ||
      (typeof input === "string" && input === "true")
        ? "01"
        : "00",
    // if value is "00" -> 0 -> false, otherwise we consider it's 1
    deserialize: input => {
      return input === "00" ? false : true
    },
    bytesLength: () => 1,
    random: () => Math.random() < 0.5,
  },
  color: {
    serialize: input => {
      return completeHexColor(input)
    },
    deserialize: input => input,
    bytesLength: () => 4,
    transform: input => {
      const r = parseInt(input.slice(0, 2), 16)
      const g = parseInt(input.slice(2, 4), 16)
      const b = parseInt(input.slice(4, 6), 16)
      const a = parseInt(input.slice(6, 8), 16)
      return {
        hex: {
          rgb: "#" + input.slice(0, 6),
          rgba: "#" + input,
        },
        obj: {
          rgb: { r, g, b },
          rgba: { r, g, b, a },
        },
        arr: {
          rgb: [r, g, b],
          rgba: [r, g, b, a],
        },
      }
    },
    constrain: (value, definition) => {
      const hex = value.replace("#", "")
      return hex.slice(0, 8).padEnd(8, "f")
    },
    random: () =>
      `${[...Array(8)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("")}`,
  },
  string: {
    serialize: (input, def) => {
      let max = 64
      if (typeof def.options?.maxLength !== "undefined")
        max = Number(def.options.maxLength)
      let hex = stringToHex(input.substring(0, max))
      hex = hex.padEnd(max * 4, "0")
      return hex
    },
    deserialize: input => {
      const hx = input.match(/.{1,4}/g) || []
      let rtn = ""
      for (let i = 0; i < hx.length; i++) {
        const int = parseInt(hx[i], 16)
        if (int === 0) break
        rtn += String.fromCharCode(int)
      }
      return rtn
    },
    bytesLength: options => {
      if (typeof options?.maxLength !== "undefined")
        return Number(options.maxLength) * 2
      return 64 * 2
    },
    constrain: (value, definition) => {
      let min = 0
      if (typeof definition.options?.minLength !== "undefined")
        min = definition.options.minLength
      let max = 64
      if (typeof definition.options?.maxLength !== "undefined")
        max = definition.options.maxLength
      const v = value.slice(0, max)
      if (v.length < min) {
        return v.padEnd(min)
      }
      return v
    },
    random: definition => {
      let min = 0
      if (typeof definition.options?.minLength !== "undefined")
        min = definition.options.minLength
      let max = 64
      if (typeof definition.options?.maxLength !== "undefined")
        max = definition.options.maxLength
      const length = Math.round(Math.random() * (max - min) + min)
      return [...Array(length)]
        .map(i => (~~(Math.random() * 36)).toString(36))
        .join("")
    },
  },
  bytes: {
    serialize: (input, def) => {
      const out = Array.from(input)
        .map(i => i.toString(16).padStart(2, "0"))
        .join("")
      return out
    },
    deserialize: (input, def) => {
      const len = input.length / 2
      const uint8 = new Uint8Array(len)
      let idx
      for (let i = 0; i < len; i++) {
        idx = i * 2
        uint8[i] = parseInt(`${input[idx]}${input[idx + 1]}`, 16)
      }
      return uint8
    },
    bytesLength: opt => opt.length,
    constain: (value, def) => {
      return value
    },
    random: def => {
      const len = def.options?.length || 0
      const uint8 = new Uint8Array(len)
      for (let i = 0; i < len; i++) {
        uint8[i] = (Math.random() * 255) | 0
      }
      return uint8
    },
  },
  select: {
    serialize: (input, def) => {
      // find the index of the input in the array of options
      return Math.min(255, def.options?.options?.indexOf(input) || 0)
        .toString(16)
        .padStart(2, "0")
    },
    deserialize: (input, definition) => {
      return (
        definition.options.options[parseInt(input, 16)] || definition.default
      )
    },
    bytesLength: () => 1,
    constrain: (value, definition) => {
      if (definition.options.options.includes(value)) {
        return value
      }
      return definition.options.options[0]
    },
    random: definition => {
      const index = Math.round(
        Math.random() * (definition?.options?.options?.length - 1) + 0
      )
      return definition?.options?.options[index]
    },
  },
}
