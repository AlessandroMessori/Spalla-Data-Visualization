export const baseApiUrl = 'http://localhost:4040'

export const getInitialData = () => {
  return Promise.all([
    fetch(`${baseApiUrl}/docenti`).then(res => res.json()),
    fetch(`${baseApiUrl}/domande`).then(res => res.json()),
    fetch(`${baseApiUrl}/votazioni/scuola`).then(res => res.json()),
  ])
}

export const normalizeData = (arr) => {
  return {
    'teachers': arr[0],
    'questions': arr[1].map(item => item.testo).splice(0, 12),
    'schoolVotes': arr[2]
  }
}
