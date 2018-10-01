import { createReducer } from 'reduxsauce'
// Import Actions
import Types from '../actions/types'

// Initial State
const initialState = {
  result: [],
  state: 'RESETED_SEARCH',
}

export const resetSearch = (state = initialState) => {
  return initialState
}

export const fetchSearchRequested = (state = initialState) => {
  return { ...state, state: 'FETCHING_SEARCH' }
}

export const fetchSearchSucceeded = (state = initialState, action) => {
  return { ...state, state: 'FETCH_SEARCH_SUCCEEDED', result: action.result }
}

export const fetchSearchFailed = (state = initialState, action) => {
  return { ...state, state: 'FETCH_SEARCH_FAILED', err: action.err }
}

// map action types to reducer functions
export const handlers = {
  [Types.RESET_SEARCH]: resetSearch,
  [Types.SEARCH_FETCH_REQUESTED]: fetchSearchRequested,
  [Types.SEARCH_FETCH_SUCCEEDED]: fetchSearchSucceeded,
  [Types.SEARCH_FETCH_FAILED]: fetchSearchFailed,
}

/* Selectors */


// Export Reducer
export default createReducer(initialState, handlers)
