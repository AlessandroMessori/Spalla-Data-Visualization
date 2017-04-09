export const baseApiUrl = 'http://localhost:4000'

export const composeRequest = (where, limit) => {
  limit = (limit) ? `&limit=${limit}` : ''
  return `${baseApiUrl}/votazioni?where=${JSON.stringify(where)}${limit}`
}

export const getData = (where, limit) => {
  return fetch(composeRequest(where, limit))
    .then(res => res.json())
}

export const getInitialData = () => {
  return Promise.all([
    fetch(`${baseApiUrl}/docenti`).then(res => res.json()),
    fetch(`${baseApiUrl}/classi`).then(res => res.json()),
    fetch(`${baseApiUrl}/domande`).then(res => res.json()),
    fetch(`${baseApiUrl}/scuola/statistica?votoMin=4`).then(res => res.json()),
  ])
}

export const normalizeData = (arr) => {
  return {
    'teachers': arr[0],
    'cls': arr[1],
    'questions': arr[2].map(item => item.testo).splice(0, 12),
    'goodVotes': arr[3].map(item => parseFloat((item.countRistretto / item.countTot * 100).toFixed(2))).splice(0, 12)
  }
}
