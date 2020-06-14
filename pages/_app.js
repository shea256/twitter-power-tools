import App from 'next/app'
import React from 'react'

import '../styles.css'

class MyApp extends App {
  constructor(props) {
    super(props)
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <main>
        <Component {...pageProps} />
      </main>
    )
  }
}

export default MyApp