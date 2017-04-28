import {createSelector} from 'reselect'
import {filterTeachersByString, filterTeachersByCategory} from '../helpers/utils'
import {getVotesPercentage, getStats, getAvg} from '../helpers/analytics'

const teachers = (state) => state.data.teachers
const search = (state) => state.filters.search
const cls = (state) => state.filters.cls
const schoolVotes = (state) => state.data.schoolVotes || []
const teacherData = (state) => state.teacherData
const votes = (state) => state.data.votes || []

export const currentTeachers = createSelector(
  teachers,
  search,
  cls,
  (teachers, search, cls) => cls ? filterTeachersByCategory(filterTeachersByString(teachers, search), cls) : filterTeachersByString(teachers, search)
)

export const barData = createSelector(
  schoolVotes,
  teacherData,
  (schoolVotes, teacherData) => {
    const schoolData = schoolVotes.map(item => item.goodVotesPercentage).slice(0, 12)
    getVotesPercentage(teacherData.valutazione, 3)
    const profData = teacherData.valutazione.map(item => item.goodVotesPercentage).slice(0, 12)
    return ({
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      datasets: [
        {
          label: 'Voto del Docente',
          data: profData,
          fillColor: 'blue',
          borderWidth: 1
        },
        {
          label: 'Media Scuola',
          data: schoolData,
          fillColor: 'red',
          borderWidth: 1
        },
      ]
    })
  }
)

export const tableData = createSelector(
  schoolVotes,
  teacherData,
  (schoolVotes, teacherData) => {
    const schoolData = schoolVotes.map(item => item.goodVotesPercentage).slice(0, 12)
    getVotesPercentage(teacherData.valutazione, 3)
    const profData = teacherData.valutazione.map(item => item.goodVotesPercentage).slice(0, 12)
    return schoolData.map((item, i) => {
      return {
        idDomanda: i,
        goodVotesPercentage: profData[i] + '%',
        schoolPercentage: item + '%',
        difference: profData[i] - item + '%'
      }
    })
  })

export const teacherStats = createSelector(
  teacherData,
  (teacherData) => {
    getVotesPercentage(teacherData.valutazione, 3)
    const profData = teacherData.valutazione.map(item => item.goodVotesPercentage).slice(0, 12)
    return getStats(profData)
  })

export const overViewData = createSelector(
  schoolVotes,
  votes,
  (schoolVotes, votes) => {
    const schoolAvg = getAvg(schoolVotes.map(item => item.goodVotesPercentage).slice(0, 12))
    votes.shift()
    return votes.map((item) => {
      return {
        nomeDocente: item.nome + ' ' + item.cognome,
        goodVotesPercentage: (item.percentagesAvg || 0) + '%',
        difference: Math.round(item.percentagesAvg - schoolAvg) || 0 + '%'
      }
    })
  })
