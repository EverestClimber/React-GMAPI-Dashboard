import callApi from '../utils/apiCaller'

const base_url = 'https://x4w0q6i7c1.execute-api.eu-west-2.amazonaws.com/dev/geomatic/search'

export function search(req) {
  var url = `${base_url}?`
  let query = []
  req.forEach(e => {
    query.push(`${e.key}=${e.value}`)
  })
  url = url + query.join('&&')
  console.log(url)
  return callApi(url)
}