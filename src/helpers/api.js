export const baseApiUrl = 'https://localhost:4000'

export const composeRequest = (query) => {
  return `${baseApiUrl}/votazioni?params={"where":${query}"}`
}

export const getData = () => {

}
