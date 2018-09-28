/**
 * Root Reducer
 */
import { combineReducers } from 'redux'

// Import Reducers
import { routerReducer as router } from 'react-router-redux'

import auth from './auth'
import search from './search'
// Combine all reducers into one root reducer
export default combineReducers({
  router,
  auth,
  search,
})
