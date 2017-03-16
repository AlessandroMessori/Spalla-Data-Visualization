const filters = (state = {search: '', cls: ''}, action) => {
  switch (action.type) {
    case 'FILTER_CHANGE':
      const change = {}
      change[action.source] = action.value
      return {
        ...state,
        ...change
      }
    case 'CLEAR_FILTERS':
      return {search: '', cls: ''}
    default:
      return state
  }
}

const currentTeachers = (state = [], action) => {
  switch (action.type) {
    case 'FILTER_TEACHERS':
      return action.filteredTeachers
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

const data = (state = {teachers: [], cls: []}, action) => {
  switch (action.type) {
    case 'RECEIVE_DATA':
      return action.data
    default:
      return state
  }
}

const rootReducer = {
  data,
  currentTeachers,
  filters,
  loadingState
}

export default rootReducer
