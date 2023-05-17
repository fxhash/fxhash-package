import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="/blanq-favicon.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/blanq-favicon-darkMode.png"
          media="(prefers-color-scheme: dark)"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
