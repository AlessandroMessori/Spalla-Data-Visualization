import {getData} from '../helpers/api'

export const textChange = (value, source) => {
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

export const getRequest = (url) => (dispatch) => {
  dispatch(setLoadingState(true))
  return getData()
    .then(res => {
      dispatch(receiveData(null, res.data))
      dispatch(setLoadingState(false))
    })
}
