import { createReducer } from 'reduxsauce'
// Import Actions
import Types from '../actions/types'

// Initial State
const initialState = {
  state: 'NOT_LOGGED'
}

/* Handlers */

export const loginSucceeded = (state = initialState, action) => {
  return { state: 'LOGGED', token: action.token }
}

export const loginRequested = (state = initialState) => {
  return { state: 'LOGGING_IN' }
}

export const loginFailed = (state = initialState) => {
  return { state: 'NOT_LOGGED' }
}

export const logoutSucceeded = (state = initialState) => {
  return { state: 'NOT_LOGGED' }
}

// map action types to reducer functions
export const handlers = {
  [Types.LOGIN_SUCCEEDED]: loginSucceeded,
  [Types.LOGIN_REQUESTED]: loginRequested,
  [Types.LOGIN_FAILED]: loginFailed,
  [Types.LOGOUT_SUCCEEDED]: logoutSucceeded,
}

/* Selectors */


// Export Reducer
export default createReducer(initialState, handlers)
