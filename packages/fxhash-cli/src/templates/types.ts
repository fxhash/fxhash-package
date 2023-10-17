export type AdditionalFileDeclarations = [string, string][]
export type StaticFileDeclarations = [string, string][]

export type TemplateFactoryResponse = {
  name: string
  folders?: string[]
  files?: AdditionalFileDeclarations
  staticFiles?: StaticFileDeclarations
}

export type TemplateType = "simple" | "webpack"

export type TemplateUserConfig = {
  name: string
  template: TemplateFactory<TemplateType>
}

interface TemplateOpions {
  simple: Pick<TemplateUserConfig, "name">
  webpack: Pick<TemplateUserConfig, "name">
}

export type TemplateFactory<T extends TemplateType> = (
  options: TemplateOpions[T]
) => Promise<TemplateFactoryResponse>
