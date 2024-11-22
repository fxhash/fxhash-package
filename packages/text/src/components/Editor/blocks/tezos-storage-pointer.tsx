import { IFxTextBlockDefinition } from "./_interfaces.js"

export const tezosStoragePointerDefinition: IFxTextBlockDefinition<any> = {
  name: "Tezos content",
  icon: <i className="fa-solid fa-hexagon-vertical-nft" aria-hidden />,
  buttonInstantiable: true,
  render: ({ attributes, element, children }) => <div>{children}</div>,
  hasUtilityWrapper: true,
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
