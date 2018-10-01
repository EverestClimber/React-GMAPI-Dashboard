import Types from './types'

export const resetSearch = () =>
  ({ type: Types.RESET_SEARCH })

export const searchFetchRequested = (req) =>
  ({ type: Types.SEARCH_FETCH_REQUESTED, req: req })

export const searchFetchSucceeded = (result) =>
  ({ type: Types.SEARCH_FETCH_SUCCEEDED, result: result })

export const searchFetchFailed = (err) =>
  ({ type: Types.SEARCH_FETCH_FAILED, err: err })
