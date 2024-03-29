import {getInitialData, getTeacherData, normalizeData} from '../helpers/api'
import {getVotesPercentage} from '../helpers/analytics'
import  store from '../helpers/store'

//filter actions
export const filterChange = (value, source) => ({
  type: 'FILTER_CHANGE',
  value,
  source
})

export const questionChange = (inc) => ({
  type: 'QUESTION_CHANGE',
  inc
})

export const clearFilters = () => ({
  type: 'CLEAR_FILTERS'
})

export const changeVisualType = (visual) => ({
  type: 'SET_VISUAL_TYPE',
  visual
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

  const storeData = store

  if (storeData) return dispatch(receiveInitialData(storeData))

  dispatch(setLoadingState(true))
  dispatch(receiveInitialData([]))
  return getInitialData()
    .then(res => {
      const data = normalizeData(res)
      getVotesPercentage(data.schoolVotes, 4)
      localStorage.setItem('redux-store', JSON.stringify(data))
      dispatch(receiveInitialData(data))
      dispatch(setLoadingState(false))
    })
}

export const loadTeacherData = (id) => (dispatch) => {
  dispatch(setLoadingState(true))
  dispatch(receiveTeacherData({valutazione: []}))
  return getTeacherData(id)
    .then(data => {
      dispatch(receiveTeacherData(data[0][0]))
      dispatch(setLoadingState(false))
    })
}



