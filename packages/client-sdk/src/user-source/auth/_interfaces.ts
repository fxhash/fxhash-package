import { TezosWalletManager } from "@fxhash/tez"
import { IUserSource } from "../_interfaces.js"
import { EthereumWalletManager } from "@fxhash/eth"
import { PromiseResult } from "@fxhash/shared"
import { SignMessageError } from "@/index.js"
import { GetSingleUserAccountResult } from "./_index.js"

export interface IAccountSource extends IUserSource {
  authenticated: () => boolean
  logout: () => Promise<any>
  getWalletManagers: () => null
}

export interface IWalletsAccountSource extends IAccountSource {
  authenticate: (
    walletManager: TezosWalletManager | EthereumWalletManager
  ) => PromiseResult<GetSingleUserAccountResult, SignMessageError>
}

export type StoredAccount<
  Credentials extends Record<string, string> = Record<string, string>,
> = {
  id: string
  credentials: Credentials
}
