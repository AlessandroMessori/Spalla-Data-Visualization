import {getData} from '../helpers/api'

export const textChange = (value, source) => {

  if (!isNaN(value)) value = parseInt(value)

  return {
    type: "TEXT_CHANGE",
    value,
    source
  }
}

export const setLoadingState = (state) => {
  return {
    type: "SET_LOADING_STATE",
    state
  }
}

export const receiveData = (data) => {
  return {
    type: "RECEIVE_DATA",
    data
  }
}

export const getRequest = (filters) => (dispatch) => {
  dispatch(setLoadingState(true))
  return getData(filters)
    .then(res => {
      console.log(res)
      dispatch(receiveData(res.data))
      dispatch(setLoadingState(false))
    })
}
