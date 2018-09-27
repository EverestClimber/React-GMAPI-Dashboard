import callApi from '../utils/apiCaller'

export function checkAuthToken(token) {
  var url = 'https://www.googleapis.com/oauth2/v3/tokeninfo?'
  if (token) url += `id_token=${ token }`

  return callApi(url)
}