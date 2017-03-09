import {getData} from '../helpers/api'

export const textChange = (value, source) => {

  value = (!isNaN(value)) ? parseInt(value, 16) : value

  return {
    type: "TEXT_CHANGE",
    value,
    source
  }
}

export const limitChange = (limit) => {
  return {
    type: "LIMIT_CHANGE",
    limit
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

export const getRequest = (where, limit) => (dispatch) => {
  dispatch(setLoadingState(true))
  dispatch(receiveData([]))
  return getData(where, limit)
    .then(res => {
      dispatch(receiveData(res.data))
      dispatch(setLoadingState(false))
    })
}
