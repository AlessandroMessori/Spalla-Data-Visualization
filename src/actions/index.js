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
      dispatch(receiveData(data))
      dispatch(setLoadingState(false))
    })
}
