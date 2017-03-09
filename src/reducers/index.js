import {combineReducers} from 'redux'

const filters = (state = {}, action) => {
  switch (action.type) {
    case 'TEXT_CHANGE':
      const oldState = state
      oldState[action.source] = action.value
      return oldState
    default:
      return state
  }
}

const loadingState = (state = false, action) => {
  switch (action.type) {
    case 'SET_LOADING_STATE':
      return action.state
    default:
      return state
  }
}

const data = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_DATA':
      return action.data
    default:
      return state
  }
}

const limit = (state = '', action) => {
  switch (action.type) {
    case 'LIMIT_CHANGE':
      return action.limit
    default:
      return state
  }
}


const rootReducer = combineReducers({
  data,
  filters,
  loadingState,
  limit
})

export default rootReducer
