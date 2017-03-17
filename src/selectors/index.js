import {filterTeachersByString} from '../helpers/utils'

export const getCurrentTeachers = (state) => {
  let {teachers} = state.data
  let {search, cls} = state

  teachers = (search) ? (filterTeachersByString(teachers, search)) : teachers
  teachers = (cls) ? teachers : teachers

  return teachers
}
