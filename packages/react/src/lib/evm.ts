import { createPublicClient, http } from "viem";
import { getCurrentChain } from "@fxhash/eth";
import type { BlockchainType } from "@fxhash/shared";

export const getPublicClient = (
  blockchainType: BlockchainType,
  rpc?: string,
) => {
  return createPublicClient({
    chain: getCurrentChain(blockchainType),
    transport: http(rpc),
  });
};
