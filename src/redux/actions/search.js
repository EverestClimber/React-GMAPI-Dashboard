import Types from './types'

export const resetSearch = () =>
  ({ type: Types.RESET_SEARCH })

export const searchFetchRequested = (cpr, keys) =>
  ({ type: Types.SEARCH_FETCH_REQUESTED, cpr: cpr, keys: keys })

export const searchFetchSucceeded = (result) =>
  ({ type: Types.SEARCH_FETCH_SUCCEEDED, result: result })

export const searchFetchFailed = (err) =>
  ({ type: Types.SEARCH_FETCH_FAILED, err: err })
