export const baseApiUrl = 'http://localhost:4000'

export const composeRequest = (where, limit) => {
  limit = (limit) ? `&limit=${limit}` : ''
  return `${baseApiUrl}/votazioni?where=${JSON.stringify(where)}${limit}`
}

export const getData = (where, limit) => {
  return fetch(composeRequest(where, limit))
    .then(res => res.json())
}
