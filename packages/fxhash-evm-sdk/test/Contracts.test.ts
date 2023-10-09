import { config as dotenvConfig } from "dotenv"
import {
  createPublicClient,
  createWalletClient,
  encodePacked,
  getContract,
  http,
  numberToHex,
} from "viem"
import { foundry } from "viem/chains"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { FxhashContracts } from "@/contracts/Contracts"
import { ABI as FixedPriceMinterABI } from "@/abi/FixedPriceMinter"
import { ABI as IssuerFactoryABI } from "@/abi/FxIssuerFactory"
import { privateKeyToAccount } from "viem/accounts"
import { ABI as ISplitsMainABI } from "@/abi/ISplitsMain"

dotenvConfig()

describe("createProject", () => {
  const walletClient = createWalletClient({
    chain: foundry,
    transport: http(),
    account: privateKeyToAccount(
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
    ),
  })
  const publicClient = createPublicClient({
    chain: foundry,
    transport: http(),
  })

  it("should create a fixed price project", async () => {
    const splitsPrimary = [
      {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        pct: 500000,
      },
      {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92267",
        pct: 500000,
      },
    ]

    const splitsSecondary = [
      {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        pct: 100,
      },
    ]

    const splitsFactory = getContract({
      address: FxhashContracts.ETH_SPLITS_MAIN as `0x${string}`,
      abi: ISplitsMainABI,
      walletClient: walletClient,
      publicClient: publicClient,
    })

    const splitsAddress = await splitsFactory.read.predictImmutableSplitAddress(
      [
        splitsPrimary.map(split => split.address as `0x${string}`),
        splitsPrimary.map(split => split.pct),
        0,
      ]
    )

    const account = walletClient.account.address
    const args: SimulateAndExecuteContractRequest = {
      address: FxhashContracts.ETH_PROJECT_FACTORY as `0x${string}`,
      abi: IssuerFactoryABI,
      functionName: "createProject",
      args: [
        account,
        splitsAddress,
        {
          enabled: true,
          onchain: false,
          supply: 100,
          contractURI: "",
        },
        {
          baseURI: "",
          imageURI: "",
          animation: {
            bodyTags: [],
            headTags: [],
          },
          attributes: {
            bodyTags: [],
            headTags: [],
          },
        },
        [
          {
            minter: FxhashContracts.ETH_FIXED_PRICE_MINTER_V1,
            reserveInfo: {
              startTime: new Date().getTime(),
              endTime: new Date().getTime() + 999999,
              allocation: 100,
            },
            params: numberToHex(1000),
          },
        ],
        splitsSecondary.map(split => split.address as `0x${string}`),
        splitsSecondary.map(split => BigInt(split.pct)),
      ],
      account: account,
    }
    const receipt = await simulateAndExecuteContract(
      publicClient,
      walletClient,
      args
    )
    console.log(receipt)
    expect(receipt.transactionHash).toBeDefined()
  })

  it("should create a dutch auction project", async () => {
    const splitsPrimary = [
      {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        pct: 500000,
      },
      {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92267",
        pct: 500000,
      },
    ]

    const splitsSecondary = [
      {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        pct: 100,
      },
    ]

    const splitsFactory = getContract({
      address: FxhashContracts.ETH_SPLITS_MAIN as `0x${string}`,
      abi: ISplitsMainABI,
      walletClient: walletClient,
      publicClient: publicClient,
    })

    const splitsAddress = await splitsFactory.read.predictImmutableSplitAddress(
      [
        splitsPrimary.map(split => split.address as `0x${string}`),
        splitsPrimary.map(split => split.pct),
        0,
      ]
    )

    const dutchAuctionParams = {
      prices: [BigInt(1000), BigInt(900), BigInt(800)],
      stepLength: BigInt(100),
      refunded: false,
    }

    const account = walletClient.account.address
    const args: SimulateAndExecuteContractRequest = {
      address: FxhashContracts.ETH_PROJECT_FACTORY as `0x${string}`,
      abi: IssuerFactoryABI,
      functionName: "createProject",
      args: [
        account,
        splitsAddress,
        {
          enabled: true,
          onchain: false,
          supply: 100,
          contractURI: "",
        },
        {
          baseURI: "",
          imageURI: "",
          animation: {
            bodyTags: [],
            headTags: [],
          },
          attributes: {
            bodyTags: [],
            headTags: [],
          },
        },
        [
          {
            minter: FxhashContracts.ETH_DUTCH_AUCTION,
            reserveInfo: {
              startTime: new Date().getTime(),
              endTime: new Date().getTime() + 999999,
              allocation: 100,
            },
            params: encodePacked(
              ["uint256[]", "uint256", "bool"],
              [
                dutchAuctionParams.prices,
                dutchAuctionParams.stepLength,
                dutchAuctionParams.refunded,
              ]
            ),
          },
        ],
        splitsSecondary.map(split => split.address as `0x${string}`),
        splitsSecondary.map(split => BigInt(split.pct)),
      ],
      account: account,
    }
    const receipt = await simulateAndExecuteContract(
      publicClient,
      walletClient,
      args
    )
    console.log(receipt)
    expect(receipt.transactionHash).toBeDefined()
  })

  it("should mint a token for the project with a fixed price minter", async () => {
    const account = walletClient.account.address
    const args: SimulateAndExecuteContractRequest = {
      address: FxhashContracts.ETH_FIXED_PRICE_MINTER_V1 as `0x${string}`,
      abi: FixedPriceMinterABI,
      functionName: "buy",
      args: ["0xE8F7d98bE6722d42F29b50500B0E318EF2be4fc8", 1, 1, account],
      account: account,
    }
    const receipt = await simulateAndExecuteContract(
      publicClient,
      walletClient,
      args
    )
    console.log(receipt)
    expect(receipt.transactionHash).toBeDefined()
  })
})
