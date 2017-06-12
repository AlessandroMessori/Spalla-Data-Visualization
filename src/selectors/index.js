import {createSelector} from 'reselect'
import {filterTeachersByString, filterTeachersByCategory, getCategoryByParam} from '../helpers/utils'
import {getVotesPercentage, getStats, getAvg} from '../helpers/analytics'

const location = () => window.location.pathname.split('/').pop()
const questions = (state) => state.data.questions
const teachers = (state) => state.data.teachers
const search = (state) => state.filters.search
const cls = (state) => state.filters.cls
const schoolVotes = (state) => state.data.schoolVotes || []
const categoryVotes = (state) => ({
  'literatureVotes': state.data.literatureVotes,
  'scientificVotes': state.data.scientificVotes,
  'languagesVotes': state.data.languagesVotes,
  'otherVotes': state.data.otherVotes
})
const teacherData = (state) => {
  const id = parseInt(window.location.pathname.split('/').splice(2, 1)[0], 0)
  const data = state.data.votes ? state.data.votes[id] : []
  return data.valutazione ? data : {valutazione: []}
}
const votes = (state) => state.data.votes || []

export const currentQuestion = (state) => state.currentQuestion

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
    getVotesPercentage(teacherData.valutazione, 4)
    const profData = teacherData.valutazione.map(item => item.goodVotesPercentage).slice(0, 12)
    return ({
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      datasets: [
        {
          label: 'Voto del Docente',
          data: profData,
          fillColor: '#1D73AA',
          borderWidth: 1
        },
        {
          label: 'Media Scuola',
          data: schoolData,
          fillColor: '#C44441',
          borderWidth: 1
        },

      ]
    })
  }
)

export const lineData = createSelector(
  schoolVotes,
  teacherData,
  currentQuestion,
  (schoolVotes, teacherData, currentQuestion) => {

    if (teacherData.valutazione.length > 0) {
      teacherData.valutazione.forEach(valutazione => {
        const {countVal} = valutazione
        for (let i = 1; i <= 5; i++) {
          let temp = true
          countVal.forEach(val => {
            if (val.value !== i && countVal.length < 5 && temp) {
              valutazione.countVal.push({value: i, count: 0})
              temp = false
            }
          })
        }
        countVal.sort((item1, item2) => item1.value > item2.value)
      })
    }

    const firstQuestion = teacherData.valutazione.length > 0 ? teacherData.valutazione[currentQuestion].countVal.map(item => item.count) : []

    getVotesPercentage(teacherData.valutazione, 4)
    return ({
      datasets: {
        labels: ["1", "2", "3", "4", "5"],
        datasets: [
          {
            label: 'Voto del Docente',
            data: firstQuestion,
            borderColor: '#1D73AA',
            pointBackgroundColor: '#1D73AA',
            fillColor: '#99ff99',
            fill: false,
            showLine: false,
            borderWidth: 1
          }
        ]
      },
      valutazioni: firstQuestion
    })
  }
)

export const tableData = createSelector(
  schoolVotes,
  categoryVotes,
  teacherData,
  questions,
  (schoolVotes, categoryVotes, teacherData, questions) => {
    const category = getCategoryByParam(window.location.pathname.split('/').pop())
    const schoolData = schoolVotes.map(item => item.goodVotesPercentage).slice(0, 12)
    const categoryData = categoryVotes[`${category}Votes`] ? categoryVotes[`${category}Votes`].map(item => item.goodVotesPercentage).slice(0, 12) : []
    getVotesPercentage(teacherData.valutazione, 4)
    const profData = teacherData.valutazione.map(item => item.goodVotesPercentage).slice(0, 12)
    return schoolData.map((item, i) => {
      return {
        question: questions[i],
        idDomanda: i,
        goodVotesPercentage: profData[i],
        categoryPercentage: categoryData[i],
        schoolPercentage: item,
        categoryDifference: (Math.round(profData[i] - categoryData[i]) || 0),
        difference: (Math.round(profData[i] - item) || 0)
      }
    })
  })

export const teacherStats = createSelector(
  teacherData,
  (teacherData) => {
    getVotesPercentage(teacherData.valutazione, 4)
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
        nomeDocente: item.cognome + ' ' + item.nome,
        goodVotesPercentage: (item.percentagesAvg || 0),
        difference: (Math.round(item.percentagesAvg - schoolAvg) || 0)
      }
    })
  })

export const generalData = createSelector(
  schoolVotes,
  questions,
  location,
  (schoolVotes = [], questions = [], location) => {
    let data = schoolVotes.slice(12)
    let generalQuestions = questions.slice(12)

    data = location === 'docenti' ? schoolVotes.slice(0, 11) : data
    generalQuestions = location === 'docenti' ? questions.slice(0, 11) : generalQuestions

    return data.map((item, i) => ({
        question: generalQuestions[i],
        goodVotesPercentage: (data[i].goodVotesPercentage || 0)
      })
    )

  })

