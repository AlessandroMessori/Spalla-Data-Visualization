import {createSelector} from 'reselect'
import {filterTeachersByString, filterTeachersByCategory} from '../helpers/utils'

const teachers = (state) => state.data.teachers
const search = (state) => state.filters.search
const cls = (state) => state.filters.cls
const schoolVotes = (state) => state.data.schoolVotes || []

export const currentTeachers = createSelector(
  teachers,
  search,
  cls,
  (teachers, search, cls) => cls ? filterTeachersByCategory(filterTeachersByString(teachers, search), cls) : filterTeachersByString(teachers, search)
)

export const barData = createSelector(
  schoolVotes,
  (schoolVotes) => {
    const data = schoolVotes.map(item => item.goodVotesPercentage).slice(0, 12)
    return ({
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      datasets: [{
        label: '# of Votes',
        data: data,
        backgroundColor: [
          '#ff6384',
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderWidth: 1
      }]
    })
  }
)

export const tableData = (state) => state.data.schoolVotes ? state.data.schoolVotes.slice(0, 12) : []




