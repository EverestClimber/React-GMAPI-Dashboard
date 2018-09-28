import callApi from '../utils/apiCaller'

const base_url = 'https://x4w0q6i7c1.execute-api.eu-west-2.amazonaws.com/dev/geomatic/search'

export function searchByCPR(cpr) {
  var url = `${base_url}?cpr=${cpr}`
  console.log(url)
  return callApi(url)
}