import { IFxTextBlockDefinition } from "./_interfaces.js"

export const tezosStoragePointerDefinition: IFxTextBlockDefinition<any> = {
  name: "Tezos content",
  isInstantiable: true,
  hasNodeMenu: true,
  renderElement: ({ children, attributes }) => (
    <div {...attributes}>{children}</div>
  ),
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
  //  editAttributeComp: TezosStorageSettings,
  //  editAttributeWrapper: BlockParamsModal,
  hideSettingsAfterUpdate: true,
  preventAutofocusTrigger: true,
}
