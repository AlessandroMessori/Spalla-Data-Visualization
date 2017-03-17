import {createSelector} from 'reselect'
import {filterTeachersByString} from '../helpers/utils'

const teachers = (state) => state.data.teachers
const search = (state) => state.filters.search
const cls = (state) => state.filters.cls

export const currentTeachers = createSelector(
  teachers,
  search,
  cls,
  (teachers, search, cls) => filterTeachersByString(teachers, search)
)




