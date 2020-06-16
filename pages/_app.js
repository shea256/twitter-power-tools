import App from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import '../styles.css'

class MyApp extends App {
  constructor(props) {
    super(props)
    this.persistor = persistStore(props.reduxStore)
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Provider store={reduxStore}>
        <PersistGate loading={<Component {...pageProps} />}
                     persistor={this.persistor}>
          <main>
            <Component {...pageProps} />
          </main>
        </PersistGate>
      </Provider>
    )
  }
}

export default withReduxStore(MyApp)