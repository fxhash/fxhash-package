import { useClient } from "./useClient.js"

export function useWallets() {
  const { managers } = useClient()

  return {
    TEZOS: managers.TEZOS?.manager || null,
    EVM: managers.EVM?.manager || null,
  }
}

export function useEvmWallet() {
  return useWallets().EVM
}

export function useTezosWallet() {
  return useWallets().TEZOS
}
