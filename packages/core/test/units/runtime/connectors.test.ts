import {
  getURLSearchParams,
  iframeConnector,
  fsEmulatorConnector,
} from "@/index.js"
import {
  MOCKED_CHAIN,
  MOCKED_CID,
  MOCKED_CONTEXT,
  MOCKED_HASH,
  MOCKED_INPUT_BYTES,
  MOCKED_ITERATION,
  MOCKED_MINTER,
  MOCKED_SHA1,
  PROJECT_STATE,
} from "./constants.js"

// Mock external dependencies
vi.mock("@fxhash/config", async importOriginal => {
  const mod = await importOriginal<typeof import("@fxhash/config")>()
  return {
    ...mod,
    config: {
      ...mod.config,
      apis: { ...mod.config.apis, fsEmulator: "http://fsemulator.test" },
    },
    proxyUrl: vi.fn(cid => `http://proxy.test/${cid}`),
  }
})

vi.mock("sha1", () => ({ default: vi.fn(input => `${MOCKED_SHA1}-${input}`) }))

vi.mock("./utils", () => ({
  fxParamsAsQueryParams: vi.fn(version => version === "old"),
}))

describe("getURLSearchParams", () => {
  test("generates correct URL params with default options", () => {
    const result = getURLSearchParams(PROJECT_STATE, {})
    expect(result).toContain(`fxhash=${MOCKED_HASH}`)
    expect(result).toContain(`fxminter=${MOCKED_MINTER}`)
    expect(result).toContain(`fxiteration=${MOCKED_ITERATION}`)
    expect(result).toContain(`fxchain=${MOCKED_CHAIN}`)
    expect(result).toContain(`fxcontext=${MOCKED_CONTEXT}`)
    expect(result).toContain(
      `fxparamsUpdate=${MOCKED_SHA1}-${MOCKED_INPUT_BYTES}`
    )
    expect(result).toContain(`#0x${MOCKED_INPUT_BYTES}`)
  })

  test("handles fxParamsAsQueryParams option", () => {
    const result = getURLSearchParams(PROJECT_STATE, {
      fxParamsAsQueryParams: true,
    })
    expect(result).toContain(`fxparams=${MOCKED_INPUT_BYTES}`)
    expect(result).not.toContain(`#0x${MOCKED_INPUT_BYTES}`)
  })

  test("handles noFxParamsUpdateQuery option", () => {
    const result = getURLSearchParams(PROJECT_STATE, {
      noFxParamsUpdateQuery: true,
    })
    expect(result).not.toContain("fxparamsUpdate")
    expect(result).toContain(`#0x${MOCKED_INPUT_BYTES}`)
  })

  test("includes additional params", () => {
    const additionalParams = new URLSearchParams("extra=param")
    const result = getURLSearchParams(PROJECT_STATE, { additionalParams })
    expect(result).toContain("extra=param")
  })

  test("handles state without inputBytes", () => {
    const { inputBytes, ...stateWithoutInputBytes } = PROJECT_STATE
    const result = getURLSearchParams(stateWithoutInputBytes, {})
    expect(result).not.toContain("fxparams")
    expect(result).not.toContain("fxparamsUpdate")
    expect(result).not.toContain("#0x")
  })
})

describe("iframeConnector", () => {
  const connector = iframeConnector()

  test("getUrl generates correct URL", () => {
    const result = connector.getUrl(PROJECT_STATE)
    expect(result).toContain(`http://proxy.test/${MOCKED_CID}/?`)
    expect(result).toContain(`fxhash=${MOCKED_HASH}`)
    expect(result).toContain(`#0x${MOCKED_INPUT_BYTES}`)
  })
})

describe("fsEmulatorConnector", () => {
  const connector = fsEmulatorConnector()

  test("getUrl generates correct URL", () => {
    const result = connector.getUrl(PROJECT_STATE)
    expect(result).toContain(`http://fsemulator.test/resolve/${MOCKED_CID}/?`)
    expect(result).toContain(`fxhash=${MOCKED_HASH}`)
    expect(result).toContain(`#0x${MOCKED_INPUT_BYTES}`)
  })
})
