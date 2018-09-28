import { put, call, take, takeLatest } from 'redux-saga/effects'
import Types from '../actions/types'

import * as Actions from '../actions/auth'
import * as Actions_Search from '../actions/search'
import * as Api from '../../api/auth'

import { GOOGLE_AUTH_CLIENT_ID } from '../../config'

import { NotificationManager } from 'react-notifications'

import { push } from 'react-router-redux'

// Saga: will be fired on LOGIN_REQUESTED actions
function* loginSucceeded(action) {
   try {
    localStorage.setItem("token", action.token)
   } catch (e) {
   }
}

function* loginRequested() {
  try {
    const token = localStorage.getItem("token")
    if (token) {
      const res = yield call(Api.checkAuthToken, token)
      if(res.aud == GOOGLE_AUTH_CLIENT_ID)
        yield put(Actions.loginSucceeded(token))
      else
        yield put(Actions.logoutSucceeded())
    }
    else
      yield put(Actions.logoutSucceeded())
  } catch (e) {
    yield put(Actions.logoutSucceeded())
  }
}

function* logoutSucceeded() {
  try {
    localStorage.removeItem("token")
    localStorage.removeItem('firstNotify')
    yield put(Actions_Search.resetSearch())
  } catch (e) {
  }
}

/*
  Does not allow concurrent fetches.
*/
export function* authSaga() {
  yield takeLatest(Types.LOGIN_SUCCEEDED, loginSucceeded)
  yield takeLatest(Types.LOGIN_REQUESTED, loginRequested)
  yield takeLatest(Types.LOGOUT_SUCCEEDED, logoutSucceeded)
}
