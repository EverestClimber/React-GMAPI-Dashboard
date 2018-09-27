export default async function callApi(url, method = 'get', body, idToken) {
  const stream = await fetch(url, {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'idToken'
    },
    method,
    body: JSON.stringify(body),
  })

  return await stream.json()
}
