import {getInitialData, normalizeData} from '../helpers/api'
import {getVotesPercentage} from '../helpers/analytics'

//filter actions
export const filterChange = (value, source) => ({
  type: 'FILTER_CHANGE',
  value,
  source
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


//api thunks
export const loadInitialData = () => (dispatch) => {
  dispatch(setLoadingState(true))
  dispatch(receiveInitialData([]))
  return getInitialData()
    .then(res => {
      const data = normalizeData(res)
      getVotesPercentage(data.schoolVotes, 3)
      dispatch(receiveInitialData(data))
      dispatch(setLoadingState(false))
    })
}



