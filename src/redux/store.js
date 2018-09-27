/**
 * Main store function
 */
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'

import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'

const sagaMiddleware = createSagaMiddleware()

const history = createHistory()

export function configureStore(initialState = {}) {
  // Middleware and store enhancers
  const middlewares = [
      sagaMiddleware,
      routerMiddleware(history)
  ]

  const enhancers = [
    applyMiddleware(...middlewares),
  ]

  if (process.env.NODE_ENV === 'development') {
    // Enable DevTools only when rendering during development.
    if (window.devToolsExtension) {
      enhancers.push(window.devToolsExtension())
    }
  }

  const store = createStore(rootReducer, initialState, compose(...enhancers))

  // Extensions
  store.runSaga = sagaMiddleware.run

  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default // eslint-disable-line global-require
      store.replaceReducer(nextReducer)
    })
  }

  return { store, history }
}
