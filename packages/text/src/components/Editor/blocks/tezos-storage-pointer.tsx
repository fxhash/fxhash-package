import { blockDefinition } from "./_definition.js"

export const tezosStoragePointerDefinition = blockDefinition<null>({
  name: "Tezos content",
  isInstantiable: true,
  hasNodeMenu: true,
  instanciateElement: () => ({
    type: "tezos-storage-pointer",
    contract: undefined,
    path: undefined,
    storage_type: undefined,
    data_spec: undefined,
    value_path: undefined,
    children: [
      {
        text: "",
      },
    ],
  }),
  hideSettingsAfterUpdate: true,
  preventAutofocusTrigger: true,
})
