/**
 * Entry point
 */

import 'react-hot-loader/patch'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'
import { configureStore } from './redux/store'
import registerServiceWorker from './registerServiceWorker'
import sagas from './redux/sagas'

// Initialize store
const { store, history } = configureStore(window.__INITIAL_STATE__)
sagas.forEach(saga => store.runSaga(saga))

const mountApp = document.getElementById('root')

render(
  <AppContainer>
    <App store={store} history={history} />
  </AppContainer>,
  mountApp
)

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./App').default // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextApp store={store} />
      </AppContainer>,
      mountApp
    )
  })
}

registerServiceWorker()
