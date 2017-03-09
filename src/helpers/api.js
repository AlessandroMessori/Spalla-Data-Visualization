export const baseApiUrl = 'http://localhost:4000'

export const composeRequest = (query) => {
  return `${baseApiUrl}/votazioni?params={"where":${JSON.stringify(query)}}`
}

export const getData = (query) => {
  return fetch(composeRequest(query))
}
