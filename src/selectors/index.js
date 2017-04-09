import {createSelector} from 'reselect'
import {filterTeachersByString, filterTeachersByCategory} from '../helpers/utils'

const teachers = (state) => state.data.teachers
const search = (state) => state.filters.search
const cls = (state) => state.filters.cls

export const currentTeachers = createSelector(
  teachers,
  search,
  cls,
  (teachers, search, cls) => cls ? filterTeachersByCategory(filterTeachersByString(teachers, search), cls) : filterTeachersByString(teachers, search)
)




