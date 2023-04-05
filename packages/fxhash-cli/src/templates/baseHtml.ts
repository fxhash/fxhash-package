type BaseHtmlTemplate = string

export const baseHtmlTemplate: BaseHtmlTemplate = `
    <!DOCTYPE html>
    <html>
        <head>
            <title><%- name %></title>
            <meta charset="utf-8">
            <script id="fxhash-snippet">
                <%- snippet %>
            </script>
            <%- head %>
        </head>
        <body> 
            <%- entry %>
        </body>
    </html>
`
