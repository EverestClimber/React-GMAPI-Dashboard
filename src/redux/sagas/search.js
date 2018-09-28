import { put, call, take, takeLatest } from 'redux-saga/effects'
import Types from '../actions/types'

import * as Actions from '../actions/search'
import * as Api from '../../api/search'

// Saga: will be fired on LOGIN_REQUESTED actions

function* fetchSearch(action) {
  try {
    const result = yield call(Api.searchByCPR, action.cpr)
    let list = []
    let id = 0
    Object.keys(result.match.values).forEach(key => {
      list.push({ id: id, key: key, value: result.match.values[key] })
      id = id + 1
    })
    yield put(Actions.searchFetchSucceeded(list))
  } catch (e) {
    yield put(Actions.searchFetchFailed(e.message))
  }
}

/*
  Does not allow concurrent fetches.
*/
export function* searchSaga() {
  yield takeLatest(Types.SEARCH_FETCH_REQUESTED, fetchSearch)
}
