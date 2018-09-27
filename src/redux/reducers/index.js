/**
 * Root Reducer
 */
import { combineReducers } from 'redux'

// Import Reducers
import { routerReducer as router } from 'react-router-redux'

import auth from './auth'
// Combine all reducers into one root reducer
export default combineReducers({
  router,
  auth,
})
