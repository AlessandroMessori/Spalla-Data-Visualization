import {setPercentagesAverages} from './analytics'

export const baseApiUrl = 'http://localhost:4040'

export const getInitialData = () => {
  return Promise.all([
    fetch(`${baseApiUrl}/docenti`).then(res => res.json()),
    fetch(`${baseApiUrl}/domande`).then(res => res.json()),
    fetch(`${baseApiUrl}/votazioni/scuola`).then(res => res.json()),
    fetch(`${baseApiUrl}/votazioni/docenti`).then(res => res.json()),
  ])
}

export const getTeacherData = (id) => {
  return Promise.all([
    fetch(`${baseApiUrl}/votazioni/docenti?idDocente=${id}`).then(res => res.json())
  ])
}

export const normalizeData = (arr) => {
  return {
    'teachers': arr[0],
    'questions': arr[1].map(item => item.testo),
    'schoolVotes': arr[2],
    'votes': (() => {
      setPercentagesAverages(arr[3]);
      return arr[3]
    })()
  }
}
