import {getInitialData, normalizeData} from '../helpers/api'

//filter actions
export const filterChange = (value, source) => ({
  type: 'FILTER_CHANGE',
  value,
  source
})

export const clearFilters = () => ({
  type: 'CLEAR_FILTERS'
})

export const filterTeachers = (filters, teachers) => {

  const filteredTeachers = teachers

  return {
    type: 'FILTER_TEACHERS',
    filteredTeachers
  }

}

//filter thunks
export const updateFilters = (value, source, teachers) => (dispatch) => {
  dispatch(filterChange(value, source))
  dispatch(filterTeachers(filters, teachers))
}

export const resetFilters = (value, source, teachers) => (dispatch) => {
  dispatch(clearFilters(value, source))
  dispatch(filterTeachers(filters, teachers))
}


//api actions
export const setLoadingState = (state) => ({
  type: 'SET_LOADING_STATE',
  state
})

export const receiveData = (data) => ({
  type: 'RECEIVE_DATA',
  data
})

//api thunks
export const loadInitialData = () => (dispatch) => {
  dispatch(setLoadingState(true))
  dispatch(receiveData([]))
  return getInitialData()
    .then(res => {
      const data = normalizeData(res)
      dispatch(filterTeachers(data.teachers))
      dispatch(receiveData(data))
      dispatch(setLoadingState(false))
    })
}
