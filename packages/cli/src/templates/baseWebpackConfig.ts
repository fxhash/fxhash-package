type BaseWebpackConfigTemplate = string
export const baseWebpackTemplate: BaseWebpackConfigTemplate = `
    import withFxhashCli from "@fxhash/cli/webpack"
    export default withFxhashCli({ mode: <%- mode %> }, {})
`
