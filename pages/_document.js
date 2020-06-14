import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'
import Navbar from '../components/Navbar'

export default class extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render() {
    return (
      <html>
        <Head>
          {this.props.styles}
        </Head>
        <body>
          <Navbar />
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}