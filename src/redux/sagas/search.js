import { put, call, take, takeLatest } from 'redux-saga/effects'
import Types from '../actions/types'

import * as Actions from '../actions/search'
import * as Api from '../../api/search'

// Saga: will be fired on LOGIN_REQUESTED actions

function* fetchSearch(action) {
  try {
    const result = yield call(Api.search, action.req)
    let list = []
    let id = 0
    Object.keys(result.match.values).forEach(key => {
      id = id + 1
      let key_modified = ''
      let value_modified = result.match.values[key]
      switch(key) {
        case 'per_cprno':
          key_modified = 'CPR - Social Security Number'
          break
        case 'per_name':
          key_modified = 'Full Name'
          break
        case 'unadr_name':
          key_modified = 'Device Address'
          break
        case 'decmak_gend':
          key_modified = 'Gender'
          value_modified = value_modified == 'm' ? 'Male' : 'Female'
          break  
        case 'decmak_prilan':
          key_modified = 'Primary Landline Telephone Number'
          break
        case 'decmak_seclan':
          key_modified = 'Secondary Landline Telephone Number'
          break
        case 'decmak_primob':
          key_modified = 'Primary Mobile Number'
          break
        case 'decmak_secmob':
          key_modified = 'Secondary Mobile Number'
          break
      }
      list.push({ id: id, key: key_modified, value: value_modified })
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
