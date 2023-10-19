type BaseWebpackConfigTemplate = string
export const baseWebpackTemplate: BaseWebpackConfigTemplate = `
    const withFxhashCli = require("@fxhash/cli/webpack").default
    module.exports = withFxhashCli({ mode: <%- mode %> }, {})
`
