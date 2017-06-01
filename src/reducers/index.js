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

const currentQuestion = (state = 0, action) => {
  switch (action.type) {
    case 'QUESTION_CHANGE':
      let temp = action.inc ? state + 1 : state - 1
      temp = state < 0 ? 11 : temp
      temp = state > 11 ? 0 : temp
      return temp
    default:
      return state
  }
}

const visualType = (state = 'table', action) => {
  switch (action.type) {
    case 'SET_VISUAL_TYPE':
      return action.visual
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

const data = (state = {teachers: [], cls: [], questions: []}, action) => {
  switch (action.type) {
    case 'RECEIVE_INITIAL_DATA':
      return action.data
    default:
      return state
  }
}

const teacherData = (state = {valutazione: []}, action) => {
  switch (action.type) {
    case 'RECEIVE_TEACHER_DATA':
      return action.data
    default:
      return state
  }
}

const rootReducer = {
  data,
  filters,
  loadingState,
  visualType,
  teacherData,
  currentQuestion
}

export default rootReducer
