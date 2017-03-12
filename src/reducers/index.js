const filters = (state = {search: '', cls: ''}, action) => {
  switch (action.type) {
    case 'FILTER_CHANGE':
      const oldState = state
      oldState[action.source] = action.value
      return oldState
    case 'CLEAR_FILTERS':
      return state
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

const data = (state = [[], []], action) => {
  switch (action.type) {
    case 'RECEIVE_DATA':
      return action.data
    default:
      return state
  }
}

const rootReducer = {
  data,
  filters,
  loadingState
}

export default rootReducer
