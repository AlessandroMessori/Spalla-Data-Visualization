import {getInitialData} from '../helpers/api'

export const filterChange = (value, source) => {
  return {
    type: 'FILTER_CHANGE',
    value,
    source
  }
}

export const clearFilters = () => {
  return {
    type: 'CLEAR_FILTERS'
  }
}

export const setLoadingState = (state) => {
  return {
    type: 'SET_LOADING_STATE',
    state
  }
}

export const receiveData = (data) => {
  return {
    type: 'RECEIVE_DATA',
    data
  }
}

export const loadInitialData = () => (dispatch) => {
  dispatch(setLoadingState(true))
  dispatch(receiveData([]))
  return getInitialData()
    .then(res => {
      dispatch(receiveData(res))
      dispatch(setLoadingState(false))
    })
}
