import {getInitialData, normalizeData} from '../helpers/api'
import {getVotiDocenti, getStats} from '../helpers/analytics'

//filter actions
export const filterChange = (value, source) => ({
  type: 'FILTER_CHANGE',
  value,
  source
})

export const clearFilters = () => ({
  type: 'CLEAR_FILTERS'
})


//api actions
export const setLoadingState = (state) => ({
  type: 'SET_LOADING_STATE',
  state
})

export const receiveInitialData = (data) => ({
  type: 'RECEIVE_INITIAL_DATA',
  data
})

export const receiveTeacherData = (data) => ({
  type: 'RECEIVE_TEACHER_DATA',
  data
})


//api thunks
export const loadInitialData = () => (dispatch) => {
  dispatch(setLoadingState(true))
  dispatch(receiveInitialData([]))
  return getInitialData()
    .then(res => {
      const data = normalizeData(res)
      dispatch(receiveInitialData(data))
      dispatch(setLoadingState(false))
    })
}

export const loadTeacherData = (id) => (dispatch) => {
  dispatch(setLoadingState(true))
  dispatch(receiveTeacherData({}))
  return getVotiDocenti(id)
    .then(data => {
      const stats = getStats(data.data);
      const teacherData = {stats, votazioni: data.data, count: data.count}
      dispatch(receiveTeacherData(teacherData))
      dispatch(setLoadingState(false))
    })
}

