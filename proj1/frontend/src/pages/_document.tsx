import NextDocument, { Html, Main, Head, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="author" content="Albert Tian" />
          <meta
            name="description"
            content="a web3 playground for my personal projects from buildspace."
          />
          <meta name="keywords" content="web3, ethereum, buildspace" />
          <link rel="shortcut icon" href="/static/meta/favicon.png" />
          <meta property="og:image" content="/static/meta/favicon.png" />
          <meta property="og:title" content="web3 playground" />
          <meta property="og:type" content="website" />
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
