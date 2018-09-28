import Types from './types'

export const loginSucceeded = (token) =>
  ({ type: Types.LOGIN_SUCCEEDED, token: token })

export const loginRequested = () => 
  ({ type: Types.LOGIN_REQUESTED })

export const logoutSucceeded = () => 
  ({ type: Types.LOGOUT_SUCCEEDED })