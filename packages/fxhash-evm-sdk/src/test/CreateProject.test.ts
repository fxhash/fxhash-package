import { config as dotenvConfig } from "dotenv"
import { WalletManager } from "../services/Wallet"
import {
  TMintIssuerV3OperationParams,
  MintIssuerV3Operation,
} from "../services/contract-operations/MintIssuerV3"
import { CaptureMode, CaptureTriggerMode } from "../types/Mint"
import { createTestClient, createWalletClient, custom, http } from "viem"
import { foundry } from "viem/chains"

dotenvConfig()

describe("createProject", () => {
  let manager
  beforeAll(async () => {
    // instanciate the manager
    const client = createTestClient({
      chain: foundry,
      mode: "anvil",
      transport: http(),
    })
    manager = new WalletManager(client)
  })

  it("should create a project", async () => {
    const params: TMintIssuerV3OperationParams = {
      data: {
        distribution: {
          enabled: true,
          editions: "100",
          royalties: "0",
          pricing: {
            pricingFixed: {
              price: "1000000",
              opensAt: new Date(),
            },
            pricingDutchAuction: {
              levels: [],
            },
          },
          splitsPrimary: [
            {
              address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
              pct: 500000,
            },
            {
              address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92267",
              pct: 500000,
            },
          ],
          splitsSecondary: [
            {
              address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
              pct: 100,
            },
          ],
          reserves: [],
        },
      },
      metadata: {
        artifactUri: "",
        name: "",
        symbol: "",
        displayUri: "",
        thumbnailUri: "",
        description: "",
        childrenDescription: "",
        tags: [],
        generativeUri: "",
        authenticityHash: "",
        capture: {
          mode: CaptureMode.CUSTOM,
          triggerMode: CaptureTriggerMode.FN_TRIGGER,
        },
        decimals: 0,
        params: {
          definition: undefined,
          inputBytesSize: 0,
        },
      },
      metadataBytes: "",
      ticketMetadataBytes: "",
    }
    const createProjectOperation = new MintIssuerV3Operation(manager, params)
    const receipt = createProjectOperation.call()
    console.log(receipt)
    expect((await receipt).transactionHash).toBeDefined()
  })
})
