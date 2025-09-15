import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface WalletPreferenceStore {
  useSmartAccount: boolean
  setUseSmartAccount: (preference: boolean) => void
}

export const useWalletPreferenceStore = create(
  persist<WalletPreferenceStore>(
    set => {
      return {
        useSmartAccount: true,
        setUseSmartAccount: (preference: boolean) =>
          set({ useSmartAccount: preference }),
      }
    },
    {
      name: "fxhash-wallet-preference-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
