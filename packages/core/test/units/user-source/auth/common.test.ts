import {
  type AccountUtils,
  GraphqlWrapper,
  accountUtils,
  defaultStorageDriver,
  isStoredAccountValid,
  jwtCredentials,
  ACCOUNT_STORAGE_KEY,
} from "@/index.js"
import { ACCESS_TOKEN, REFRESH_TOKEN, USERS } from "../../../mock/constants.js"
import { hasuraMockClient, mockServer } from "../../../mock/handlers.js"
import { HttpResponse } from "msw"
import { localConfig } from "@fxhash/config"
import { beforeEach, describe, expect, it } from "vitest"

function updateUser(
  utils: AccountUtils,
  user: Parameters<AccountUtils["update"]>[0]
) {
  return new Promise(resolve => {
    utils.emitter.on("account-changed", resolve)
    utils.update(user)
  })
}

const ACCOUNTS = Object.freeze({
  A: {
    id: USERS.A.id,
    credentials: {
      accessToken: ACCESS_TOKEN,
      refreshToken: REFRESH_TOKEN,
    },
  },
  B: {
    id: USERS.B.id,
    credentials: {
      accessToken: ACCESS_TOKEN,
      refreshToken: REFRESH_TOKEN,
    },
  },
})

/**
 * todo
 * ---------
 * Note: these are not pure unit tests as modules from this packages are being
 * used as inputs. Such modules should be mocked so that we can properly emulate
 * all the paths in isolation. Right now if GraphQLWrapper / credentials / ...
 * is failing then these tests will fail too, while they shouldn't.
 */
describe("isStoredAccountValid", () => {
  it("invalidates invalid accounts", () => {
    expect(isStoredAccountValid({})).toBe(false)
    expect(isStoredAccountValid(null)).toBe(false)
    expect(isStoredAccountValid(false)).toBe(false)
    expect(isStoredAccountValid("string")).toBe(false)
    expect(
      isStoredAccountValid({
        id: 3,
        credentials: {},
      })
    ).toBe(false)
    expect(
      isStoredAccountValid({
        id: "id",
        credentials: "test",
      })
    ).toBe(false)
  })

  it("validates valid accounts", () => {
    expect(
      isStoredAccountValid({
        id: "some-id",
        credentials: {},
      })
    ).toBe(true)
    expect(
      isStoredAccountValid({
        id: "some-id",
        credentials: {
          accessToken: "",
          refreshToken: "",
        },
      })
    ).toBe(true)
  })
})

