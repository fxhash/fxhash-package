type BaseHtmlTemplate = string
export const baseHtmlTemplate: BaseHtmlTemplate = `
    <!DOCTYPE html>
    <html>
        <head>
            <title><%- name %></title>
            <meta charset="utf-8">
            <%- snippet %>
            <%- head %>
        </head>
        <body>
            <%- entry %>
        </body>
    </html>
`
