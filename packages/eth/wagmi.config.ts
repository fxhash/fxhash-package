import { defineConfig } from "@wagmi/cli"
import { foundry } from "@wagmi/cli/plugins"

const contractFilesToInclude: string[] = ["DutchAuctionV2"]
const tokenContractFilesToInclude: string[] = ["FxAirdrop", "TezAirdrop"]
const creatorTokenContractFilesToInclude: string[] = [
  "TokenLaunchpad",
  "ProjectFactory",
  "ProjectFactoryV2",
  "ProjectToken",
]

export default defineConfig({
  out: "src/__generated__/wagmi.ts",
  contracts: [],
  plugins: [
    foundry({
      project: "../../../../../../fxhash-evm-core",
      // We only include the Fxhash contracts we use directly, compiling everything is throwing an error
      // wagmi foundry plugin issue https://github.com/wevm/wagmi/issues/4396
      include: contractFilesToInclude.map(
        contractName => `${contractName}.json`
      ),
    }),
    foundry({
      project: "../../../../../../fxhash-token",
      include: tokenContractFilesToInclude.map(
        contractName => `${contractName}.json`
      ),
    }),
    foundry({
      project: "../../../../../../clone-virtuals-artists/packages/contracts",
      include: creatorTokenContractFilesToInclude.map(
        contractName => `${contractName}.json`
      ),
    }),
  ],
})