describe("accountUtils", () => {
  let storage = defaultStorageDriver(),
    gql = new GraphqlWrapper({
      url: localConfig.apis.hasuraGql,
    }),
    credentialsDriver = jwtCredentials(gql)

  const newUtils = (namespace = "tests") =>
    accountUtils({
      storage,
      gql,
      credentialsDriver,
      storageNamespace: namespace,
    })

  beforeEach(() => {
    // if localStorage is defined, clear it
    if (typeof localStorage !== "undefined") {
      localStorage.clear()
    }
    // reset the different modules
    storage = defaultStorageDriver() // resets in-memory storage for node
    gql = new GraphqlWrapper({
      url: localConfig.apis.hasuraGql,
    })
    credentialsDriver = jwtCredentials(gql)
  })

  it("emits when account is set for the first time", () => {
    const utils = newUtils()
    expect(updateUser(utils, USERS.A)).resolves.toEqual({ account: USERS.A })
  })

  it("doesn't emit when account is updated but hasn't changed", () => {
    const utils = newUtils()
    utils.update(USERS.A)
    const rnd = Math.random().toString().split(".")[1]
    expect(
      Promise.race([
        updateUser(utils, USERS.A),
        new Promise(r => setTimeout(() => r(rnd), 50)),
      ])
    ).resolves.toBe(rnd)
  })

  it("emits when account is set to null", () => {
    const utils = newUtils()
    utils.update(USERS.A)
    expect(updateUser(utils, null)).resolves.toEqual({ account: null })
  })

  it("emits when account is changed", () => {
    const utils = newUtils()
    utils.update(USERS.A)
    expect(updateUser(utils, USERS.B)).resolves.toEqual({ account: USERS.B })
  })

  it("returns proper account", () => {
    const utils = newUtils()
    expect(utils.get()).toBe(null)
    utils.update(USERS.A)
    expect(utils.get()).toEqual(USERS.A)
  })

  it("stores/retrieve account in storage", async () => {
    const utils = newUtils("custom")
    await utils.store(ACCOUNTS.A)
    expect(storage.getItem(`${ACCOUNT_STORAGE_KEY}:custom`)).resolves.toEqual(
      ACCOUNTS.A
    )
    expect(utils.getAccountFromStorage()).resolves.toEqual(ACCOUNTS.A)
  })

  it("supports namespaces to avoid collisions", async () => {
    const utilsA = newUtils("test:A")
    const utilsB = newUtils("test:B")
    await utilsA.store(ACCOUNTS.A)
    await utilsB.store(ACCOUNTS.B)
    expect(utilsA.getAccountFromStorage()).resolves.toEqual(ACCOUNTS.A)
    expect(utilsB.getAccountFromStorage()).resolves.toEqual(ACCOUNTS.B)
  })

  it("cleans properly", async () => {
    credentialsDriver.apply(ACCOUNTS.A.credentials)
    await storage.setItem(`${ACCOUNT_STORAGE_KEY}:custom`, ACCOUNTS.A)

    expect(storage.getItem(`${ACCOUNT_STORAGE_KEY}:custom`)).resolves.toEqual(
      ACCOUNTS.A
    )
    expect(gql.headers.authorization).toBe(
      `Bearer ${ACCOUNTS.A.credentials.accessToken}`
    )

    const utils = newUtils("custom")
    utils.update(USERS.A)

    function clean() {
      return new Promise(resolve => {
        utils.emitter.on("account-changed", resolve)
        utils.cleanup()
      })
    }
    const emitted = await clean()
    expect(emitted).toEqual({ account: null })
    expect(storage.getItem(`${ACCOUNT_STORAGE_KEY}:custom`)).resolves.toBe(null)
    expect(gql.headers.authorization).toBeUndefined()
  })

  it("syncs internal state & emits using account in-storage", async () => {
    mockServer.use(
      hasuraMockClient.query(
        "GetMyAccount",
        () => {
          return HttpResponse.json({
            data: {
              offchain: {
                UserAccount: [{ account: USERS.A }],
              },
            },
          })
        },
        {
          once: true,
        }
      )
    )

    const utils = newUtils("custom")
    expect(utils.sync()).rejects.toThrow("No account authenticated")
    await storage.setItem(`${ACCOUNT_STORAGE_KEY}:custom`, ACCOUNTS.A)
    const res = await utils.sync()
    expect(res).toEqual(USERS.A)
    expect(storage.getItem(`${ACCOUNT_STORAGE_KEY}:custom`)).resolves.toEqual(
      ACCOUNTS.A
    )
    expect(gql.headers.authorization).toBe(
      `Bearer ${ACCOUNTS.A.credentials.accessToken}`
    )
  })

  it("can reconnect from storage", async () => {
    mockServer.use(
      hasuraMockClient.query(
        "GetMyAccount",
        () => {
          return HttpResponse.json({
            data: {
              offchain: {
                UserAccount: [{ account: USERS.A }],
              },
            },
          })
        },
        {
          once: true,
        }
      )
    )

    await storage.setItem(`${ACCOUNT_STORAGE_KEY}:custom`, ACCOUNTS.A)
    const utils = newUtils("custom")

    function reconnectFromStorage_resolveEmit() {
      return new Promise(r => {
        utils.emitter.on("account-changed", r)
        utils.reconnectFromStorage()
      })
    }

    const emitted = await reconnectFromStorage_resolveEmit()
    expect(emitted).toEqual({ account: USERS.A })
    expect(gql.headers.authorization).toBe(
      `Bearer ${ACCOUNTS.A.credentials.accessToken}`
    )
    expect(utils.get()).toEqual(USERS.A)
  })

  it("cannot reconnect from storage if missing/invalid account in-storage (and clears if invalid)", async () => {
    const utils = newUtils("custom")
    await utils.reconnectFromStorage()
    expect(utils.get()).toBe(null)
    await storage.setItem(`${ACCOUNT_STORAGE_KEY}:custom`, {
      invalid: "payload ",
    })
    await utils.reconnectFromStorage()
    expect(utils.get()).toBe(null)
    expect(storage.getItem(`${ACCOUNT_STORAGE_KEY}:custom`)).resolves.toBe(null)
  })

  // todo
  // it("refreshes credentials when reconnecting if invalid", async () => {})

  // todo
  // it("refreshes credentials on requests failed because JWT expired")
})

// todo: test authWithWallets using an emulated user-source wallet
